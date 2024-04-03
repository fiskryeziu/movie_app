import { useEffect, createContext, ReactNode, useState } from "react";
// import { decodeToken } from "react-jwt"
import { CustomJwtPayload, UserProps } from "types";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

type AuthProviderProps = {
  children: ReactNode;
};
type AuthContextValue = {
  userData?: UserProps;
  token?: CustomJwtPayload | null;
  loginHandler: () => void;
  logoutHandler: () => void;
  setUserData: (value: UserProps) => void;
  showComments?: boolean;
  setShowComments: (value: boolean) => void;
};

export const AuthContext = createContext<AuthContextValue>({
  loginHandler: (): void => {
    console.log("Function not implemented.");
  },
  logoutHandler: (): void => {
    console.log("Function not implemented.");
  },

  setUserData: () => {
    console.log("Function not implemented.");
  },
  setShowComments: () => {
    console.log("Function not implemented.");
  },
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [userData, setUserData] = useState<UserProps>(() => {
    const storedUserInfo = localStorage.getItem("userInfo");
    const parsedUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : {};
    return {
      id: parsedUserInfo.id || "",
      username: parsedUserInfo.username || "",
      email: parsedUserInfo.email || "",
      role: parsedUserInfo.role || "NONE",
      createdAt: new Date(parsedUserInfo.createdAt) || new Date(),
      token: parsedUserInfo.token || "",
    };
  });
  const [showComments, setShowComments] = useState(() => {
    const comment = localStorage.getItem("comments");
    return comment ? JSON.parse(comment) : false;
  });

  const navigate = useNavigate();
  const location = useLocation();
  const decodedToken = userData.token
    ? jwtDecode<CustomJwtPayload>(userData.token)
    : null;

  const isTokenExpired = (decodedToken: CustomJwtPayload | null) => {
    if (decodedToken) {
      Date.now() >= decodedToken.exp! * 1000;
    } else {
      return true;
    }
  };
  useEffect(() => {
    const handleRedirect = () => {
      if (userData.token) {
        const userRole = decodedToken?.role;

        if (
          userRole === "ADMIN" &&
          !location.pathname.startsWith("/dashboard")
        ) {
          navigate("/dashboard");
        } else if (
          userRole !== "ADMIN" &&
          location.pathname.startsWith("/dashboard")
        ) {
          navigate("/");
        }
      }
    };
    handleRedirect();
  }, [location, navigate, userData, decodedToken]);

  useEffect(() => {
    if (userData && userData.token && !isTokenExpired(decodedToken)) {
      try {
        axios.defaults.headers.common["Authorization"] =
          `Bearer ${userData.token}`;
        localStorage.setItem("userInfo", JSON.stringify(userData));
      } catch (error) {
        console.error("Error setting Authorization header:", error);
      }
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("userInfo");
    }
  }, [userData, userData.token, decodedToken]);

  const loginHandler = () => {
    navigate("/login");
  };
  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    setUserData({
      id: "",
      username: "",
      email: "",
      role: "NONE",
      createdAt: new Date(),
      token: "",
    });
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        userData,
        loginHandler,
        logoutHandler,
        setUserData,
        token: decodedToken,
        setShowComments,
        showComments,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
