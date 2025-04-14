'use client';

import { useEffect, useState } from 'react';

import BreadCrumb from '../../../components/Client/Breadcrumb';
import Loading from '../../../components/Loading';
import NewPlaceModal from '../../../components/Client/Admin/Places/NewPlace';
import Locations from '../../../components/Client/Admin/Places/Listings';

import { useUser } from "@/context/UserContext";

import {
    getLocationsAdmin,
    editPlaceDataAdmin
} from '../../../util/functions/client/admin/functions';

const AdminPlaces = (props) => {

    const { user, login, logout } = useUser();
    
    const [isLoading, SetIsLoading] = useState(true);
    const [placess, setPlaces] = useState([]);
    const [selectedBusiness, setSelectedBusiness] = useState(null);

    function newPlaceModal() {
        document.getElementById('roomModal').style.display = 'flex';
    }

    useEffect(() => {

        (async () => {

            let rr = await getLocationsAdmin();

            if (rr.status) {

                setPlaces(rr.locations);
                SetIsLoading(false);
            }

        })();
    }, []);

    const updatePlacesData = async (newData) => {
        
        const formdata = new FormData();

        Object.keys(newData).forEach((key) => {
            
          if (key === "image" && newData.image) {
            formdata.append("image", newData.image);
          } else {
            formdata.append(key, newData[key]);
          }
    
        });
        
        // Update database here with all values of newData
        let result = await editPlaceDataAdmin(formdata);
        if (result.status) {

            setPlaces((prev) => {
                return prev.map((biz) => (biz.id === newData.id ? newData : biz))
            });
            setSelectedBusiness(null);
        }

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
                        <NewPlaceModal
                            places={placess}
                            setPlaces={setPlaces}
                        />
                        <Locations
                            places={placess}
                            user={user}
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