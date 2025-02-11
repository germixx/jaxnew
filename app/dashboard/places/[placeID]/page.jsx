'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation'

import Loading from '../../../../components/Loading';
import ChatRoom from '../../../../components/Client/Dashboard/Places/Chatroom';

import { fetchPlaceData } from '../../../../util/functions/client/functions';

export default function Place () {

   const params = useParams();
   
   const ids = (params).placeID

   const [isLoading, setIsLoading] = useState(false);
   const [placeData, setPlaceData] = useState({});
   const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        
        (async () => {
            let data = await fetchPlaceData(ids);
            setPlaceData(data.locations[0]);
            setIsLoading(false);
        })()

    }, []);

    const formatPhoneNumber = (number) => {

        if (!number) return "";
        
        const cleaned = number.toString().replace(/\D/g, ""); // Remove non-numeric characters

        if (cleaned.length !== 10) return number; // Return original if not 10 digits
      
        const formatted = `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;

        return formatted;

    };

    const openChatModal = () => {
        document.getElementById('chatModal').style.display = 'flex';
    }
    
    return (

        <div>
            {isLoading ? (
                    <div className="antialiased flex flex-row min-h-screen justify-center items-center">
                    <div className=" md:ml-64 h-auto">
                            <Loading />
                    </div>
                    </div>
            ) : (
                <div className="antialiased">
            
                    <div className="p-4 md:ml-64 h-auto pt-20 flex flex-col min-h-screen">
                        <div className="flex flex-col lg:flex-row items-center bg-white shadow-lg p-6 rounded-2xl">
                            
                            <img
                                src={placeData.locationImage}
                                alt="Business Logo"
                                className={`w-40 h-40 object-cover border-2 border-gray-400 rounded-lg shadow-md mb-5 ${
                                    imageLoaded ? "opacity-100" : "opacity-0"
                                }`}
                                loading="lazy"
                                onLoad={() => setImageLoaded(true)}
                            />

                            <div className="ml-6">
                                <h1 className="text-2xl font-bold text-gray-900">{placeData.locationName}</h1>
                                <p className="text-gray-600">{placeData.locationAddress}, {placeData.locationCity}, {placeData.locationState}</p>
                                <p className="text-gray-600">Phone: {formatPhoneNumber(placeData.locationPhoneNumber)} </p>
                            </div>
                            <div className="w-full lg:w-60 h-40 bg-gray-100 flex items-center justify-center rounded-lg shadow-md mt-4 lg:mt-0 lg:ml-auto">
                                <p className="text-gray-500 text-sm text-center">Ad Space Available</p>
                            </div>
                        </div>

                    
        
                        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">

                        <div className="max-w-sm bg-white shadow-lg rounded-2xl p-6 border border-gray-400 text-center flex flex-col h-full">
                            <div className="flex justify-center">
                                <div className="bg-blue-100 p-4 rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-12 h-12 text-blue-500"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 15h6m3 5-3-3H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1z"
                                    />
                                </svg>
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mt-4">Chat with Us</h2>
                            <p className="text-gray-600 mt-2">
                                Need help? Our support team is available 24/7. Click below to start a chat.
                            </p>
                            <button onClick={() => openChatModal()} className="mt-auto w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
                                Join Chat
                            </button>
                        </div>


                        <div className="max-w-sm bg-white shadow-lg rounded-2xl p-6 border border-gray-400 text-center flex flex-col h-full">
                            <div className="flex justify-center">
                                <div className="bg-orange-100 p-4 rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-12 h-12 text-orange-500"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 20h9m-9 0a4 4 0 0 1-4-4H4l2-2m6 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"
                                    />
                                </svg>
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mt-4">Customer Reviews</h2>
                            <p className="text-gray-600 mt-2 flex-grow">
                                Read what our customers have to say and share your own experience with us!
                            </p>
                            <button className="mt-auto w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-lg transition">
                                Read Reviews
                            </button>
                        </div>


                        <div className="max-w-sm bg-white shadow-lg rounded-2xl p-6 border border-gray-400 text-center flex flex-col h-full">
                            <div className="flex justify-center">
                                <div className="bg-blue-100 p-4 rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-12 h-12 text-blue-500"
                                >
                                    <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M8 7V3m8 4V3m-9 8h10m-11 10h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"
                                    />
                                </svg>
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mt-4">Upcoming Events</h2>
                            <p className="text-gray-600 mt-2">
                                Stay updated with the latest events. Join us for exciting experiences and networking opportunities!
                            </p>
                            <button className="mt-auto w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition">
                                View Events
                            </button>
                        </div>


                        <div className="max-w-sm bg-white shadow-lg rounded-2xl p-6 border border-gray-400 text-center flex flex-col h-full">
                            <div className="flex justify-center">
                                <div className="bg-yellow-100 p-4 rounded-full">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                    className="w-12 h-12 text-yellow-500"
                                >
                                    <path d="M12 17.75l-5.516 2.9a1 1 0 0 1-1.451-1.054l1.054-6.15L1.89 9.35a1 1 0 0 1 .554-1.705l6.17-.9L11.5 1.2a1 1 0 0 1 1.8 0l2.78 5.545 6.17.9a1 1 0 0 1 .554 1.705l-4.197 4.096 1.054 6.15a1 1 0 0 1-1.451 1.054L12 17.75z" />
                                </svg>
                                </div>
                            </div>
                            <h2 className="text-xl font-semibold text-gray-800 mt-4">Rate Our Service</h2>
                            <p className="text-gray-600 mt-2">
                                Your feedback helps us improve! Give us a rating and share your experience with everyone.
                            </p>
                            <button className="mt-6 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg transition">
                                Give a Rating
                            </button>
                        </div>
                    </div>
                    <ChatRoom placeData={placeData}/>
                </div>


            </div>
            )}
            
        </div>


  )
}

