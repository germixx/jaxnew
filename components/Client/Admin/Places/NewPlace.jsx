import React, { useState } from "react";
import DOMPurify from "dompurify";

const NewPlace = () => {

    const initialState = {
        roomID :"",
        locationName: "",
        locationAddress: "",
        locationCity: "",
        locationState: "Florida",
        locationZipcode: "",
        locationPhoneNumber: "",
        locationNeighborhood: "",
        locationLatitude: "",
        locationLongitude: "",
        locationDescription: "",
        locationCategory: "",
        active: false,
        image: null,
        imagePreview: null
    };

    const [formData, setFormData] = useState(initialState);

    function CloseModal () {
        handleReset();
        document.getElementById('roomModal').style.display = 'none';
    }

    const handleReset = () => {
        setFormData(initialState);
      };

    const sanitizeInput = (input) => {
        return DOMPurify.sanitize(input);
      };

    function generateRoomID() {
        
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let roomID = '';

        for (let i = 0; i < 9; i++) {
          roomID += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        setFormData((prevData) => ({
            ...prevData,
            roomID: roomID, // Dynamically updates the corresponding field
          }));
    }

    const handleChange = (e) => {

        const { name, value, type, checked, files } = e.target;
        
        if (type === "file" && files[0]) {
            resizeImage(files[0], 300, 300, (resizedFile) => {
              setFormData((prevData) => ({
                ...prevData,
                image: resizedFile,
                imagePreview: URL.createObjectURL(resizedFile),
              }));
            });
          } else {
            setFormData((prevData) => ({
              ...prevData,
              [name]: type === "checkbox" ? checked : sanitizeInput(value),
            }));
          }
    };

    const clearImagePreview = () => {
        setFormData((prevData) => ({
          ...prevData,
          image: null,
          imagePreview: null,
        }));
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

    console.log(formData, ' is dormda')
    
  return (
    <dialog id="roomModal" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg md:max-w-xl lg:max-w-2xl sm:w-[90%] sm:max-w-none sm:h-auto">
            <h2 className="text-xl font-semibold mb-4">Add New Place</h2>
            
            <form className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                    <input name="roomID" value={formData.roomID} type="text" id="roomID" placeholder="Room ID" className="border p-2 rounded w-full" required disabled/>
                    <button type="button" onClick={() => generateRoomID()} className="px-4 py-2 bg-blue-600 text-white rounded">Generate</button>
                </div>
                <input value={formData.locationName} onChange={handleChange} name="locationName" type="text" placeholder="Location Name" className="border p-2 rounded w-full" required />
                <input value={formData.locationAddress} onChange={handleChange} name="locationAddress" type="text" placeholder="Address" className="border p-2 rounded w-full" required />
                <input value={formData.locationCity} onChange={handleChange} name="locationCity" type="text" placeholder="City" className="border p-2 rounded w-full" required />
                <input value={formData.locationState} name="locationState" type="text" placeholder="State" className="border p-2 rounded w-full" required readOnly />
                <input value={formData.locationZipcode} onChange={handleChange} name="locationZipcode" type="text" placeholder="Zipcode" className="border p-2 rounded w-full" required />
                <input value={formData.locationPhoneNumber} onChange={handleChange} name="locationPhoneNumber" type="text" placeholder="Phone Number" className="border p-2 rounded w-full" required />
                <div>
                <select value={formData.locationNeighborhood} name="locationNeighborhood" onChange={handleChange} className="border p-2 rounded w-full">
                    <option>Downtown</option>
                    <option>Riverside</option>
                    <option>Springfield</option>
                    <option>Eastside</option>
                    <option>Ortega</option>
                    <option>San Marco</option>
                    <option>Mandarin</option>
                    <option>Northside</option>
                    <option>Westside</option>
                    <option>Arlington</option>
                    <option>Southside</option>
                    <option>Beaches</option>
                </select>
                </div>
                {/* <input type="text" placeholder="Neighborhood" className="border p-2 rounded w-full" /> */}
                {/* <label className="block text-sm font-medium">Category</label> */}
                <input value={formData.locationLatitude} onChange={handleChange} name="locationLatitude" type="text" placeholder="Latitude" className="border p-2 rounded w-full" />
                <input value={formData.locationLongitude} onChange={handleChange} name="locationLongitude" type="text" placeholder="Longitude" className="border p-2 rounded w-full" />
                
            </div>
            
            <textarea name="locationDescription" onChange={handleChange} value={formData.locationDescription} placeholder="Description" className="border p-2 rounded w-full h-20"></textarea>

            <div>
                <label className="block text-sm font-medium">Upload Image</label>
                <input type="file" name="image" onChange={handleChange} className="border p-2 rounded w-full" accept="image/*" />
            </div>

            {formData.imagePreview && (
                <div>
                <p>Preview:</p>
                <img src={formData.imagePreview} alt="Preview" width="100" />
                <button type="button" onClick={clearImagePreview}>Remove Image</button>
                </div>
            )}
            
            <div className="flex items-center space-x-2">
                <input value={formData.active} onChange={handleChange} name="active" type="checkbox" id="active" className="w-4 h-4" />
                <label htmlFor="active" className="text-sm">Active</label>
            </div>
            
            <div>
                <label className="block text-sm font-medium">Category</label>
                <select value={formData.locationCategory} name="locationCategory" onChange={handleChange} className="border p-2 rounded w-full">
                    <option>Adult</option>
                    <option>Dining</option>
                    <option>Business</option>
                    <option>Nightlife</option>
                </select>
            </div>
            
            <div className="flex justify-end space-x-2">
                <button type="button" onClick={() => CloseModal()} className="px-4 py-2 bg-gray-400 text-white rounded">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
            </div>
            </form>
        </div>
    </dialog>
  )
}

export default NewPlace;