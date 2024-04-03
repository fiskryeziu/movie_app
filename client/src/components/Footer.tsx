import { Facebook, Instagram, X } from "lucide-react";
import React from "react";

const Footer = () => {
  return (
    <div className="my-10 flex flex-col items-center justify-center gap-5">
      <p className="text-3xl text-primary">Movie.</p>
      <div className="flex gap-5">
        <Facebook className="hover:text-primary hover:duration-200" />
        <X className="hover:text-primary hover:duration-200" />
        <Instagram className="hover:text-primary hover:duration-200" />
      </div>
      <p className="text-center">
        Copyright © 2024 | movies - Movies and Tv-Shows HD!
      </p>
    </div>
  );
};

export default Footer;
