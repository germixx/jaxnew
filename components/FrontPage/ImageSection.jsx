'use client';

import Image from 'next/image';

const ImageSection = (props) => {
  return (
    <div>
        <div className='h-[100dvh] intro' style={{ backgroundImage: `url('/assets/intro-bg.jpg')` }}>
          <div className="overlay">
            <div className="container">
              <div className="antialiased flex flex-row min-h-screen justify-center items-center">
                <div className="intro-text text-center">
                  <p className='sm:text-7xl text-5xl text-center mb-6 text-wrap font-bold'>
                  A More Connected<br/> Jacksonville
                    
                  </p>
                  <p className='text-wrap text-center mb-9 font-semibold'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed dapibus leo nec ornare diam sed commodo nibh ante facilisis bibendum.
                  </p>
                  <a
                    href="#features"
                    className="btn text-xl border inline-block font-normal leading-[1.5] text-center align-middle bg-transparent rounded-full p-4 bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
                  >
                    Learn More
                    </a>{" "}
                </div>
              </div>
            </div>
          </div>
            {/* <Image
              className="intro"
              src="/assets/intro-bg.jpg"
              width={0}
              height={0}
              sizes="100vw"
              alt="Picture of the author"
              style={{ width: '100%', height: '100%' }}
            /> */}

            {/* <img src={'/assets/intro-bg.jpg'} alt="" /> */}
        </div>
    </div>
  )
}

export default ImageSection