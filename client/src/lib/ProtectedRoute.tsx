import { useAuth } from "@/hooks/useAuth"
import { ReactNode } from "react"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { userData } = useAuth()

  return userData && userData.token ? <>{children}</> : <Navigate to="/login" />
}

export default ProtectedRoute
