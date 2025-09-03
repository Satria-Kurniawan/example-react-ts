import { createContext } from "react"

// Sebaiknya definisikan tipe untuk action agar lebih aman dan konsisten
export type Action = "CREATE" | "READ" | "UPDATE" | "DELETE"

// Buat interface baru untuk struktur sebuah modul
export interface ModulePermission {
  name: string
  action: Action[]
}

// interface User utama
export interface User {
  id?: string // Dibuat opsional agar sesuai contoh
  name: string
  email?: string // Dibuat opsional agar sesuai contoh
  role: "SUPERMAN" | "USER"
  modules: ModulePermission[] // Properti baru ditambahkan
}
// Definisikan tipe untuk nilai context
export interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (userData: User) => void
  logout: () => void
}

// Buat dan ekspor HANYA context di sini
export const AuthContext = createContext<AuthContextType | undefined>(undefined)
