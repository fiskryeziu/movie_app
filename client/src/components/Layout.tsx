import Header from "./Header"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"
import { useAuth } from "@/hooks/useAuth"
import { AdminLayout } from "./admin/AdminLayout"

const Layout = () => {
  const { token } = useAuth()

  if (token?.role === "ADMIN") {
    return <AdminLayout />
  }
  return (
    <>
      <Header />
      <main className="flex flex-col mx-0 sm:mx-5 md:mx-20 lg:mx-32">
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout
