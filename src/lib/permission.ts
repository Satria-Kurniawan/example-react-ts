import type { Action, User } from "@/contexts/AuthContext"

/**
 * Mengecek apakah user punya akses ke module + action tertentu
 * @param user data user, bisa null jika belum login
 * @param moduleName nama modul, misalnya "TASK_MANAGEMENT"
 * @param action aksi yang ingin dicek, misalnya "CREATE"
 */
export function hasPermission(
  user: User | null,
  moduleName: string,
  action: Action
): boolean {
  if (!user) return false

  const module = user.modules.find((m) => m.name === moduleName)

  if (!module) return false

  return module.action.includes(action)
}
