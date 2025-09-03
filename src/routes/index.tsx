import SupermanLayout from "@/layouts/SupermanLayout.tsx"
import LandingPage from "@/pages/LandingPage.tsx"
import { createBrowserRouter } from "react-router"
import ProtectedRoute from "../components/ProtectedRoute.tsx"
import LoginPage from "../pages/auth/LoginPage.tsx"
import DashboardPage from "../pages/superman/DashboardPage.tsx"
import TasksPage from "../pages/superman/tasks/TasksPage.tsx"

export const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <SupermanLayout />,
        children: [
          { path: "/superman/dashboard", element: <DashboardPage /> },
          { path: "/superman/tasks", element: <TasksPage /> },
        ],
      },
    ],
  },
])
