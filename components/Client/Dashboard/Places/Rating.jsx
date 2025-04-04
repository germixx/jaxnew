'use client';

import { useEffect, useState } from "react";

const Rating = ({serviceData, ratings}) => {

    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');

    const closeModal = () => {
        document.getElementById('ratingsModal').style.display = 'none';
    }

  return (
    <div id="ratingsModal" className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 hidden" onClick={closeModal}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl h-1/2 flex flex-col"  onClick={(e)=> e.stopPropagation()}>
        
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{serviceData.name}</h2>
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-900 dark:hover:text-white  text-2xl">
                 &times;
            </button>
        </div>
        
        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {ratings.map((rating, index) => (
    <div
      key={index}
      className="flex flex-col sm:flex-row sm:items-start gap-4 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm"
    >
      {/* Avatar */}
      <img
        src={rating.avatar || 'https://via.placeholder.com/40'}
        alt={rating.name}
        className="w-12 h-12 rounded-full object-cover"
      />

      {/* Rating Content */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <h4 className="text-md font-semibold text-gray-900 dark:text-white">{rating.name}</h4>
          <span className="text-sm text-gray-500 dark:text-gray-300">{rating.time}</span>
        </div>

        {/* Star Rating */}
        <div className="flex items-center mt-1">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              className={`w-4 h-4 mr-1 ${i < rating.stars ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-500'}`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.946a1 1 0 00.95.69h4.155c.969 0 1.371 1.24.588 1.81l-3.364 2.448a1 1 0 00-.364 1.118l1.287 3.946c.3.921-.755 1.688-1.538 1.118l-3.364-2.448a1 1 0 00-1.175 0l-3.364 2.448c-.783.57-1.838-.197-1.538-1.118l1.287-3.946a1 1 0 00-.364-1.118L2.07 9.373c-.783-.57-.38-1.81.588-1.81h4.155a1 1 0 00.95-.69l1.286-3.946z" />
            </svg>
          ))}
        </div>

        {/* Comment */}
        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">{rating.comment}</p>

        {/* Details */}
        {/* <div className="mt-3 space-y-1 text-sm text-gray-700 dark:text-gray-300">
          {rating.location && <p><strong>📍 Location:</strong> {rating.location}</p>}
          {rating.cost !== undefined && (
            <p><strong>💵 Cost:</strong> {rating.cost > 0 ? `$${rating.cost}` : 'Free'}</p>
          )}
        </div> */}
      </div>
    </div>
  ))}

            <div className="text-center">
                {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    onClick={() => handleRatingChange(star)}
                    className={`text-xl ${rating >= star ? 'text-yellow-400' : 'text-gray-400'}`}
                >
                    ★
                </button>
                ))}
            </div>

            {/* Feedback Section */}
            <textarea
            value={feedback}
            // onChange={(e) => setFeedback(e.target.value)}
            className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
            placeholder="Leave your feedback..."
            rows="4"
            />
        </div>
        
        <div className="p-4 border-t dark:border-gray-600 flex items-center space-x-2 mt-auto">
            <button
            // onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
            Submit Rating
            </button>
        </div>
        </div>
    </div>
  )
}

export default Rating;