import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import { ThemeProvider } from "./components/ThemeProvider"
import Main from "./pages/Main"

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Header />
        <main className="flex flex-col">
          <Routes>
            <Route path="/" element={<Main />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
