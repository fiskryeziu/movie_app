import { BrowserRouter, Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import { ThemeProvider } from "./components/ThemeProvider"
import Main from "./pages/Main"
import Movie from "./pages/Movie"

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Header />
        <main className="flex flex-col mx-0 sm:mx-5 md:mx-20 lg:mx-32">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/movie/:id" element={<Movie />} />
          </Routes>
        </main>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
