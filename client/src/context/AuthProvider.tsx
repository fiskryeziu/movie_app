import {
  useEffect,
  createContext,
  ReactNode,
  useState,
  useContext,
} from "react"
import { decodeToken } from "react-jwt"
import { DecodeProps, UserProps } from "../../../server/types"
import { useNavigate } from "react-router-dom"

type AuthProviderProps = {
  children: ReactNode
}

type AuthContextValue = {
  isAuthed?: boolean
  userData?: UserProps
  loginHandler: () => void
  logoutHandler: () => void
}

export const AuthContext = createContext<AuthContextValue>({
  loginHandler: (): void => {
    console.log("Function not implemented.")
  },
  logoutHandler: (): void => {
    console.log("Function not implemented.")
  },
})
const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isAuthed, setIsAuthed] = useState(false)
  const [userData, setUserData] = useState<UserProps>({
    userId: "",
    username: "",
    email: "",
    role: "",
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
          setUserData(userInfo)
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
      value={{ isAuthed, userData, loginHandler, logoutHandler }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { useAuth }
