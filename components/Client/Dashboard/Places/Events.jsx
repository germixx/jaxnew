import React from 'react'

const Events = ({events}) => {

    const closeModal = () => {
        document.getElementById('eventsModal').style.display = 'none';
    }

  return (
    <div id="eventsModal" className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 hidden">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl h-3/4 flex flex-col">
        
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Upcoming Events</h2>
            <button onClick={closeModal} className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl">
            &times;
            </button>
        </div>
        
        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
        {events.map((event, index) => (
    <div
      key={index}
      className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row sm:justify-between gap-4"
    >
      {/* Event Info */}
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{event.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">{event.description}</p>
        
        <div className="mt-2 space-y-1 text-sm text-gray-700 dark:text-gray-200">
          <p><strong>🕒 Time:</strong> {event.time}</p>
          <p><strong>📍 Location:</strong> {event.location}</p>
          <p><strong>💵 Cost:</strong> {event.cost ? `$${event.cost}` : 'Free'}</p>
        </div>
      </div>

      {/* Optional Action or Thumbnail */}
      {event.image && (
        <img
          src={event.image}
          alt={event.title}
          className="w-full sm:w-32 h-32 object-cover rounded-md"
        />
      )}
    </div>
  ))}
      </div>


        <div className="p-4 border-t dark:border-gray-600 flex items-center space-x-2 mt-auto">
            <input type="text" className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white" placeholder="RSVP for an event..." />
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">RSVP</button>
        </div>
        </div>
    </div>
  )
}

export default Events