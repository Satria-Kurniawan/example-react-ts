import { useEffect, useState } from "react"
import { AuthContext, type User } from "./AuthContext"

interface AuthProviderProps {
  children: React.ReactNode
}

const sessionUserDummy: User = {
  name: "Satria",
  role: "SUPERMAN",
  modules: [
    {
      name: "DASHBOARD",
      action: ["READ"],
    },
    {
      name: "TASKS_MANAGEMENT",
      action: ["CREATE", "READ", "UPDATE", "DELETE"],
    },
  ],
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(sessionUserDummy)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      const storedUser = localStorage.getItem("user")
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
      setIsLoading(false)
    }, 1000)
  }, [])

  const login = (userData: User) => {
    localStorage.setItem("user", JSON.stringify(userData))
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
