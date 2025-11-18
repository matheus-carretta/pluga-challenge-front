import type { App } from "@/app/types"
import { AppCard } from "../molecules/AppCard"

interface AppsGridProps {
  apps: App[]
  onAppClick: (app: App) => void
}

export function AppsGrid({ apps, onAppClick }: AppsGridProps) {
  return (
    <div className="grid grid-cols-4 gap-6">
      {apps.map((app) => (
        <AppCard key={app.app_id} app={app} onClick={onAppClick} />
      ))}
    </div>
  )
}
