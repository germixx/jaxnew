'use client';

const AsSeenInModal = ({ mediaData }) => {

    const closeModal = () => {
        document.getElementById('AsSeenInModal').style.display = 'none';
    }

  return (
    <div id="AsSeenInModal" className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 hidden">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-3xl h-3/4 flex flex-col">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">As Seen In</h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:text-gray-900 dark:hover:text-white text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        {/* Media Listings */}
        <div className="p-4 space-y-4 flex-1 overflow-y-auto">
          {mediaData.map((item, index) => (
            <div key={index} className="flex items-center gap-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-sm">
              <img
                src={item.logo}
                alt={item.name}
                className="w-16 h-16 object-contain rounded-lg"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.description}</p>
              </div>
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                View
              </a>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t dark:border-gray-600 flex items-center space-x-2 mt-auto">
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AsSeenInModal;