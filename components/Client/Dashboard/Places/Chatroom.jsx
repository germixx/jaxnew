'use client';
const Chatroom = (props) => {

  const closeModal = () => {
    document.getElementById('chatModal').style.display = 'none';
  }

  return (
    <div id="chatModal" className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 hidden">
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl h-3/4 flex flex-col">
            
            <div className="flex items-center justify-between p-4 border-b dark:border-gray-600">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{props.placeData.locationName}</h2>
                <button onClick={() => closeModal()} className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
                    &times;
                </button>
            </div>
            
            <div className="p-4 space-y-4 flex-1 overflow-y-auto">
                
                <div className="flex items-start gap-2.5">
                    <img className="w-8 h-8 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-4.jpg" alt="Jese image"/>
                    <div className="flex flex-col w-full max-w-[480px] leading-1.5 p-4 border-gray-200 bg-gray-100 rounded-e-xl rounded-es-xl dark:bg-gray-700">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <span className="text-sm font-semibold text-gray-900 dark:text-white">Bonnie Green</span>
                            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">11:46</span>
                        </div>
                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">That's awesome. I think our users will really appreciate the improvements.</p>
                        <span className="text-sm font-normal text-gray-500 dark:text-gray-400">Delivered</span>
                    </div>
                </div>
                
                <div className="flex items-start gap-2.5 justify-end">
                    <div className="flex flex-col w-full max-w-[480px] leading-1.5 p-4 border-gray-200 bg-blue-500 text-white rounded-s-xl rounded-ee-xl">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse justify-end">
                            <span className="text-sm font-semibold">You</span>
                            <span className="text-sm font-normal">11:47</span>
                        </div>
                        <p className="text-sm font-normal py-2.5">Absolutely! Looking forward to seeing the response.</p>
                        <span className="text-sm font-normal">Sent</span>
                    </div>
                </div>
            </div>
            
            <div className="p-4 border-t dark:border-gray-600 flex items-center space-x-2 mt-auto">
                <input type="text" className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white" placeholder="Type a message..."/>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Send</button>
            </div>
        </div>
    </div>
  )
}

export default Chatroom;