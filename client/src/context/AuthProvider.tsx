import { useEffect, createContext, ReactNode, useState } from "react"
// import { decodeToken } from "react-jwt"
import { UserProps } from "types"
import { useNavigate } from "react-router-dom"
import axios from "axios"

type AuthProviderProps = {
  children: ReactNode
}
type AuthContextValue = {
  isAuthed?: boolean
  userData?: UserProps
  loginHandler: () => void
  logoutHandler: () => void
  setUserData: (value: UserProps) => void
  setIsAuthed: (value: boolean) => void
}

export const AuthContext = createContext<AuthContextValue>({
  loginHandler: (): void => {
    console.log("Function not implemented.")
  },
  logoutHandler: (): void => {
    console.log("Function not implemented.")
  },

  setUserData: () => {
    console.log("Function not implemented.")
  },
  setIsAuthed: () => {
    console.log("Function not implemented.")
  },
})

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // TODO: fix auth when user logged in on reload,
  // user gets redirected to login page
  const [isAuthed, setIsAuthed] = useState(false)

  const [userData, setUserData] = useState<UserProps>(() => {
    // Retrieve user data from localStorage
    const storedUserInfo = localStorage.getItem("userInfo")

    // Parse the stored user info (assuming it's a JSON string)
    const parsedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {}

    // Return the initial state object with the user data
    return {
      id: parsedUserInfo.id || "",
      username: parsedUserInfo.username || "",
      email: parsedUserInfo.email || "",
      role: parsedUserInfo.role || "USER",
      token: parsedUserInfo.token || "",
    }
  })

  const navigate = useNavigate()

  useEffect(() => {
    if (userData.token) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + userData.token
      localStorage.setItem("userInfo", JSON.stringify(userData))
    } else {
      delete axios.defaults.headers.common["Authorization"]
      localStorage.removeItem("userInfo")
    }
  }, [userData, userData.token])

  const loginHandler = () => {
    navigate("/login")
  }
  const logoutHandler = () => {
    localStorage.removeItem("userInfo")
    setIsAuthed(false)
    navigate("/")
  }
  return (
    <AuthContext.Provider
      value={{
        isAuthed,
        userData,
        loginHandler,
        logoutHandler,
        setUserData,
        setIsAuthed,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
