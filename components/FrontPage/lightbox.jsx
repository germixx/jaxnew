'use client';

import { useState, useEffect } from 'react';

const lightbox = () => {

    const [showModal, setShowModal] = useState(false);

    
    function openModal() {
        document.getElementById("myModal").style.display = "block";
        
      }
      
      function closeModal() {
        document.getElementById("myModal").style.display = "none";
        
        // let modalMenu = document.getElementById("myModal").style.display = "none";
        let modalMenu = document.getElementById("myModal");
        
        
        // if(modalMenu !== null || modalMenu != 'null') {
        //     if(modalMenu.classList.contains('block')) {
        //         modalMenu.classList.remove('block');
        //         modalMenu.classList.add('hidden');
        //       } else {
        //         modalMenu.classList.remove("hidden");
        //         modalMenu.classList.add("block");
        //       }
        // }
      }
      
      var slideIndex = 1;
      showSlides(slideIndex);
      
      function plusSlides(n) {
        showSlides(slideIndex += n);
      }
      
      function currentSlide(n) {
        showSlides(slideIndex = n);
      }
      
      function showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("demo");
        var captionText = document.getElementById("caption");
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        // slides[slideIndex-1].style.display = "block";
        // dots[slideIndex-1].className += " active";
        // captionText.innerHTML = dots[slideIndex-1].alt;
      }
      
  return (
    <div>
        <div id="myModal" className="modal">
            <span className="close cursor" 
            onClick={() => closeModal()}
            >&times;</span>
            <div className="modal-content">

            <div className="mySlides">
            <div className="numbertext">1 / 4</div>
            <img src="/assets/about.jpg" style={{width:'100%'}} />
            </div>

            <div className="mySlides">
            <div className="numbertext">2 / 4</div>
            <img src="/assets/about.jpg" style={{width:'100%'}} />
            </div>

            <div className="mySlides">
            <div className="numbertext">3 / 4</div>
            <img src="/assets/about.jpg" style={{width:'100%'}} />
            </div>
            
            <div className="mySlides">
            <div className="numbertext">4 / 4</div>
            <img src="/assets/about.jpg" style={{width:'100%'}} />
            </div>
    
            <a className="prev"
            onClick={plusSlides(-1)}
            >&#10094;</a>
            <a className="next" 
            onClick={plusSlides(1)}
            >&#10095;</a>

            <div className="caption-container">
            <p id="caption"></p>
            </div>


            <div className="column">
            <img className="demo cursor" src="/assets/about.jpg" style={{width:'100%'}}
            // onClick="currentSlide(1)" 
            alt="Nature and sunrise" />
            </div>
            <div className="column">
                <img className="demo cursor" src="/assets/about.jpg" style={{width:'100%'}} 
                // onClick="currentSlide(2)" 
                alt="Snow"/>
            </div>
            <div className="column">
                <img className="demo cursor" src="/assets/about.jpg" style={{width:'100%'}} 
                // onclick="currentSlide(3)" 
                alt="Mountains and fjords"/>
            </div>
            <div className="column">
                <img className="demo cursor" src="/assets/about.jpg" style={{width:'100%'}} 
                // onclick="currentSlide(4)" 
                alt="Northern Lights"/>
            </div>
            </div>
        </div>
    </div>
  )
}

export default lightbox