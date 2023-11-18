import React from "react"
import Header from "./Header"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"

const Layout = () => {
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
