// const Reviews = ({ placeData, reviews, isOpen  }) => {

//   const closeModal = () => {
//     document.getElementById('reviewsModal').style.display = 'none';
//   }
  
//   return (
//     <div id="reviewsModal" className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 hidden">
//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl h-3/4 flex flex-col">
        
//         <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
//           <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{placeData.locationName}</h2>
//           <button onClick={closeModal} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">&times;</button>
//         </div>
        
//         <div className="p-4 space-y-4 flex-1 overflow-y-auto">
//         {reviews.map((review, index) => (
//     <div
//       key={index}
//       className="flex flex-col sm:flex-row sm:items-start gap-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm"
//     >
//       {/* Avatar */}
//       <img
//         src={review.avatar || 'https://via.placeholder.com/40'}
//         alt={review.name}
//         className="w-12 h-12 rounded-full object-cover"
//       />

//       {/* Review Content */}
//       <div className="flex-1">
//         <div className="flex flex-col sm:flex-row sm:justify-between">
//           <h4 className="text-md font-semibold text-gray-900 dark:text-white">{review.name}</h4>
//           <span className="text-sm text-gray-500 dark:text-gray-300">{review.time}</span>
//         </div>

//         <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">{review.text}</p>

//         <div className="mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-300">
//           {review.location && <p><strong>📍 Location:</strong> {review.location}</p>}
//           {review.cost !== undefined && (
//             <p><strong>💵 Cost:</strong> {review.cost > 0 ? `$${review.cost}` : 'Free'}</p>
//           )}
//         </div>
//       </div>
//     </div>
//   ))}
//         </div>
        
//         <div className="p-4 border-t dark:border-gray-600 flex items-center space-x-2 mt-auto">
//           <input type="text" className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white" placeholder="Write a review..." />
//           <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Send</button>
//         </div>
//       </div>
//   </div>
//   )
// }

// export default Reviews;




const Reviews = ({ placeData, reviews, isOpen  }) => {

  const closeModal = () => {
    document.getElementById('reviewsModal').style.display = 'none';
  }
  
  const averageRating = (
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length || 0
  ).toFixed(1);

  return (
    <div id="reviewsModal" className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 hidden" onClick={closeModal}>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl h-4/5 flex flex-col" onClick={(e)=> e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {placeData?.locationName || 'Location'}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {averageRating} / 5 stars ({reviews.length} reviews)
            </p>
          </div>
          <button onClick={closeModal} className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl font-bold">
            &times;
          </button>
        </div>

        {/* Reviews Body */}
        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
          {reviews.map((review, index) => (
            <div key={index} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <img src={review.userImage || "/placeholder.jpg"} alt={review.user} className="w-8 h-8 rounded-full" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{review.user}</span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{review.time}</span>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  
                  <div
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              {/* Comment */}
              <p className="text-sm text-gray-800 dark:text-gray-100 mb-2">{review.text}</p>

              {/* Extra Details */}
              <div className="flex flex-wrap text-xs text-gray-500 dark:text-gray-400 gap-4">
                <span>📍 {review.location}</span>
                <span>💵 {review.cost}</span>
                <span>🕒 {review.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer (optional add review box) */}
        <div className="p-4 border-t dark:border-gray-600 mt-auto flex items-center space-x-2">
          <input
            type="text"
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            placeholder="Write a review..."
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Reviews;