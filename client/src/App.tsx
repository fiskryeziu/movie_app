import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom"
import { ThemeProvider } from "./components/ThemeProvider"
import Main from "./pages/Main"
import Movie from "./pages/Movie"
import Layout from "./components/Layout"
import Popular from "./pages/Popular"
import Rated from "./pages/Rated"
import Genre from "./pages/Genre"
import Error from "./pages/Error"

const App = () => {
  return <RouterProvider router={router} />
}
const Root = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <ScrollRestoration />
      <Layout />
    </ThemeProvider>
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
        path: "/*",
        Component: Error,
      },
    ],
  },
])

export default App
