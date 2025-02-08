'use client';

const Profile = () => {
  return (
      <div className="antialiased">
        <main className="p-4 md:ml-64 h-auto pt-20">
          <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <div className="flex flex-col items-center text-center">
                    <img className="w-24 h-24 rounded-full shadow-md" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Profile Picture" />
                    <h2 className="mt-4 text-xl font-semibold">John Doe</h2>
                    <p className="text-gray-600 dark:text-gray-400">Web Developer & Designer</p>
                    <div className="mt-4 flex space-x-4">
                        <a href="#" className="text-blue-500 hover:text-blue-700">Twitter</a>
                        <a href="#" className="text-blue-500 hover:text-blue-700">LinkedIn</a>
                        <a href="#" className="text-blue-500 hover:text-blue-700">GitHub</a>
                    </div>
                </div>
            </div>
            
            <div className="mt-6 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">About Me</h3>
                <p className="text-gray-600 dark:text-gray-400">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.</p>
            </div>
            
            <div className="mt-6 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
                <ul className="space-y-4">
                    <li className="border-b pb-2">📌 Updated portfolio with new projects.</li>
                    <li className="border-b pb-2">🔗 Shared an article on web development trends.</li>
                    <li>🚀 Started a new open-source project.</li>
                </ul>
            </div>
          </div>
        </main>
      </div>  
  )
}

export default Profile;