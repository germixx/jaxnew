'use client';

const LetUsKnow = () => {
  return (
    <div id="contact">
      <div className="container">
      
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        
          <div className="col-span-1 md:col-span-3 p-4">
            <div className="section-title">
                <h2>Let Us Know</h2>
                <p>
                  Please send us an email below and we
                  will get back to you as soon as possible.
                  </p>
              </div>
              
              <form className="w-100" name="sentMessage" id="contactForm" noValidate>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        // onChange={(e) => setContactFormName(e.target.value.replace(/[^\w\s]/gi, ''))}
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder="Name"
                        required="required"
                        // value={contactFormName}
                      />
                      <p id="contact-name-error" className="help-block text-danger"></p>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        // onChange={(e) => handleEmail(e)}
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email"
                        required="required"
                        // value={contactFormEmail}
                      />
                      <p className="help-block text-danger">
                        {/* {
                          contactFormEmailError ? (
                            <ul>
                              <li>Not a valid email address</li>
                            </ul>
                          ) : ('')
                        } */}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="form-group">
                  <textarea
                    // onChange={(e) => setContactFormMessage(e.target.value)}
                    name="message"
                    id="message"
                    className="form-control"
                    rows="4"
                    placeholder="Message"
                    required
                    // value={contactFormMessage}
                  ></textarea>
                  <p id="contact-message-error" className="help-block text-danger"></p>
                </div>
                <div id="success"></div>
                <button 
                // onClick={(e) => submitMessage(e)} 
                type="submit" className="btn btn-custom btn-lg">
                  Send Message
                  </button>
              </form>
            
          </div>

          <div className="col-span-1 md:col-span-2 p-4 text-center">
          <div className="contact-item">
              <h3>Contact Info</h3>
              <p>
                <span>
                  <i className="fa fa-map-marker"></i> Address
                  </span>
                {'Jacksonville, Fl 32256'}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-phone"></i> Phone
                  </span>{" "}
                {'(904) 385-0377'}
              </p>
            </div>
            <div className="contact-item">
              <p>
                <span>
                  <i className="fa fa-envelope-o"></i> Email
                  </span>{" "}
                {'hello@jacksonvillians.com'}
              </p>
            </div>
          </div>
        </div>
      
      </div>
    </div>
  )
}

export default LetUsKnow;