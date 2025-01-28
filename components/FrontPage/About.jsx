'use client';

import Image from 'next/image';

const About = (props) => {
    return (
        <div id="about">
          <div className="container">
            <div className="grid sm:grid-cols-2 gap-4">
              <div> 
                <img src="/assets/about.jpg" alt="" /> 
              </div>
              <div>
                <div className="about-text">
                  <h2>ABOUT US</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <h3>Why Jacksonville?</h3>
                  <div className="list-style">
                    <div className="">
                      <ul>
                        <li>Lorem ipsum dolor</li>
                        <li>Lorem ipsum dolor</li>
                        <li>Lorem ipsum dolor</li>
                        <li>Lorem ipsum dolor</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
}

// Lorem ipsum dolor
// Tempor incididunt
// Lorem ipsum dolor
// Incididunt ut labore

export default About;