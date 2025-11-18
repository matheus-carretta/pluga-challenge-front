import type { App } from "../types"

export function filterAppsBySearch(apps: App[], searchTerm: string): App[] {
  const normalizedSearch = searchTerm.toLowerCase()
  return apps.filter((app) => app.name.toLowerCase().includes(normalizedSearch))
}

export function paginateApps(apps: App[], page: number, itemsPerPage: number = 12): App[] {
  return apps.slice((page - 1) * itemsPerPage, page * itemsPerPage)
}

export function calculateMaxPage(totalItems: number, itemsPerPage: number = 12): number {
  return Math.ceil(totalItems / itemsPerPage) || 1
}

export function updateLastSelectedApps(
  currentApp: App,
  lastSelectedApps: App[],
  maxItems: number = 3
): App[] {
  return [
    currentApp,
    ...lastSelectedApps.filter((a) => a.app_id !== currentApp.app_id),
  ].slice(0, maxItems)
}

export function createAppsByIdIndex(apps: App[]): Record<string, App> {
  return apps.reduce((acc, app) => {
    acc[app.app_id] = app
    return acc
  }, {} as Record<string, App>)
}

export function getAppsFromLocalStorage(
  appsByAppId: Record<string, App>,
  storageKey: string = "lastSelectedApps"
): App[] {
  if (typeof window === 'undefined') return []
  
  const storedIds = JSON.parse(localStorage.getItem(storageKey) || "[]")
  return storedIds.map((appId: string) => appsByAppId[appId]).filter(Boolean)
}
