import { useAuth } from "@/hooks/useAuth"
import { ReactNode } from "react"
import { Navigate } from "react-router-dom"

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthed, userData } = useAuth()

  return isAuthed && userData?.role === "USER" ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" />
  )
}

export default ProtectedRoute
