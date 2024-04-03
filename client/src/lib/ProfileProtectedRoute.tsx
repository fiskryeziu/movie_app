import { useAuth } from "@/hooks/useAuth"
import { ReactNode } from "react"
import { Navigate } from "react-router-dom"

const ProfileProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { userData } = useAuth()

  return userData && userData.token ? <>{children}</> : <Navigate to="/login" />
}

export default ProfileProtectedRoute
