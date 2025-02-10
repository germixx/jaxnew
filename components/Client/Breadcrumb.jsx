'use client';
import { useParams } from 'next/navigation';

const Breadcrumb = () => {
    console.log(useParams, ' is use params')
  return (
    <nav className="py-2 px-4 text-sm text-gray-600">
        <ol className="flex space-x-2">
            <li><a href="/" className="hover:text-blue-500">Home</a></li>
            <li>/</li>
            <li><a href="/category" className="hover:text-blue-500">Category</a></li>
            <li>/</li>
            <li className="text-gray-500">Current Page</li>
        </ol>
    </nav>
  )
}

export default Breadcrumb;