import { CheckSquare, Home } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/use-auth"
import { Link } from "react-router"

export function AppSidebar() {
  const { user } = useAuth()

  const menus = [
    {
      title: "Dashboard",
      url: "/superman/dashboard",
      icon: Home,
      module: "DASHBOARD",
    },
    {
      title: "Tasks",
      url: "/superman/tasks",
      icon: CheckSquare,
      module: "TASKS_MANAGEMENT",
    },
  ]

  const filteredMenus = menus.filter((menu) =>
    user?.modules.some((userModule) => userModule.name === menu.module)
  )

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenus.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
