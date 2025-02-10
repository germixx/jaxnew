'use client';

const SortBy = (props) => {
    
  return <div className="p-4 bg-gray-100 rounded-lg shadow-md text-center">
    <h2 className="text-lg sm:text-xl font-bold text-gray-800 mb-3">Sort By Neighborhood</h2>
        <div className="flex flex-wrap justify-center gap-2">
        {
           props.neighborhoods.map( (n, i) => {
                return <button onClick={() => props.sortBys('neighborhood', n)} key={i} 
                
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-full  
             sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 
             text-xs sm:text-sm md:text-base transition duration-300">
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
            props.categories.map((c, i) => {
                return <button onClick={() => props.sortBys('category', c)}  key={i} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1.5 px-3 rounded-full  
             sm:px-4 sm:py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 
             text-xs sm:text-sm md:text-base transition duration-300">
                    {c}
                </button>
            })
        }
            </div>
        </div>
        
        


    </div>
  
}

export default SortBy;