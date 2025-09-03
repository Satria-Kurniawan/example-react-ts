import { useAuth } from "@/hooks/use-auth"
import UnautorhizedPage from "@/pages/error/UnautorhizedPage"
import { Outlet } from "react-router"

export default function ProtectedRoute() {
  const { user } = useAuth()

  const isAuthenticated = !!user

  if (!isAuthenticated) return <UnautorhizedPage />

  return <Outlet />
}
