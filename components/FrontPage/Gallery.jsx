'use client';

import { useState, useEffect } from 'react';

// import Lightbox from './lightbox';

// https://tailwindflex.com/@r-thapa/image-grid
//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_js_lightbox
const Gallery = () => {
  var slideIndex = 1;
  const [showModal, setShowModal] = useState(false);

  function openModal() {
      document.getElementById("myModal").style.display = "block";
  }
    
  function closeModal() {
      let modalMenu = document.getElementById("myModal").style.display = "none";
  }
    
  showSlides(slideIndex);
    
  function plusSlides(n) {
    console.log('plus sides')
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

      if(slides.length > 0 ) {
        
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        console.log(slides,  'is slides now', slideIndex, ' is in')
        slides[slideIndex-1].style.display = "block";
        
        dots[slideIndex-1].className += " active";
        captionText.innerHTML = dots[slideIndex-1].alt;
      }


    }

    function mainOpen (x) {
      openModal();
      currentSlide(x)
    }

  return (
    <div id="gallery">
      <div className="container mb-10">
        <div className="grid">
          <div className="section-title">
            <h2>Gallery</h2>
            <p className='text-center text-black'>
            Discover the vibrant essence of Jacksonville through our curated collection of stunning images. From the iconic skyline to the serene beaches, our gallery showcases the diverse beauty of this dynamic city. Explore Jacksonville’s unique landmarks, rich culture, and picturesque views that make it truly one-of-a-kind.
            </p>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-3 gap-1">
            <div className="relative rounded overflow-hidden gallery-item hover-bg">
              <div className="gallery-item">
                <div onClick={() => mainOpen(1)} className="hover-bg"> 
                <img 
                  src="/assets/about.jpg" 
                  alt="Hanging Planters" 
                  className="w-full" 
                />
                <p
                  className="cursor-pointer absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-2xl text-center text-white font-roboto font-medium group-hover:bg-opacity-60 transition hover-text">
                  Hanging Planters
                </p>
                </div>
              </div>
            </div>

            <div className="relative rounded overflow-hidden gallery-item hover-bg">
              <div className="gallery-item">
                <div onClick={() => mainOpen(2)} className="hover-bg"> 
                <img 
                  src="/assets/about.jpg" 
                  alt="Hanging Planters" 
                  className="w-full" 
                />
                <p
                  className="cursor-pointer absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-2xl text-center text-white font-roboto font-medium group-hover:bg-opacity-60 transition hover-text">
                  Hanging Planters
                </p>
                </div>
              </div>
            </div>

            <div className="relative rounded overflow-hidden gallery-item hover-bg">
              <div className="gallery-item">
                <div onClick={() => mainOpen(3)} className="hover-bg"> 
                <img 
                  src="/assets/about.jpg" 
                  alt="Hanging Planters" 
                  className="w-full" 
                />
                <p
                  className="cursor-pointer absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-2xl text-center text-white font-roboto font-medium group-hover:bg-opacity-60 transition hover-text">
                  Hanging Planters
                </p>
                </div>
              </div>
            </div>

            <div className="relative rounded overflow-hidden gallery-item hover-bg">
              <div className="gallery-item">
                <div onClick={() => mainOpen(3)} className="hover-bg"> 
                <img 
                  src="/assets/about.jpg" 
                  alt="Hanging Planters" 
                  className="w-full" 
                />
                <p
                  className="cursor-pointer absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-2xl text-center text-white font-roboto font-medium group-hover:bg-opacity-60 transition hover-text">
                  Hanging Planters
                </p>
                </div>
              </div>
            </div>

            <div className="relative rounded overflow-hidden gallery-item hover-bg">
              <div className="gallery-item">
                <div onClick={() => mainOpen(3)} className="hover-bg"> 
                <img 
                  src="/assets/about.jpg" 
                  alt="Hanging Planters" 
                  className="w-full" 
                />
                <p
                  className="cursor-pointer absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-2xl text-center text-white font-roboto font-medium group-hover:bg-opacity-60 transition hover-text">
                  Hanging Planters
                </p>
                </div>
              </div>
            </div>

            <div className="relative rounded overflow-hidden gallery-item hover-bg">
              <div className="gallery-item">
                <div onClick={() => mainOpen(3)} className="hover-bg"> 
                <img 
                  src="/assets/about.jpg" 
                  alt="Hanging Planters" 
                  className="w-full" 
                />
                <p
                  className="cursor-pointer absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center text-2xl text-center text-white font-roboto font-medium group-hover:bg-opacity-60 transition hover-text">
                  Hanging Planters
                </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <div id="myModal" className="modal">
            <span className="close cursor" 
            onClick={() => closeModal()}
            >&times;</span>
            <div className="modal-content">

            <div className="mySlides">
            <div className="numbertext">1 / 6</div>
            <img src="/assets/about.jpg" style={{width:'100%'}} />
            </div>

            <div className="mySlides">
            <div className="numbertext">2 / 6</div>
            <img src="/assets/about.jpg" style={{width:'100%'}} />
            </div>

            <div className="mySlides">
            <div className="numbertext">3 / 6</div>
            <img src="/assets/about.jpg" style={{width:'100%'}} />
            </div>
            
            <div className="mySlides">
            <div className="numbertext">4 / 6</div>
            <img src="/assets/about.jpg" style={{width:'100%'}} />
            </div>

            <div className="mySlides">
            <div className="numbertext">5 / 6</div>
            <img src="/assets/about.jpg" style={{width:'100%'}} />
            </div>

            <div className="mySlides">
            <div className="numbertext">4 / 6</div>
            <img src="/assets/about.jpg" style={{width:'100%'}} />
            </div>
    
            <a className="prev"
            onClick={() => plusSlides(-1)}
            >&#10094;</a>
            <a className="next" 
            onClick={() => plusSlides(1)}
            >&#10095;</a>

            <div className="caption-container">
            <p id="caption"></p>
            </div>


            <div className="column">
              <img 
                className="demo cursor" src="/assets/about.jpg" style={{width:'100%'}}
                onClick={() => currentSlide(1)} 
              alt="Nature and sunrise" />
            </div>
            <div className="column">
                <img className="demo cursor" src="/assets/about.jpg" style={{width:'100%'}} 
                onClick={() => currentSlide(2)} 
                alt="Snow"/>
            </div>
            <div className="column">
                <img className="demo cursor" src="/assets/about.jpg" style={{width:'100%'}} 
                onClick={() => currentSlide(3)} 
                alt="Mountains and fjords"/>
            </div>
            <div className="column">
                <img className="demo cursor" src="/assets/about.jpg" style={{width:'100%'}} 
                  onClick={() => currentSlide(4)} 
                  alt="Northern Lights" 
                />
            </div>
            <div className="column">
                <img className="demo cursor" src="/assets/about.jpg" style={{width:'100%'}} 
                  onClick={() => currentSlide(5)} 
                  alt="Northern Lights" 
                />
            </div>
            <div className="column">
                <img className="demo cursor" src="/assets/about.jpg" style={{width:'100%'}} 
                  onClick={() => currentSlide(6)} 
                  alt="Northern Lights" 
                />
            </div>
            </div>
        </div>
        {/* <Lightbox /> */}
    </div>
  )
}

export default Gallery;

