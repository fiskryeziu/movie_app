import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom"
import { ThemeProvider } from "./context/ThemeProvider"
import Main from "./pages/Main"
import Movie from "./pages/Movie"
import Layout from "./components/Layout"
import Popular from "./pages/Popular"
import Rated from "./pages/Rated"
import Genre from "./pages/Genre"
import Error from "./pages/Error"
import Profile from "./pages/Profile"
import UserProfile from "./components/UserProfile"
import Settings from "./components/Settings"
import WatchList from "./components/WatchList"
import Login from "./pages/Login"
import { AuthProvider } from "./context/AuthProvider"
import Register from "./pages/Register"
import ProtectedRoute from "./lib/ProtectedRoute"

const App = () => {
  return <RouterProvider router={router} />
}
const Root = () => {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <ScrollRestoration />
        <Layout />
      </ThemeProvider>
    </AuthProvider>
  )
}
const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "/",
        Component: Main,
      },
      {
        path: "/movie/:id",
        Component: Movie,
      },
      {
        path: "/most-popular",
        Component: Popular,
      },
      {
        path: "/most-rated",
        Component: Rated,
      },
      {
        path: "/genre/:type",
        Component: Genre,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),

        children: [
          {
            path: "user-profile",
            Component: UserProfile,
          },
          {
            path: "settings",
            Component: Settings,
          },
          {
            path: "watch-list",
            Component: WatchList,
          },
        ],
      },
      {
        path: "/*",
        Component: Error,
      },
    ],
  },
])

export default App
