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
                   <div className="container mx-auto">
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               
                          {locations.places.locations.map((local, index) => {
                            return (
                              <div key={local.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
                                  <Link href={{pathname: `https://new.jacksonvillians.com/dashboard/places/${local.room_id}`}}>
                                    <img className="rounded-t-lg w-full h-48 object-cover" src={local.locationImage} alt={local.locationName} />
                                  </Link>
                                  <div className="p-5">
                                    <Link href={{pathname: `https://new.jacksonvillians.com/dashboard/places/${local.room_id}`}}>
                                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{local.locationName}</h5>
                                    </Link>
                                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{local.description}</p>
                                      <Link href={{pathname: `https://new.jacksonvillians.com/dashboard/places/${local.room_id}`}} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                          Read more
                                          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                          </svg>
                                      </Link>
                                  </div>
                                </div>
                              )
                            })
                          }

                         </div>
                       </div>
     
           </div>
         </div>
 
    </div>
  )
}

export default Locations;




        {/* <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src="https://old.jacksonvillians.com/api/image/4wnf3mb5u" alt="Sunset in the mountains" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
          </div>
        </div> */}


        {/* <div className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                          <img src="https://old.jacksonvillians.com/api/image/4wnf3mb5u" alt="Placeholder" className="w-full h-48 object-cover" />
                          <div className="p-4">
                              <h2 className="text-xl font-semibold mb-2">Card Title 3</h2>
                              <p className="text-gray-600">This is a short description for the third card.</p>
                              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Learn More</button>
                          </div>
                      </div> */}