'use client';

const Listings = (locations) => {

    if(locations.places) {
        if (locations.places.length === 0) {
            return <p>No items available.</p>;
        }
    }

  return (
    <div className="cursor-pointer w-full min-h-screen flex flex-col items-center p-5 bg-gray-100">
        <h2 className="text-center text-3xl font-bold mb-5 text-black">Listings</h2>
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full table-auto border-collapse">
            <thead>
            <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                <th className="p-3 text-left border">ID</th>
                <th className="p-3 text-left border">Name</th>
            </tr>
            </thead>
            <tbody>
            {
            
                locations.places ? (
                    locations.places.map((biz, index) => (
                        <tr 
                            onClick={()=> alert('data pop up here', biz.id)}
                            key={biz.id} 
                            className={`text-gray-900 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'} hover:bg-gray-200 transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-md`}
                        >                         
                        <td className="p-3 border">{biz.id}</td>
                        <td className="p-3 border font-semibold">{biz.locationName}</td>
                        </tr>
                    ))
                ) : ('')
            
            }
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default Listings;




// {
//     locations.places ? (
//         locations.places.map((biz) => (
//             console.log(biz, ' is biz'),
//             <li key={biz.id} className="bg-white text-black p-4 rounded-lg shadow-md transition-transform transform hover:scale-105">
//             <h3 className="text-lg font-semibold">{biz.locationName}</h3>
            
//             </li>
//         ))
//     ) : ('')
// }