'use client'

import { createContext, useContext, useState, useRef, useMemo, ReactNode } from "react"
import { useQuery } from "@tanstack/react-query"
import type { App } from "../types"
import { getApps } from "../services/apps"

interface AppsContextType {
  apps: App[]
  isLoading: boolean
  search: string
  page: number
  selectedApp: App | null
  internalLastSelectedApps: App[]
  filteredApps: App[]
  pagedFilteredApps: App[]
  maxPage: number
  modalRef: React.RefObject<HTMLDialogElement | null>
  setSearch: (value: string) => void
  setPage: (page: number) => void
  handleSearch: (value: string) => void
  handleSelectedApp: (app: App) => void
}

const AppsContext = createContext<AppsContextType | undefined>(undefined)

export function AppsProvider({ children }: { children: ReactNode }) {
  const { data: apps = [], isLoading } = useQuery({
    queryKey: ['apps'],
    queryFn: getApps,
  })
  
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)
  const [selectedApp, setSelectedApp] = useState<App | null>(null)
  
  const modalRef = useRef<HTMLDialogElement>(null)
  
  const appsByAppId = useMemo(() => {
    return apps.reduce((acc, app) => { 
      acc[app.app_id] = app
      return acc 
    }, {} as Record<string, App>)
  }, [apps])

  const lastSelectedApps = useMemo(() => {
    if (typeof window === 'undefined' || apps.length === 0) return []
    const storedLastSelectedAppIds = JSON.parse(localStorage.getItem("lastSelectedApps") || "[]")
    return storedLastSelectedAppIds.map((appId: string) => appsByAppId[appId])
  }, [apps, appsByAppId])
  
  const [internalLastSelectedApps, setInternalLastSelectedApps] = useState<App[]>(lastSelectedApps)

  function handleSearch(value: string) {
    setSearch(value)
    setPage(1)
  }

function handleSelectedApp(app: App) {
  setSelectedApp(app)
  modalRef.current?.showModal()

  const updatedLastSelected = [
    app,
    ...internalLastSelectedApps.filter((a) => a.app_id !== app.app_id),
  ].slice(0, 3)
  
  setInternalLastSelectedApps(updatedLastSelected)
  
  const appIds = updatedLastSelected.map(a => a.app_id)
  localStorage.setItem("lastSelectedApps", JSON.stringify(appIds))
}

  const normalizedSearch = search.toLowerCase()
  const filteredApps = apps.filter((app) => 
    app.name.toLowerCase().includes(normalizedSearch)
  )

  const maxPage = Math.ceil(filteredApps.length / 12) || 1
  const pagedFilteredApps = filteredApps.slice((page - 1) * 12, page * 12)

  const value = {
    apps,
    isLoading,
    search,
    page,
    selectedApp,
    internalLastSelectedApps,
    filteredApps,
    pagedFilteredApps,
    maxPage,
    modalRef,
    setSearch,
    setPage,
    handleSearch,
    handleSelectedApp,
  }

  return <AppsContext.Provider value={value}>{children}</AppsContext.Provider>
}

export function useApps() {
  const context = useContext(AppsContext)
  if (context === undefined) {
    throw new Error('useApps must be used within an AppsProvider')
  }
  return context
}
