'use client';

import { useState, useEffect } from "react";

import Link from 'next/link';

import SortedBy from './SortBy';

import JsonData from '../../../../data.json';

const Locations = (locations) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [locationsPerPage] = useState(6);
  const [filteredLocations, setFilteredLocations] = useState(locations.places);

  // Pagination calculation
  const totalPages = Math.ceil(filteredLocations.length / locationsPerPage);
  const indexOfLastLocation = currentPage * locationsPerPage;
  const indexOfFirstLocation = indexOfLastLocation - locationsPerPage;
  const currentLocations = filteredLocations.slice(indexOfFirstLocation, indexOfLastLocation);

  // ✅ Fix: Update filteredLocations directly when sorting
  const handleSort = (type, value) => {

    const sortedData = locations.places.filter((loc) => loc[type] === value);

    setFilteredLocations(sortedData);

    setCurrentPage(1); // Reset to first page after sorting
  };

  const changePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  
  if (locations.places.length === 0) {
    return <p>No items available.</p>;
  }

  return (
    <div>
      <div className="p-4 bg-gray-100 rounded-lg shadow-md text-center">
        <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Sort By Neighborhood</h2>
            <div className="flex flex-wrap justify-center gap-2">
            {
              JsonData.Places[0].Neighborhoods.map( (n, i) => {
                    return <button 
                              onClick={() => handleSort("neighborhood", n)}
                              key={i} 
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-full  
                                        sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 
                                        text-xs sm:text-sm md:text-base transition duration-300"
                            >
                               {n}
                          </button>
              })
            }
            </div>
            <br />
            <div className="p-4 bg-gray-100 rounded-lg shadow-md text-center">
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Sort By Category</h2>
                <div className="flex flex-wrap justify-center gap-2">
            {
                JsonData.Places[1].Categories.map((c, i) => {
                    return <button 
                              onClick={() => handleSort("locationCategory", c)}
                              key={i} 
                              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-full  
                sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 
                text-xs sm:text-sm md:text-base transition duration-300">
                        {c}
                    </button>
                })
            }
                </div>
            </div>
            
        </div>

        
          <br />
          <div className="container mx-auto flex justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {currentLocations.length > 0 ? (
              currentLocations.map((local, index) => (
                
                  <div key={local.id} className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700 flex flex-col h-full transition-transform transform hover:scale-105 hover:shadow-lg">
                    <Link href={{ pathname: `https://jacksonvillians.com/dashboard/places/${local.room_id}` }}>
                      <img className="rounded-t-lg w-full h-48 object-cover transition-all duration-300 hover:brightness-110" src={local.locationImage} alt={local.locationName} />
                    </Link>
                    <div className="p-5 flex flex-col flex-grow">
                      <Link href={{ pathname: `https://jacksonvillians.com/dashboard/places/${local.room_id}` }}>
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{local.locationName}</h5>
                      </Link>
                      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 flex-grow">{local.description}</p>
                      <div className="mt-auto">
                        <Link
                          href={{ pathname: `https://jacksonvillians.com/dashboard/places/${local.room_id}` }}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg transition-all duration-300 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Read more
                          <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))
              )  : (
                <p className="text-center text-gray-600 col-span-3">
                  No locations available.
                </p>
              )}

            </div>
          </div>
        

        {totalPages > 1 && (
        <div className="sticky bottom-4 flex justify-center mt-6">
          <nav className="flex space-x-2 bg-white shadow-md rounded-lg p-2">
            <button
              onClick={() => changePage(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg ${
                currentPage === 1
                  ? "bg-gray-300 text-gray-500"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              &laquo;
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => changePage(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white font-semibold"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => changePage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg ${
                currentPage === totalPages
                  ? "bg-gray-300 text-gray-500"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              &raquo;
            </button>
          </nav>
        </div>
      )}

    </div>
  )
}

export default Locations;