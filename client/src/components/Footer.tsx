import { Facebook, Instagram, X } from "lucide-react"
import React from "react"

const Footer = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-5 my-10">
      <p className="text-primary text-3xl">Movie.</p>
      <div className="flex gap-5">
        <Facebook className="hover:text-primary hover:duration-200" />
        <X className="hover:text-primary hover:duration-200" />
        <Instagram className="hover:text-primary hover:duration-200" />
      </div>
      <p className="text-center">
        Copyright © 2023 | movies - Movies and Tv-Shows HD!
      </p>
    </div>
  )
}

export default Footer
