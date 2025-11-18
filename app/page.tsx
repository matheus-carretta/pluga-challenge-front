import { AppsProvider } from "./contexts/AppsContext"
import { AppsTemplate } from "./components/templates/AppsTemplate"

export default function Home() {
  return (
    <AppsProvider>
      <AppsTemplate />
    </AppsProvider>
  )
}