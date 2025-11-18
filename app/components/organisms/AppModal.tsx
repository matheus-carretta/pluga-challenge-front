import { forwardRef } from "react"
import Image from "next/image"
import type { App } from "@/app/types"
import { AppCard } from "../molecules/AppCard"

interface AppModalProps {
  app: App | null
  lastSelectedApps: App[]
  onAppClick: (app: App) => void
}

export const AppModal = forwardRef<HTMLDialogElement, AppModalProps>(
  ({ app, lastSelectedApps, onAppClick }, ref) => {
    return (
      <dialog className="modal" ref={ref}>
        {app && (
          <div className="modal-box flex flex-col gap-6">
            <div className="mx-auto">
              <div className="flex gap-6">
                <figure style={{ backgroundColor: app.color }} className="rounded-full p-10">
                  <Image src={app.icon} alt={app.name} width={64} height={64} />
                </figure>
                <div className="py-6">
                  <h2 className="mb-4 text-lg">{app.name}</h2>
                  <a 
                    href={app.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="btn btn-primary"
                  >
                    Acessar
                  </a>
                </div>
              </div>
            </div>
            <h2 className="text-center">Últimas ferramentas visualizadas</h2>
            <div className="grid grid-cols-3 gap-6">
              {lastSelectedApps.toReversed().map((app) => (
                <AppCard key={app.app_id} app={app} onClick={onAppClick} />
              ))}
            </div>
          </div>
        )}
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    )
  }
)

AppModal.displayName = "AppModal"
