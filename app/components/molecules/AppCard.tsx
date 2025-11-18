import type { App } from "@/app/types"
import { AppIcon } from "../atoms/AppIcon"

interface AppCardProps {
  app: App
  onClick: (app: App) => void
}

export function AppCard({ app, onClick }: AppCardProps) {
  return (
    <a 
      onClick={() => onClick(app)} 
      className="card card-sm group bg-base-100 cursor-pointer transition shadow-sm hover:shadow-lg"
    >
      <AppIcon src={app.icon} alt={app.name} backgroundColor={app.color} />
      <div className="card-body min-h-17 text-center justify-center">
        <h4>{app.name}</h4>
      </div>
    </a>
  )
}
