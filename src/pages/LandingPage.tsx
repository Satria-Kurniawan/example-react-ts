import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export default function LandingPage() {
  return (
    <div>
      LandingPage
      <br />
      <Link to={"/superman/tasks"}>
        <Button>Menuju halaman superman</Button>
      </Link>
    </div>
  )
}
