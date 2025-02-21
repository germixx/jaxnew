'use client';

import LoadingInfinity from '../../LoadingInfinity';

const LoginModal = (props) => {
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
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" placeholder="name@company.com" required />
                                    </div>
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
                                        <input type="password" name="password" id="password" placeholder="••••••••" 
                                            onChange={props.handleInputChange} 
                                            value={props.password} 
                                            maxLength={30}
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" required />
                                    </div>
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
                                            onClick={() => props.Login(props.setLoading)} 
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