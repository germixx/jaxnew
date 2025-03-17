'use client';

import { useEffect, useState } from 'react';

import BreadCrumb from '../../../components/Client/Breadcrumb';
import Loading from '../../../components/Loading';
import NewPlaceModal from '../../../components/Client/Admin/Places/NewPlace';
import Locations from '../../../components/Client/Admin/Places/Listings';

import { fetchLocations } from '../../../util/functions/client/functions';

const AdminPlaces = () => {

  const [isLoading, SetIsLoading] = useState(true);
  const [placess, setPlaces] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  function newPlaceModal () {
    document.getElementById('roomModal').style.display = 'flex';
  }
  
  useEffect( ()=>{
    
    (async ()=> {

        let rr = await fetchLocations();
        
        if(rr.status ){
            
            setPlaces(rr.locations);
            // setPlaces(await fetchLocations());
            SetIsLoading(false);
        }

    })();
  }, []);

  const updatePlacesData = (newData) => {

    // Update database here with all values of newData
    console.log(newData, ' is new daty')
    setPlaces((prev) => {
        return prev.map((biz) => (biz.id === newData.id ? newData : biz))
    });
    setSelectedBusiness(null);
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
                <div className="p-4 md:ml-64 h-auto pt-20">
                <button 
                    onClick={() => newPlaceModal()}
                    className="float-right bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105"
                >New +</button>
                <BreadCrumb />
                <NewPlaceModal />
                <Locations 
                    places={placess} 
                    updatePlaces={updatePlacesData}
                    setPlaces={setPlaces}
                    selectedBusiness={selectedBusiness}
                    setSelectedBusiness={setSelectedBusiness}
                />
                </div>
            </div>
        )}
  </div>
  )
}

export default AdminPlaces;