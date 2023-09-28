import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import { ThemeProvider } from "./components/ThemeProvider"

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Header />
        <main>
          <Routes>
            <Route path="/" />
          </Routes>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
