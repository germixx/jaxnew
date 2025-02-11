import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-6 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center">
            {/* Logo or Brand */}
            <div className="mb-4 md:mb-0">
              <h2 className="text-xl font-bold">Jacksonvillians</h2>
            </div>

            {/* Footer Navigation */}
            <ul className="flex space-x-6 text-sm">
              <li>
                <a href="#" className="hover:text-gray-400 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400 transition">
                  Contact
                </a>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" className="hover:text-gray-400 transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="hover:text-gray-400 transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="hover:text-gray-400 transition">
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-700 my-4"></div>

          {/* Copyright */}
          <div className="text-center text-sm">
            &copy; {new Date().getFullYear()} MyWebsite. All Rights Reserved.
          </div>
        </div>
    </footer>
  )
}

export default Footer;