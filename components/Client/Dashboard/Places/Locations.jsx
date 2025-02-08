'use client';

import SortedBy from './SortBy';

import JsonData from '../../../../data.json';

const Locations = () => {


  function sortBy (fx, val) {
    console.log(fx , val)
  }

  return (
    <div>
      <SortedBy sortBys={sortBy} neighborhoods={JsonData.Places[0].Neighborhoods} categories={JsonData.Places[1].Categories} />
      <div>
        <div class="max-w-sm rounded overflow-hidden shadow-lg">
          <img class="w-full" src="https://old.jacksonvillians.com/api/image/4wnf3mb5u" alt="Sunset in the mountains" />
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
          </div>
          <div class="px-6 pt-4 pb-2">
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
            <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Locations;