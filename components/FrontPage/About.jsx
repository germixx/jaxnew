'use client';

import Image from 'next/image';

const About = (props) => {
    return (
        <div id="about">
          <div className="container">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className=" column1"> 
                <img src="/assets/about.jpg" className="img-responsive" alt="" /> 
              </div>
              <div className="colums-2">
                <div className="about-text">
                  <h2>About Us</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <h3>Why Jacksonville?</h3>
                  <div className="list-style">
                    <div className="col-lg-6 col-sm-6 col-xs-12">
                      <ul>
                        {props.data ? props.data.Why.map((d, i) => <li key={`${d}-${i}`}>{d}</li>) : 'loading'}
                      </ul>
                    </div>
                    <div className="col-lg-6 col-sm-6 col-xs-12">
                      <ul>
                        {props.data ? props.data.Why2.map((d, i) => <li key={`${d}-${i}`}> {d}</li>) : 'loading'}
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

export default About;