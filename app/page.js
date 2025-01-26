'use client';

import { useState, useEffect } from 'react';

import Image from "next/image";
import NAVIGATION from '../components/FrontPage/navigation';
import FRONTIMAGE from '../components/FrontPage/ImageSection'
import FEATURES from '../components/FrontPage/Features'

import JsonData from '../data.json';

export default function Home() {
  
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
        {
          loading ? (
            <div className="antialiased flex flex-row min-h-screen justify-center items-center">
                <Loading />              
            </div>
          ) : (
            <div>
              <NAVIGATION />
              <FRONTIMAGE />
              <FEATURES data={JsonData.Features}/>
            </div>
          )
        }
    </div>
  );
}
