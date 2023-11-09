import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom"
import { ThemeProvider } from "./components/ThemeProvider"
import Main from "./pages/Main"
import Movie from "./pages/Movie"
import Layout from "./components/Layout"

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
    ],
  },
])

export default App
