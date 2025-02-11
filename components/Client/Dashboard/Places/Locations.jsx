'use client';

import Link from 'next/link';

import SortedBy from './SortBy';

import JsonData from '../../../../data.json';

const Locations = ( locations ) => {

  function sortBy (fx, val) {
    console.log(fx , val)
  }

  if(locations.places.locations.length === 0) {
    return <p>No items available.</p>;
  }

  return (
    <div>
           <div>
           <SortedBy sortBys={sortBy} neighborhoods={JsonData.Places[0].Neighborhoods} categories={JsonData.Places[1].Categories} />
           <div>
             <br />
                   <div className="container mx-auto flex justify-center">
                       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               
                          {locations.places.locations.map((local, index) => {
                            return (
                              <div key={local.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col h-full transition-transform transform hover:scale-105 hover:shadow-lg">
                                  <Link href={{pathname: `https://new.jacksonvillians.com/dashboard/places/${local.room_id}`}}>
                                    <img className="rounded-t-lg w-full h-48 object-cover transition-all duration-300 hover:brightness-110" src={local.locationImage} alt={local.locationName} />
                                  </Link>
                                  <div className="p-5 flex flex-col flex-grow">
                                    <Link href={{pathname: `https://new.jacksonvillians.com/dashboard/places/${local.room_id}`}}>
                                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{local.locationName}</h5>
                                    </Link>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex-grow">{local.description}</p>
                                      <div className="mt-auto">
                                        <Link 
                                          href={{pathname: `https://new.jacksonvillians.com/dashboard/places/${local.room_id}`}} 
                                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg transition-all duration-300 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Read more
                                            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                            </svg>
                                        </Link>
                                      </div>
                                  </div>
                                </div>
                              )
                            })
                          }

                         </div>
                       </div> 
                  </div>
           
         </div>

          <div className="sticky bottom-4 flex justify-center">
            <nav className="flex space-x-2 bg-white shadow-md rounded-lg p-2">
              <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">&laquo;</button>
              <button className="px-4 py-2 rounded-lg bg-blue-500 text-white font-semibold">1</button>
              <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">2</button>
              <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">3</button>
              <button className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300">&raquo;</button>
            </nav>
          </div>



    </div>
  )
}

export default Locations;