'use client';

const SortBy = (props) => {
    
  return <div className="">
        
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
        <br />
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
  
}

export default SortBy;