'use client';

import { useState, useEffect } from 'react';

import Loading from '../Loading';

const Navigation = () => {

    const [loading, setLoading] = useState(false);
    const [mobileShowing, setMobileShowing] = useState(true);
  
    const toggleMenu = () => {
  
      function resizeAutomatically (){
        
        if(mobileMenu.classList.contains('block')) {
          mobileMenu.classList.remove('block');
          mobileMenu.classList.add('hidden');
        } 
      }
    
      let mobileMenu = document.getElementById('mobileMenu');
  
      window.addEventListener("resize", resizeAutomatically);
      
      if(mobileMenu.classList.contains('block')) {
        mobileMenu.classList.remove('block');
        mobileMenu.classList.add('hidden');
      } else {
        mobileMenu.classList.remove("hidden");
        mobileMenu.classList.add("block");
      }
  
    }

    return (
        <div className="">
            <div className="antialiased">
                  <header className="bg-white dark:bg-gray-800 shadow-md fixed w-full z-10 transition-colors duration-300">
                    <nav className="container mx-auto px-6 py-3">
                        <div className="flex justify-between items-center">
                            <a href="https://new.jacksonvillians.com" className="text-2xl font-bold text-primary-light dark:text-primary-dark">Jacksonvillians</a>
                            <div className="hidden md:flex space-x-6 text-center">
                                <a href="#about" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300">Features</a>
                                <a href="#about" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300">About</a>
                                <a href="#projects" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300">Projects</a>
                                <a href="#contact" className="hover:text-primary-light dark:hover:text-primary-dark transition-colors duration-300">Contact</a>
                            </div>
                            
                            <div className="flex items-center">
                                {/* <button id="darkModeToggle" className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 mr-4" aria-label="Toggle dark mode">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                    </svg>
                                </button> */}
                                <div className='hidden md:flex float-right'>Login</div>
                                <button onClick={() => toggleMenu()} id="mobileMenuToggle" className="md:hidden focus:outline-none" aria-label="Toggle mobile menu">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </nav>
                    <div id="mobileMenu" className="md:hidden hidden bg-white dark:bg-gray-800 transition-colors duration-300">
                        <a href="#about" className="w-full text-center block py-2 px-4 text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 hover:text-red-300">Features</a>
                        <a href="#about" className="w-full text-center block py-2 px-4 text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 hover:text-red-300">About</a>
                        <a href="#projects" className="w-full text-center block py-2 px-4 text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 hover:text-red-300">Gallery</a>
                        <a href="#contact" className="w-full text-center block py-2 px-4 text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 hover:text-red-300">Contact</a>
                        <a href="#contact" className="w-full text-center block py-2 px-4 text-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-300 hover:text-red-300">Login</a>
                    </div>
                </header>
            </div>  
        </div>
      );
}

export default Navigation