'use client';

import { useState, useEffect } from 'react';

import Image from "next/image";
import NAVIGATION from '../components/FrontPage/navigation';
import FRONTIMAGE from '../components/FrontPage/ImageSection';
import FEATURES from '../components/FrontPage/Features';
import ABOUT from '../components/FrontPage/About';
import GALLERY from '../components/FrontPage/Gallery';
import TESTIMONIALS from '../components/FrontPage/Testimonials';
import LETUSKNOW from '../components/FrontPage/LetUsKnow';
import FOOTER from '../components/FrontPage/Footer';
import AUTH from '../components/FrontPage/AuthModule';

import JsonData from '../data.json';

export default function Home() {
  
  const [loading, setLoading] = useState(false);
  const [mobileShowing, setMobileShowing] = useState(true);
  const [authModal, setAuthModal] = useState(false);

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

  function openLoginModal () {
    setAuthModal(true);
    document.body.style.overflow = "hidden";
  }

  function closeLoginModal () {
    setAuthModal(false);
    document.body.style.overflow = "auto";
  }

  return (
    <div className="">
        {
          loading ? (
            <div className="antialiased flex flex-row min-h-screen justify-center items-center">
                <Loading />              
            </div>
          ) : (
            <div>
              <AUTH authModal={authModal} closeLoginModal={closeLoginModal} />
              <NAVIGATION openLoginModal={openLoginModal} />
              <FRONTIMAGE />
              <FEATURES data={JsonData.Features}/>
              <ABOUT />
              <GALLERY />
              <TESTIMONIALS />
              <LETUSKNOW />
              <FOOTER />
            </div>
          )
        }
    </div>
  );
}
