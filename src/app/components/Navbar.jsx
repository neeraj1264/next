"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Dialog } from "@headlessui/react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoClose } from "react-icons/io5";
import NavLink from "./NavLink";
import { usePathname, useRouter } from "next/navigation";

const navLinks = [
  { title: "Home", path: "/" },
  { title: "About Us", path: "/about" },
  { title: "Services", path: "/services" },
  { title: "Resources", path: "/resources" },
];

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Whenever the path changes, close the mobile menu
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);
  return (
    <>
      <nav className="w-full bg-pink py-4 shadow-lg z-20 flex justify-center hidden md:flex">
        <div>
          <a href="tel:+610392679030" className="mr-8 text-white">
            Phone: 03 9267 9030
          </a>
          <a href="mailto:Enquiries@treasuredcareforyou.com" className="text-white">
            Email: enquiries@treasuredcareforyou.com
          </a>
        </div>
      </nav>
      <nav className="w-full bg-white py-4 md:py-6 shadow-lg z-20 rounded-t-none rounded-bl-[.5rem] rounded-br-[.5rem] font-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-black text-xl md:text-2xl font-bold tracking-tight transition-colors duration-200"
          >
            <img
              src="/header-logo-bgremove.png"
              alt="logo"
              className="w-40 md:w-72 rounded-full"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  href={link.path}
                  className={`
          text-xl font-medium transition-colors duration-200
          ${isActive ? "text-pink" : "text-gray-800 hover:text-pink"}
        `}
                >
                  {link.title}
                </NavLink>
              );
            })}
            <Link
              href="/contact"
              className="
    ml-6 
    bg-pink 
    text-white 
    font-semibold 
    py-2 
    px-6 
    rounded-full 
    shadow-custom 
    transform 
    transition 
    duration-300 
    hover:-translate-y-1 
    hover:bg-[#bb3f8d] 
  "
            >
              CONTACT US
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="md:hidden text-black p-2 rounded-md focus:outline-none"
          >
            {mobileMenuOpen ? (
              <IoClose size={24} />
            ) : (
              <GiHamburgerMenu size={24} />
            )}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <Dialog
          as="div"
          open={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          className="md:hidden"
        >
          <div className="fixed inset-0 bg-black/25" />
          <div className="fixed inset-0 flex">
            <Dialog.Panel className="w-3/4 bg-white p-4 shadow-lg">
              {/* 1️⃣ Mobile Logo & Title */}
              <div className="flex flex-col items-center mb-4 mt-16">
                {/* Make sure you have /public/logo.png or replace with your path */}
                <img
                  src="/logo.jpg"
                  alt="Logo"
                  width={120}
                  height={120}
                  className="mx-auto my-2"
                />
                <span className="text-pink text-xl font-semibold text-center">
                  Treasured Care For You
                </span>
              </div>
              <div className="space-y-1">
                {[...navLinks, { title: "Contact Us", path: "/contact" }].map(
                  (link) => {
                    const isActive = pathname === link.path;
                    return (
                      <button
                        key={link.path}
                        onClick={() => router.push(link.path)}
                        className={`
          w-full text-left px-3 py-2 rounded-md text-xl font-medium transition-colors duration-200
          ${isActive ? "bg-pink text-white" : " text-pink"}
        `}
                      >
                        {link.title}
                      </button>
                    );
                  }
                )}
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </nav>
    </>
  );
}