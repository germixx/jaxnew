'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useUser } from "@/context/UserContext";
import { useLocation } from "@/context/LocationContext";

import LoadingInfinity from '../../LoadingInfinity';

const LoginModal = (props) => {

    const router = useRouter();

    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState('');
    const [loginNameError, setLoginNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [locationCoords, setLocationCoords] = useState({});

    const { user, login, logout } = useUser();
    const { location, locationError } = useLocation();
    console.log(user, ' is user')
    const handleError = (type, message) => {

        if (type === 'identifier') {
            setError(message);
            setLoginNameError(true);
            setPasswordError('');
            props.setLoading(false);

        }

        if (type === 'password') {
            setError(message);
            setPasswordError(true);
            setLoginNameError('');
            props.setLoading(false);
        }

        if (type === 'lockout') {
            setError(message);
            setPasswordError(true);
            setLoginNameError(true);
            props.setLoading(false);
        }
    }

    const handleSuccess = (data) => {

        login({
            id: data.user.id,
            username: data.user.username,
            email: data.user.email,
            banned: data.user.banned,
            verified: data.user.verified,
            isAdmin: data.user.isAdmin,
            location: location,
            profileImage: data.user.profileImage
        });
        // console.log(data.accessToken, ' is access token')
        sessionStorage.setItem("accessToken", data.accessToken);
        router.push('/dashboard');
    }

    useEffect(() => {
        setLocationCoords(location ? location : { latitude: null, longitude: null });
    }, []);

    return (
        <div>
            <div className="p-4 md:p-5">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="emailForm" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email or username</label>
                        <input
                            type="text"
                            onChange={(e) => setIdentifier(e.target.value)}
                            value={identifier}
                            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white ${loginNameError ? "border-red-500" : "border-gray-300"}`}
                            placeholder="name@company.com or username"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                        <input
                            type="password"
                            placeholder="•••••••• (8+ chars)"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            maxLength={30}
                            className={`bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:placeholder-gray-400 dark:text-white ${passwordError ? "border-red-500" : "border-gray-300"}`} required />
                    </div>
                    {error && <p className="text-center text-red-500 text-sm mt-1">{error}</p>}
                    <div className="flex justify-between">
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded-sm bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" required />
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
                            onClick={(e) => props.Login(e, props.setLoading, identifier, password, handleError, handleSuccess)}
                            type="submit"
                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            Login to your account
                        </button>
                    )}

                    <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                        Not registered? <button onClick={() => props.showRegister()} className="text-blue-700 hover:underline dark:text-blue-500">Create account</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal;