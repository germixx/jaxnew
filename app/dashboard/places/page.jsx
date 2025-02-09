'use client';

import { useEffect, useState } from 'react';

import Loading from '../../../components/Loading';
import Locations from '../../../components/Client/Dashboard/Places/Locations';

import { fetchLocations } from '../../../util/functions/client/functions';

const Places = () => {

  const [isLoading, SetIsLoading] = useState(true);
  const [placess, setPlaces] = useState([]);

  useEffect(() => {

    (async () => {

      setPlaces(await fetchLocations())
      SetIsLoading(false);

    })()

  }, [])

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
              <Locations places={placess} />
            </div>
        </div>
      )}
    </div>
  )
}

export default Places;

