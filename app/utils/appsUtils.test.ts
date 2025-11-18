import {
  filterAppsBySearch,
  paginateApps,
  calculateMaxPage,
  updateLastSelectedApps,
  createAppsByIdIndex,
  getAppsFromLocalStorage,
} from './appsUtils'
import type { App } from '../types'

const mockApps: App[] = [
  { app_id: '1', name: 'Slack', icon: 'slack.png', color: '#4A154B', link: 'https://slack.com' },
  { app_id: '2', name: 'Trello', icon: 'trello.png', color: '#0079BF', link: 'https://trello.com' },
  { app_id: '3', name: 'Gmail', icon: 'gmail.png', color: '#EA4335', link: 'https://gmail.com' },
  { app_id: '4', name: 'Notion', icon: 'notion.png', color: '#000000', link: 'https://notion.so' },
]

describe('appsUtils', () => {
  describe('filterAppsBySearch', () => {
    it('should filter apps by name (case-insensitive)', () => {
      const result = filterAppsBySearch(mockApps, 'slack')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Slack')
    })

    it('should return all apps when search is empty', () => {
      const result = filterAppsBySearch(mockApps, '')
      expect(result).toHaveLength(4)
    })

    it('should return empty array when no match is found', () => {
      const result = filterAppsBySearch(mockApps, 'xyz')
      expect(result).toHaveLength(0)
    })

    it('should be case-insensitive', () => {
      const result = filterAppsBySearch(mockApps, 'GMAIL')
      expect(result).toHaveLength(1)
      expect(result[0].name).toBe('Gmail')
    })
  })

  describe('paginateApps', () => {
    it('should paginate apps correctly', () => {
      const result = paginateApps(mockApps, 1, 2)
      expect(result).toHaveLength(2)
      expect(result[0].name).toBe('Slack')
      expect(result[1].name).toBe('Trello')
    })

    it('should return second page correctly', () => {
      const result = paginateApps(mockApps, 2, 2)
      expect(result).toHaveLength(2)
      expect(result[0].name).toBe('Gmail')
      expect(result[1].name).toBe('Notion')
    })

    it('should use 12 as default items per page', () => {
      const result = paginateApps(mockApps, 1)
      expect(result).toHaveLength(4)
    })
  })

  describe('calculateMaxPage', () => {
    it('should calculate maximum number of pages', () => {
      expect(calculateMaxPage(25, 12)).toBe(3)
      expect(calculateMaxPage(12, 12)).toBe(1)
      expect(calculateMaxPage(13, 12)).toBe(2)
    })

    it('should return 1 when there are no items', () => {
      expect(calculateMaxPage(0, 12)).toBe(1)
    })
  })

  describe('updateLastSelectedApps', () => {
    it('should add new app at the beginning', () => {
      const result = updateLastSelectedApps(mockApps[0], [], 3)
      expect(result).toHaveLength(1)
      expect(result[0].app_id).toBe('1')
    })

    it('should remove duplicates', () => {
      const lastSelected = [mockApps[1], mockApps[0]]
      const result = updateLastSelectedApps(mockApps[0], lastSelected, 3)
      expect(result).toHaveLength(2)
      expect(result[0].app_id).toBe('1')
      expect(result[1].app_id).toBe('2')
    })

    it('should limit to maximum number of items', () => {
      const lastSelected = [mockApps[1], mockApps[2], mockApps[3]]
      const result = updateLastSelectedApps(mockApps[0], lastSelected, 3)
      expect(result).toHaveLength(3)
      expect(result[0].app_id).toBe('1')
      expect(result[1].app_id).toBe('2')
      expect(result[2].app_id).toBe('3')
    })
  })

  describe('createAppsByIdIndex', () => {
    it('should create apps index by ID', () => {
      const result = createAppsByIdIndex(mockApps)
      expect(result['1']).toBe(mockApps[0])
      expect(result['2']).toBe(mockApps[1])
      expect(Object.keys(result)).toHaveLength(4)
    })

    it('should return empty object for empty array', () => {
      const result = createAppsByIdIndex([])
      expect(result).toEqual({})
    })
  })

  describe('getAppsFromLocalStorage', () => {
    beforeEach(() => {
      localStorage.clear()
    })

    it('should return empty array when localStorage is empty', () => {
      const appsByAppId = createAppsByIdIndex(mockApps)
      const result = getAppsFromLocalStorage(appsByAppId)
      expect(result).toEqual([])
    })

    it('should retrieve apps from localStorage', () => {
      const appsByAppId = createAppsByIdIndex(mockApps)
      localStorage.setItem('lastSelectedApps', JSON.stringify(['1', '2']))
      
      const result = getAppsFromLocalStorage(appsByAppId)
      expect(result).toHaveLength(2)
      expect(result[0].app_id).toBe('1')
      expect(result[1].app_id).toBe('2')
    })

    it('should filter invalid IDs', () => {
      const appsByAppId = createAppsByIdIndex(mockApps)
      localStorage.setItem('lastSelectedApps', JSON.stringify(['1', 'invalid', '2']))
      
      const result = getAppsFromLocalStorage(appsByAppId)
      expect(result).toHaveLength(2)
      expect(result[0].app_id).toBe('1')
      expect(result[1].app_id).toBe('2')
    })
  })
})
