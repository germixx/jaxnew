'use client';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-screen-xl mx-auto px-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Column 1</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-400">Link 1</a></li>
              <li><a href="#" className="hover:text-gray-400">Link 2</a></li>
              <li><a href="#" className="hover:text-gray-400">Link 3</a></li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Column 2</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-400">Link 1</a></li>
              <li><a href="#" className="hover:text-gray-400">Link 2</a></li>
              <li><a href="#" className="hover:text-gray-400">Link 3</a></li>
            </ul>
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Column 3</h3>
            <ul>
              <li><a href="#" className="hover:text-gray-400">Link 1</a></li>
              <li><a href="#" className="hover:text-gray-400">Link 2</a></li>
              <li><a href="#" className="hover:text-gray-400">Link 3</a></li>
            </ul>
          </div>
        </div>
        
        
        <div className="text-center text-sm text-gray-400">
          <p>&copy; 2025 Jacksonvillians. All Rights Reserved.</p>
        </div>
      </div>
</footer>
  )
}

export default Footer