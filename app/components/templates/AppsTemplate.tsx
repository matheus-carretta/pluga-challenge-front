'use client'

import { useApps } from "@/app/contexts/AppsContext"
import { SearchInput } from "../molecules/SearchInput"
import { Spinner } from "../atoms/Spinner"
import { EmptyState } from "../molecules/EmptyState"
import { AppsGrid } from "../organisms/AppsGrid"
import { Pagination } from "../molecules/Pagination"
import { AppModal } from "../organisms/AppModal"

export function AppsTemplate() {
  const {
    search,
    page,
    selectedApp,
    internalLastSelectedApps,
    pagedFilteredApps,
    maxPage,
    isLoading,
    modalRef,
    handleSearch,
    handleSelectedApp,
    setPage,
  } = useApps()

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
