import { useState, useEffect } from 'react';

const ReviewManager = () => {
    const [filter, setFilter] = useState("All");
    const [sort, setSort] = useState("Newest");
    const [selectedReviews, setSelectedReviews] = useState([]);
    const [reviews, setReviews] = useState();


    
    const reviewsData = [
        {
          name: "Lana King",
          avatar: "/avatars/lana.jpg",
          time: "2025-04-06T18:30:00Z",
          rating: 5,
          text: "Absolutely fantastic service. Highly recommend!",
          status: "Approved",
        },
        {
          name: "Mike Howard",
          avatar: "/avatars/mike.jpg",
          time: "2025-04-07T13:00:00Z",
          rating: 3,
          text: "Pretty decent overall, but could improve communication.",
          status: "Pending",
        },
        {
          name: "Asha Patel",
          avatar: "/avatars/asha.jpg",
          time: "2025-04-08T09:15:00Z",
          rating: 1,
          text: "Very disappointing experience. Would not recommend.",
          status: "Flagged",
        },
    ];

    useEffect(() => {
        setReviews(reviewsData);
    }, [reviewsData]);
  
    // FILTER
    const filtered = reviewsData.filter((r) => {
      if (filter === "All") return true;
      return r.status === filter;
    });
  
    // SORT
    const sorted = [...filtered].sort((a, b) => {
      if (sort === "Newest") return new Date(b.time) - new Date(a.time);
      if (sort === "Oldest") return new Date(a.time) - new Date(b.time);
      if (sort === "RatingHigh") return b.rating - a.rating;
      if (sort === "RatingLow") return a.rating - b.rating;
    });

    const handleSelectReview = (id) => {
        setSelectedReviews((prevSelected) =>
          prevSelected.includes(id)
            ? prevSelected.filter((reviewId) => reviewId !== id)
            : [...prevSelected, id]
        );
    };
    
    const handleBulkApprove = async () => {
        const response = await fetch('/api/reviews/bulk-approve', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reviewIds: selectedReviews }),
        });
        const data = await response.json();
        if (data.success) {
          // Refresh reviews
          setReviews(data.updatedReviews);
          setSelectedReviews([]);
        }
    };
    
    const handleFlagReview = async (id) => {
        // Handle flagging the review, maybe call an API for flagging
        console.log(`Flagging review ${id}`);
      };
      
      const handleDeleteReview = async (id) => {
        const response = await fetch(`/api/reviews/${id}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        if (data.success) {
          setReviews((prevReviews) => prevReviews.filter((review) => review.id !== id));
        }
    };

    const handleExportReviews = async () => {
        const response = await fetch('/api/reviews/export', { method: 'GET' });
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'reviews_export.csv';
        link.click();
    };

    const handleApproveReview = async (id) => {
        // Approve review
        const response = await fetch(`/api/reviews/approve/${id}`, { method: 'POST' });
        const data = await response.json();
        if (data.success) {
          setReviews((prevReviews) =>
            prevReviews.map((review) =>
              review.id === id ? { ...review, approved: true } : review
            )
          );
        }
    };

    return (
        <div className="h-96 w-full bg-gray-100 dark:bg-gray-800 rounded-md overflow-y-auto">
          {/* Sticky Header */}
          <div className="sticky top-0 z-20 bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 p-4">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">Manage Reviews</h2>
    
              {/* Filters & Sort */}
              <div className="flex flex-wrap gap-2 items-center">
                {/* Filter */}
                <select
                  className="text-sm p-2 rounded-md border bg-white dark:bg-gray-700 dark:text-white"
                  onChange={(e) => setFilter(e.target.value)}
                  value={filter}
                >
                  <option value="All">All</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Flagged">Flagged</option>
                </select>
    
                {/* Sort */}
                <select
                  className="text-sm p-2 rounded-md border bg-white dark:bg-gray-700 dark:text-white"
                  onChange={(e) => setSort(e.target.value)}
                  value={sort}
                >
                  <option value="Newest">Newest</option>
                  <option value="Oldest">Oldest</option>
                  <option value="RatingHigh">Rating: High → Low</option>
                  <option value="RatingLow">Rating: Low → High</option>
                </select>
              </div>
            </div>
          </div>
    
            <div className="bulk-actions">
                <button onClick={handleBulkApprove} disabled={!selectedReviews.length}>
                    Approve Selected
                </button>
                <button onClick={handleExportReviews}>Export Reviews</button>
            </div>

          {/* Review List */}
          <div className="divide-y divide-gray-300 dark:divide-gray-700">
            {sorted.map((review, idx) => (
              <div key={idx} className="p-4 flex items-start justify-between gap-4">
                 <input
                    type="checkbox"
                    onChange={() => handleSelectReview(review.id)}
                    checked={selectedReviews.includes(review.id)}
                />
                <div className="flex gap-4">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800 dark:text-white">{review.name}</h3>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(review.time).toLocaleDateString()}
                      </span>
                    </div>
    
                    {/* Star Rating */}
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "text-yellow-400"
                              : "text-gray-300 dark:text-gray-600"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.97c.3.92-.755 1.688-1.538 1.118l-3.385-2.46a1 1 0 00-1.175 0l-3.385 2.46c-.783.57-1.838-.197-1.538-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.075 9.397c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.286-3.97z" />
                        </svg>
                      ))}
                    </div>
    
                    {/* Review Text */}
                    <p className="text-sm text-gray-700 dark:text-gray-200 max-w-xl">
                      {review.text}
                    </p>
                  </div>
                </div>
    
                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button onClick={() => handleApproveReview(review.id)} className="text-sm text-green-600 hover:underline">Approve</button>
                  <button onClick={() => handleFlagReview(review.id)} className="text-sm text-yellow-600 hover:underline">Flag</button>
                  <button onClick={() => handleDeleteReview(review.id)} className="text-sm text-red-600 hover:underline">Delete</button>
                </div>  
              </div>
            ))}
          </div>
        </div>
      );
}

export default ReviewManager