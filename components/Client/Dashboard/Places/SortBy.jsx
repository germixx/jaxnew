'use client';

const SortBy = (props) => {
    
  return <div className="">
        
        {
           props.neighborhoods.map( (n, i) => {
                return <button onClick={() => props.sortBys('neighborhood', n)} key={i} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    {n}
                </button>
           })
        }
        <br />
        {
            props.categories.map((c, i) => {
                return <button onClick={() => props.sortBys('category', c)}  key={i} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                    {c}
                </button>
            })
        }
        


    </div>
  
}

export default SortBy;