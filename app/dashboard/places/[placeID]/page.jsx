'use client';

import { useEffect, useState } from 'react';

import { useParams } from 'next/navigation'

import Loading from '../../../../components/Loading';

import { fetchPlaceData } from '../../../../util/functions/client/functions';

export default function Place () {

   const params = useParams();
   
   const ids = (params).placeID

   const [isLoading, setIsLoading] = useState(false);
   const [placeData, setPlaceData] = useState({});

    useEffect(() => {
        
        (async () => {
            let data = await fetchPlaceData(ids);
            setPlaceData(data.locations[0]);
            setIsLoading(false);
        })()

    }, []);
    
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
           
                <div className="p-4 md:ml-64 h-auto pt-20">
                    
                        <img className="h-auto max-w-xs h-auto max-w-xl rounded-lg shadow-xl dark:shadow-gray-800" src={placeData.locationImage} alt="image description" />
                    
                    <div className="mx-auto text-black">
                        {placeData.locationName} 
                    </div>
       
                    <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
                    <div className="bg-blue-500 text-white p-6 rounded-lg h-64">Chatroom</div>
                    <div className="bg-blue-500 text-white p-6 rounded-lg h-64">Reviews</div>
                    <div className="bg-blue-500 text-white p-6 rounded-lg h-64">Rate</div>
                    <div className="bg-blue-500 text-white p-6 rounded-lg h-64">Events</div>
                </div>
            </div>
        </div>
        )}
        
    </div>


  )
}

