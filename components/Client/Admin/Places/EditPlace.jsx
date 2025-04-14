import { useState } from 'react';

import placeCategories from '../../../../public/data/placeCategories.json';
import placeNeighborhoods from '../../../../public/data/placeNeighborhoods.json';

import MediaManager from './MediaManager';
import ReviewManager from './ReviewManager';
import EventManager from './EventManager';
import ChatRoomManager from './ChatroomManager';

export default function EditLocationModal({ location, onClose, onSave, user }) {

  const [formData, setFormData] = useState({ ...location });
  const [activeTab, setActiveTab] = useState("form");
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const [mediaData, setMediaData] = useState([
    {
      id: 1,
      name: "The Verge",
      logo: "https://www.theverge.com/favicon.ico",
      description: "Interviewed about our beta product launch.",
      link: "https://www.theverge.com/article",
    },
    {
      id: 6,
      name: 'TechCrunch',
      logo: 'https://techcrunch.com/favicon.ico',
      description: 'Featured article about our launch.',
      link: 'https://techcrunch.com/article',
    },
    {
      id: 2,
      name: 'TechCrunch',
      logo: 'https://techcrunch.com/favicon.ico',
      description: 'Featured article about our launch.',
      link: 'https://techcrunch.com/article',
    },
    {
      id: 3,
      name: 'TechCrunch',
      logo: 'https://techcrunch.com/favicon.ico',
      description: 'Featured article about our launch.',
      link: 'https://techcrunch.com/article',
    },
    {
      id: 4,
      name: 'TechCrunch',
      logo: 'https://techcrunch.com/favicon.ico',
      description: 'Featured article about our launch.',
      link: 'https://techcrunch.com/article',
    },
    {
      id: 5,
      name: 'TechCrunch',
      logo: 'https://techcrunch.com/favicon.ico',
      description: 'Featured article about our launch.',
      link: 'https://techcrunch.com/article',
    },

  ]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    let updatedValue = value;

    if (name === "locationPhoneNumber") {
      updatedValue = formatPhoneNumber(updatedValue);
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : updatedValue,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      resizeImage(file, 300, 300, (resizedFile) => {
        setFormData({
          ...formData,
          image: resizedFile,
          locationImage: URL.createObjectURL(file),
        });
      });
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() !== "") {
      setChatMessages([...chatMessages, { text: newMessage, sender: "You" }]);
      setNewMessage("");
    }
  };

  const formatPhoneNumber = (input) => {

    const cleaned = input.replace(/\D/g, ""); // Remove all non-digit characters
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

    if (match) {
      return `(${match[1]}) ${match[2]} - ${match[3]}`;
    }
    return cleaned; // Return raw digits if not complete
  };

  const resizeImage = (file, maxWidth, maxHeight, callback) => {

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        let width = img.width;
        let height = img.height;

        // Maintain aspect ratio
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height *= maxWidth / width;
            width = maxWidth;
          } else {
            width *= maxHeight / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Convert canvas to Blob
        canvas.toBlob((blob) => {
          const resizedFile = new File([blob], file.name, {
            type: "image/jpeg",
            lastModified: Date.now(),
          });
          callback(resizedFile);
        }, "image/jpeg", 0.7); // Adjust quality (0.7 = 70%)
      };
    };
  };

  const mediaDatas = [
    {
      id: 1,
      name: 'TechCrunch',
      logo: 'https://techcrunch.com/favicon.ico',
      description: 'Featured article about our launch.',
      link: 'https://techcrunch.com/article',
    },
    {
      id: 6,
      name: 'TechCrunch',
      logo: 'https://techcrunch.com/favicon.ico',
      description: 'Featured article about our launch.',
      link: 'https://techcrunch.com/article',
    },
    {
      id: 2,
      name: 'TechCrunch',
      logo: 'https://techcrunch.com/favicon.ico',
      description: 'Featured article about our launch.',
      link: 'https://techcrunch.com/article',
    },
    {
      id: 3,
      name: 'TechCrunch',
      logo: 'https://techcrunch.com/favicon.ico',
      description: 'Featured article about our launch.',
      link: 'https://techcrunch.com/article',
    },
    {
      id: 4,
      name: 'TechCrunch',
      logo: 'https://techcrunch.com/favicon.ico',
      description: 'Featured article about our launch.',
      link: 'https://techcrunch.com/article',
    },
    {
      id: 5,
      name: 'TechCrunch',
      logo: 'https://techcrunch.com/favicon.ico',
      description: 'Featured article about our launch.',
      link: 'https://techcrunch.com/article',
    },

  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={(e) => onClose()}>
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-xl font-bold mb-4 text-center text-black">{formData.locationName}</h2>
        {/* Tab Navigation */}
        <div className="flex border-b mb-4">
          <button
            className={` text-black px-4 py-2 ${activeTab === "form" ? "border-b-2 border-blue-500 font-bold" : "text-gray-500"}`}
            onClick={() => setActiveTab("form")}
          >
            Edit Details
          </button>
          <button
            className={` text-black px-4 py-2 ${activeTab === "chat" ? "border-b-2 border-blue-500 font-bold" : "text-gray-500"}`}
            onClick={() => setActiveTab("chat")}
          >
            Chatroom
          </button>
          <button
            className={` text-black px-4 py-2 ${activeTab === "reviews" ? "border-b-2 border-blue-500 font-bold" : "text-gray-500"}`}
            onClick={() => setActiveTab("reviews")}
          >
            Reviews
          </button>
          <button
            className={` text-black px-4 py-2 ${activeTab === "events" ? "border-b-2 border-blue-500 font-bold" : "text-gray-500"}`}
            onClick={() => setActiveTab("events")}
          >
            Events
          </button>

        </div>

        {/* Tab Content */}
        {activeTab === "form" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input type="text" name="locationName" value={formData.locationName} onChange={handleChange} placeholder="Location Name" className="p-2 border rounded text-black" />
            <input type="text" name="locationAddress" value={formData.locationAddress} onChange={handleChange} placeholder="Address" className="p-2 border rounded text-black" />
            <input type="text" name="locationCity" value={formData.locationCity} onChange={handleChange} placeholder="City" className="p-2 border rounded text-black" />
            <input type="text" name="locationZipCode" value={formData.locationZipCode} onChange={handleChange} placeholder="Zip Code" className="p-2 border rounded text-black" />
            <input type="text" name="locationState" value={formData.locationState} onChange={handleChange} placeholder="State" className="p-2 border rounded text-black" disabled />
            <input
              type="text"
              name="locationPhoneNumber"
              value={formatPhoneNumber(formData.locationPhoneNumber)}
              onChange={handleChange}
              placeholder="Phone Number"
              className="p-2 border rounded text-black"
            />
            <select value={formData.locationCategory} name="locationCategory" className="p-2 border rounded text-black" onChange={handleChange} >
              {placeCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <select value={formData.neighborhood} name="neighborhood" className="p-2 border rounded text-black" onChange={handleChange} >
              {placeNeighborhoods.map((neighborhood) => (
                <option key={neighborhood} value={neighborhood}>
                  {neighborhood}
                </option>
              ))}
            </select>
            <input type="text" name="locationLatitude" value={formData.locationLatitude} onChange={handleChange} placeholder="Latitude" className="p-2 border rounded text-black" />
            <input type="text" name="locationLongitude" value={formData.locationLongitude} onChange={handleChange} placeholder="Longitude" className="p-2 border rounded text-black" />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="p-2 border rounded col-span-1 md:col-span-2 text-black"></textarea>
            <div className="col-span-1 md:col-span-2">
              <input type="file" name="image" onChange={handleImageChange} className="p-2 border rounded w-full" accept="image/*" />
              {formData.locationImage && <img src={formData.locationImage} alt="Preview" className="mt-2 w-full h-32 object-cover rounded" />}
            </div>
            <div className="flex gap-4 col-span-1 md:col-span-2">
              <label className="flex items-center text-black">
                <input type="checkbox" name="active" checked={formData.active} onChange={handleChange} className="mr-2" /> Active
              </label>
              <label className="flex items-center text-black">
                <input type="checkbox" name="deleted" checked={formData.deleted} onChange={handleChange} className="mr-2" /> Deleted
              </label>
            </div>
          </div>
        ) : activeTab === 'reviews' ? (

          // <div className="h-72 w-full bg-gray-200 rounded-md overflow-hidden">
          <ReviewManager />
          // </div>
        ) : activeTab === 'media' ? (
          <MediaManager mediaData={mediaData} setMediaData={setMediaData} />
        ) : activeTab === 'events' ? (

          <div className="h-72 w-full bg-gray-200 rounded-md overflow-hidden">
            <EventManager />
          </div>
        ) : activeTab === "map" ? (
          <div className="h-72 w-full bg-gray-200 rounded-md overflow-hidden">
            <iframe
              className="w-full h-full"
              src={`https://maps.google.com/maps?q=${formData.locationLatitude},${formData.locationLongitude}&z=15&output=embed`}
              title="Google Map"
              allowFullScreen
            />
          </div>) : (
            <ChatRoomManager user={user} location={location}/>
        )}

        <div className="flex border-t mt-6 pt-4 justify-center flex-wrap gap-2">
          <button
            className={` text-black px-4 py-2 ${activeTab === "media" ? "border-b-2 border-blue-500 font-bold" : "text-gray-500"}`}
            onClick={() => setActiveTab("media")}
          >
            Media
          </button>
          <button
            className={`text-black px-4 py-2 ${activeTab === "map" ? "border-b-2 border-blue-500 font-bold" : "text-gray-500"}`}
            onClick={() => setActiveTab("map")}
          >
            View on Map
          </button>
        </div>

        <div className="flex justify-between items-center mt-4">
          {/* Room ID on the left */}
          <div className='text-black'>#{formData.room_id}</div>

          {/* Buttons on the right */}
          <div className="flex gap-2">

                <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
                  Cancel
                </button>

            {
              activeTab === "form" ? (
                <button onClick={() => onSave(formData)} className="px-4 py-2 bg-blue-600 text-white rounded">
                  Save
                </button>
              ) : ('')

            }



          </div>
        </div>
      </div>
    </div>
  );
}
