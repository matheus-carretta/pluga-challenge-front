'use client'

import { useRef, useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import type { App } from "@/app/types"
import { getApps } from "@/app/services/apps"
import { SearchInput } from "../molecules/SearchInput"
import { Spinner } from "../atoms/Spinner"
import { EmptyState } from "../molecules/EmptyState"
import { AppsGrid } from "../organisms/AppsGrid"
import { Pagination } from "../molecules/Pagination"
import { AppModal } from "../organisms/AppModal"

export function AppsTemplate() {
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
    const storedLastSelectedAppIds: string[] = JSON.parse(
      localStorage.getItem("lastSelectedApps") || "[]"
    )
    return storedLastSelectedAppIds
      .map((appId) => appsByAppId[appId])
      .filter(Boolean)
  }, [apps, appsByAppId])

  const [internalLastSelectedApps, setInternalLastSelectedApps] = useState<App[]>(lastSelectedApps)

  function handleSearch(value: string) {
    setSearch(value)
    setPage(1)
  }

  function handleSelectedApp(app: App) {
    setSelectedApp(app)

    const lastSelectedAppsSet = new Set(internalLastSelectedApps)
    lastSelectedAppsSet.delete(app)
    lastSelectedAppsSet.add(app)

    const newLastSelectedApps = Array.from(lastSelectedAppsSet).slice(-3)
    setInternalLastSelectedApps(newLastSelectedApps)

    const newLastSelectedAppIds = newLastSelectedApps.map((app) => app.app_id)
    localStorage.setItem("lastSelectedApps", JSON.stringify(newLastSelectedAppIds))

    modalRef.current?.showModal()
  }

  const normalizedSearch = search.toLowerCase()
  const filteredApps = apps.filter((app) => 
    app.name.toLowerCase().includes(normalizedSearch)
  )

  const maxPage = Math.ceil(filteredApps.length / 12) || 1
  const pagedFilteredApps = filteredApps.slice((page - 1) * 12, page * 12)

  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto p-6">
        <h1 className="text-3xl text-center">Pluga Challenge Front</h1>
        
        <SearchInput value={search} onChange={handleSearch} />

        {isLoading ? (
          <Spinner />
        ) : pagedFilteredApps.length === 0 ? (
          <EmptyState searchTerm={search} />
        ) : (
          <>
            <AppsGrid apps={pagedFilteredApps} onAppClick={handleSelectedApp} />
            <Pagination 
              currentPage={page} 
              maxPage={maxPage} 
              onPageChange={setPage} 
            />
          </>
        )}
      </div>

      <AppModal 
        ref={modalRef}
        app={selectedApp}
        lastSelectedApps={internalLastSelectedApps}
        onAppClick={handleSelectedApp}
      />
    </>
  )
}
