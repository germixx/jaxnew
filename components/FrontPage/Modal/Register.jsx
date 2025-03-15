'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useUser } from "@/context/UserContext";
import { useLocation } from "@/context/LocationContext";

import LoadingInfinity from '../../LoadingInfinity';

const Register = (props) => {
  
    const router = useRouter();

    const [error, setError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [locationCoords, setLocationCoords] = useState({});

    const { user, login, logout } = useUser();
    const { location, locationError } = useLocation();

    useEffect(()=>{
        setLocationCoords(location ? location : {latitude: null, longitude: null});
    //     login({username: 'test', email: 'aol@aol.com', location: location})
    }, [])

    const handleError = (type, message) => {

        if(type === 'email') {
            setError(message);
            setEmailError(true);
            setUsernameError('');
            setPasswordError('');
        }

        if(type === 'username') {
            setError(message);
            setUsernameError(true);
            setPasswordError('');
            setEmailError('');
        }

        if(type === 'password') {
            setError(message);
            setPasswordError(true);
            setEmailError('');
            setUsernameError('');
        }
    }

    const handleRegister = async () => {
        
        let result = await props.Register(props.setLoading, props.username, props.password, props.confirmPassword, props.email, locationCoords.latitude, locationCoords.longitude, handleError)
        
        if(result.status) {
            login({ id: result.ID, username: result.username, email: result.email, role: result.role, location: location})
            router.push('/dashboard');
        }
    }
   
    return (
        <div>
            <div className="p-4 md:p-5">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="emailForm" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input 
                            type="email" name="email" id="emailForm" 
                            onChange={props.handleInputChange} 
                            value={props.email} 
                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white ${emailError ? "border-red-500" : "border-gray-300"}`} placeholder="name@company.com" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input 
                            type="password" name="password" id="password" placeholder="••••••••" 
                            onChange={props.handleInputChange} 
                            value={props.password} 
                            maxLength={30}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input 
                            type="password" name="password2" id="passwordConfirm" placeholder="••••••••" 
                            onChange={props.handleInputChange} 
                            value={props.confirmPassword} 
                            maxLength={30}
                            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white ${passwordError ? "border-red-500" : "border-gray-300"}`} required />
                    </div>
                    
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                        <input 
                            type="text" name="username" id="username" placeholder="username" 
                            onChange={props.handleInputChange} 
                            value={props.username}
                            maxLength={17}
                            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white ${usernameError ? "border-red-500" : "border-gray-300"}`} required />
                    </div>
                    {error && <p className="text-center text-red-500 text-sm mt-1">{error}</p>}
                    <div className="flex justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
                            </div>
                            <label htmlFor="remember" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Remember me</label>
                        </div>
                        <button onClick={() => props.showForgot()} className="text-sm text-blue-700 hover:underline dark:text-blue-500">Lost Password?</button>
                    </div>
                    {props.loading ? (
                                <div className="flex justify-center items-center">
                                    <LoadingInfinity />
                                </div>
                    ) : (
                        <button 
                            type="submit" 
                            // onClick={() => props.Register(props.setLoading, props.username, props.password, props.confirmPassword, props.email, locationCoords.latitude, locationCoords.longitude, handleError)}
                            onClick={() => handleRegister(props.setLoading, props.username, props.password, props.confirmPassword, props.email, locationCoords.latitude, locationCoords.longitude, handleError)}
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Register</button>
                    )}
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Registered? <button onClick={() => props.showLogin()} className="text-blue-700 hover:underline dark:text-blue-500">Sign In</button>
                    </div>
                </div>
            </div>        
        </div>
  )
}

export default Register;