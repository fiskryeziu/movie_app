import { useEffect, createContext, ReactNode, useState } from "react"
import { decodeToken } from "react-jwt"
import { DecodeProps, UserProps } from "types"
import { useNavigate } from "react-router-dom"

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
  const [isAuthed, setIsAuthed] = useState(false)
  const [userData, setUserData] = useState<UserProps>({
    id: "",
    username: "",
    email: "",
    role: "USER",
  })
  const navigate = useNavigate()

  useEffect(() => {
    const data = localStorage.getItem("userInfo")
    if (data) {
      const userInfo = JSON.parse(data)
      if (userInfo && userInfo.token) {
        const decoded = decodeToken(userInfo.token) as DecodeProps

        if (decoded.userId === userInfo.id) {
          setIsAuthed(true)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { token, ...userData } = userInfo
          setUserData(userData)
        }
      }
    }
  }, [])

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
