'use client';

import LoadingInfinity from '../../LoadingInfinity';

const Forgot = (props) => {
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
                                            
                                            {
                                                props.loading ? (
                                                    <div className="flex justify-center items-center">
                                                        <LoadingInfinity />
                                                    </div>
                                                ) : (
                                                    <button onClick={()=>props.ForgotPassword(props.setLoading)} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Password Reset</button>
                                                )
                                            }
                                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                                Registered? <button onClick={() => props.showLogin()} className="text-blue-700 hover:underline dark:text-blue-500">Sign In</button>
                                            </div>
                                            <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                                                Not registered? <button onClick={() => props.showRegister()} className="text-blue-700 hover:underline dark:text-blue-500">Create account</button>
                                            </div>
                                        </div>
                                    </div>
    </div>
  )
}

export default Forgot;