'use client'

import { useState, useRef, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import Image from "next/image"
import type { App } from "./types"
import { getApps } from "./services/apps"

function Home() {
  const { data: apps = [], isLoading } = useQuery({
    queryKey: ['apps'],
    queryFn: getApps,
  })

  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1)

  const [selectedApp, setSelectedApp] = useState<App | null>(null)

  const modalRef = useRef<HTMLDialogElement>(null)

  const appsByAppId = useMemo(() => {
    return apps.reduce((acc, app) => { acc[app.app_id] = app; return acc }, {} as Record<string, App>)
  }, [apps])

  const lastSelectedApps = useMemo(() => {
    if (typeof window === 'undefined' || apps.length === 0) return []
    const storedLastSelectedAppIds: string[] = JSON.parse(localStorage.getItem("lastSelectedApps") || "[]")
    return storedLastSelectedAppIds.map((appId) => appsByAppId[appId]).filter(Boolean)
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
  const filteredApps = apps.filter((app) => app.name.toLowerCase().includes(normalizedSearch))

  const maxPage = Math.ceil(filteredApps.length / 12) || 1
  const pagedFilteredApps = filteredApps.slice((page - 1) * 12, page * 12)

  return (
    <>
      <div className="flex flex-col gap-6 w-full max-w-3xl mx-auto p-6">
        <h1 className="text-3xl text-center">
          Pluga Challenge Front
        </h1>
        <label className="input w-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 opacity-50">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input type="search" placeholder="Buscar ferramenta" value={search} onChange={(e) => handleSearch(e.target.value)} />
        </label>
        {isLoading ? (
          <div className="text-center">
            <span className="loading loading-spinner" />
          </div>
        ) : pagedFilteredApps.length === 0 ? (
          <div className="text-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-9 inline mb-2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0 0 12.016 15a4.486 4.486 0 0 0-3.198 1.318M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
            </svg>
            <p>Nenhum app encontrado para &quot;{search}&quot;.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-4 gap-6">
              {pagedFilteredApps.map((app) =>
                <a key={app.app_id} onClick={() => handleSelectedApp(app)} className="card card-sm group bg-base-100 cursor-pointer transition shadow-sm hover:shadow-lg">
                  <figure style={{ backgroundColor: app.color }} className="p-6">
                    <Image src={app.icon} alt={app.name} width={64} height={64} className="transition group-hover:scale-110" />
                  </figure>
                  <div className="card-body min-h-17 text-center justify-center">
                    <h4>{app.name}</h4>
                  </div>
                </a>
              )}
            </div>
            <div className="text-center">
              <div className="join">
                <button onClick={() => setPage(Math.max(page - 1, 1))} className={`join-item btn ${page === 1 ? "btn-disabled" : ""}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </button>
                {Array.from({ length: maxPage }, (_, i) => i + 1).map((i) =>
                  <button key={`p${i}`} onClick={() => setPage(i)} className={`join-item btn ${i == page ? "btn-active" : ""}`}>
                    {i}
                  </button>
                )}
                <button onClick={() => setPage(Math.min(page + 1, maxPage))} className={`join-item btn ${page === maxPage ? "btn-disabled" : ""}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
      <dialog className="modal" ref={modalRef}>
        {selectedApp && (
          <div className="modal-box flex flex-col gap-6">
            <div className="mx-auto">
              <div className="flex gap-6">
                <figure style={{ backgroundColor: selectedApp.color }} className="rounded-full p-10">
                  <Image src={selectedApp.icon} alt={selectedApp.name} width={64} height={64} />
                </figure>
                <div className="py-6">
                  <h2 className="mb-4 text-lg">
                    {selectedApp.name}
                  </h2>
                  <a href={selectedApp.link} target="_blank" rel="noreferrer" className="btn btn-primary">
                    Acessar
                  </a>
                </div>
              </div>
            </div>
            <h2 className="text-center">
              Últimas ferramentas visualizadas
            </h2>
            <div className="grid grid-cols-3 gap-6">
              {internalLastSelectedApps.toReversed().map((app) =>
                <a key={app.app_id} onClick={() => handleSelectedApp(app)} className="card card-sm group bg-base-100 cursor-pointer transition shadow-sm hover:shadow-lg">
                  <figure style={{ backgroundColor: app.color }} className="p-6">
                    <Image src={app.icon} alt={app.name} width={64} height={64} className="transition group-hover:scale-110" />
                  </figure>
                  <div className="card-body min-h-17 text-center justify-center">
                    <h4>{app.name}</h4>
                  </div>
                </a>
              )}
            </div>
          </div>
        )}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  )
}

export default Home