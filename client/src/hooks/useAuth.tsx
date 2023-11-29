import { useEffect, useState } from "react"

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const data = localStorage.getItem("userInfo")
    const user = JSON.parse(data)
    if (user && user?.token) {
      try {
        setIsAuthenticated(true)
      } catch (error) {
        let message
        if (error instanceof Error) message = error.message
        else message = String(error)

        console.error("JWT verification failed:", message)
      }
    }
  }, [])

  return isAuthenticated
}

export default useAuth
