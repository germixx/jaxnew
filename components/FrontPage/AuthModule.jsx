'use client';

import { useState, useEffect, useRef  } from 'react';

import LoginModal from './Modal/Login';
import RegisterModal from './Modal/Register';
import ForgotModal from './Modal/Forgot';

import { sanitizeInput, Register, Login, ForgotPassword } from '../../util/functions/client/input';

const AuthModule = (props) => {

    const [ showModal, setShowModal ] = useState(false);

    const [showLoginBox, setShowLoginBox] = useState(true);
    const [showRegisterBox, setShowRegisterBox] = useState(false);
    const [showForgotBox, setShowForgotBox] = useState(false);
    const [showStateStatus, setShowStateStatus] = useState('Sign In');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loading, setLoading] = useState(false);

    const showLogin = () => {
        setShowLoginBox(true);
        setShowRegisterBox(false);
        setShowForgotBox(false);
        setShowStateStatus('Sign In');
    }

    const showRegister = () => {
        setShowLoginBox(false);
        setShowRegisterBox(true);
        setShowForgotBox(false);
        setShowStateStatus('Register');
    }

    const showForgot = () => {
        setShowLoginBox(false);
        setShowRegisterBox(false);
        setShowForgotBox(true);
        setShowStateStatus('Password Reset');
    }

    const resetInputs = () => {
        setEmail('');
        setPassword('');
        setUsername('');
    }

    const handleInputChange = (e) => {
    
        const { name, value } = e.target;
    
        const sanitizedValue = sanitizeInput(name, value, setEmail, setPassword, setConfirmPassword, setUsername);

        return;
    };

  return (
        
            <div className="modal-login">
                
                <div onClick={()=> {props.closeLoginModal(); showLogin(); resetInputs();} } id="authentication-modal" tabIndex="-1" className={`overflow-y-auto overflow-x-hidden absolute top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full ${props.authModal === true ? 'block modal-backdrop' : 'hidden'}`}>
                    <div onClick={e => e.stopPropagation()}  className="relative p-4 w-full max-w-md max-h-full m-auto mt-[10%]">
                        
                        <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {showStateStatus}
                                </h3>
                                <button onClick={()=> { props.closeLoginModal(); showLogin(); resetInputs();} } type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            
                            {
                                showLoginBox ? (
                                    <LoginModal 
                                        showRegister={showRegister} 
                                        showForgot={showForgot} 
                                        setEmail={setEmail}
                                        email={email}
                                        setPassword={setPassword}
                                        password={password}
                                        handleInputChange={handleInputChange}
                                        loading={loading}
                                        setLoading={setLoading}
                                        Login={Login}
                                    />
                                ) : ''
                            }
                            
                            {
                                showRegisterBox ? (
                                    <RegisterModal 
                                        showLogin={showLogin} 
                                        showForgot={showForgot} 
                                        setEmail={setEmail}
                                        email={email}
                                        password={password}
                                        setPassword={setPassword}
                                        username={username}
                                        setUsername={setUsername}
                                        handleInputChange={handleInputChange}
                                        loading={loading}
                                        Register={Register}
                                        setLoading={setLoading}
                                        confirmPassword={confirmPassword}
                                        setConfirmPassword={setConfirmPassword}
                                    />
                                ) : ''
                            }

                            {
                                showForgotBox ? (
                                    <ForgotModal 
                                        showLogin={showLogin} 
                                        showRegister={showRegister} 
                                        setEmail={setEmail}
                                        email={email}
                                        handleInputChange={handleInputChange}
                                        loading={loading}
                                        setLoading={setLoading}
                                        ForgotPassword={ForgotPassword}
                                    />
                                ) : ''
                            }

                            
                        </div>
                    </div>
                </div> 
            </div>
        
   
  )
}

export default AuthModule;