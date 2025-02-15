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
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    function CloseModal () {
        handleReset();
        document.getElementById('roomModal').style.display = 'none';
    }

    const handleReset = () => {
        setErrors({});
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

            let updatedValue = value;

            // Sanitize and restrict Zipcode input
            if (name === "locationZipcode") {
              updatedValue = value.replace(/\D/g, ""); // Remove all non-numeric characters
              if (updatedValue.length > 5) updatedValue = updatedValue.slice(0, 5); // Limit to 5 digits
            }
      
            // Format phone number input
            if (name === "locationPhoneNumber") {
              updatedValue = formatPhoneNumber(value);
            }

            setFormData((prevData) => ({
              ...prevData,
              [name]: type === "checkbox" ? checked : sanitizeInput(updatedValue),
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

    const formatPhoneNumber = (input) => {
        const cleaned = input.replace(/\D/g, ""); // Remove all non-digit characters
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    
        if (match) {
          return `(${match[1]}) ${match[2]} - ${match[3]}`;
        }
        return cleaned; // Return raw digits if not complete
    };

    const validateForm = () => {
        let newErrors = {};
    
        if (!formData.roomID.trim()) newErrors.roomID = "Room ID is required.";
        if (!formData.locationName.trim()) newErrors.locationName = "Location name is required.";
        if (!formData.locationAddress.trim()) newErrors.locationAddress = "Address is required.";
        if (!formData.locationCity.trim()) newErrors.locationCity = "City is required.";
        if (!formData.locationZipcode.trim() || !/^\d{5}$/.test(formData.locationZipcode))
          newErrors.locationZipcode = "Valid 5-digit Zipcode is required.";
        // if (!formData.locationPhoneNumber.trim() || !/^\d{10}$/.test(formData.locationPhoneNumber))
        //   newErrors.locationPhoneNumber = "Valid 10-digit phone number is required.";
        if (!formData.locationCategory.trim()) newErrors.locationCategory = "Category is required.";
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {

        if (!validateForm()) return;
    
        setIsSubmitting(true);

        const formdata = new FormData();

        Object.keys(formData).forEach((key) => {
  
            if (key === "image" && formData.image) {
              formdata.append("image", formData.image);
            } else {
              formdata.append(key, formData[key]);
            }
    
          });

        const response = await fetch("/api/place", {
            method: "POST",
            body: formdata,
          }).then(response => response.json())
          .then(data => console.log(data))
          .catch(error => console.error('Error:', error));

        // setTimeout(() => {
        //   console.log("Form Submitted:", formData);
        //   setIsSubmitting(false);
        //   handleReset();
        // }, 10000);

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
   
  return (
    <dialog id="roomModal" className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 p-4">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg md:max-w-xl lg:max-w-2xl sm:w-[90%] sm:max-w-none sm:h-auto">
            <h2 className="text-xl font-semibold mb-4">Add New Place</h2>
            
            <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                    <input name="roomID" value={formData.roomID} type="text" id="roomID" placeholder="Room ID" className="border p-2 rounded w-full" required disabled/>
                    <button type="button" onClick={() => generateRoomID()} className="px-4 py-2 bg-blue-600 text-white rounded">Generate</button>
                </div>
                {errors.roomID && <p className="error">{errors.roomID}</p>}
                <input value={formData.locationName} onChange={handleChange} name="locationName" type="text" placeholder="Location Name" className="border p-2 rounded w-full" required />
                {errors.locationName && <p className="error">{errors.locationName}</p>}
                <input value={formData.locationAddress} onChange={handleChange} name="locationAddress" type="text" placeholder="Address" className="border p-2 rounded w-full" required />
                {errors.locationAddress && <p className="error float-right">{errors.locationAddress}</p>}
                <input value={formData.locationCity} onChange={handleChange} name="locationCity" type="text" placeholder="City" className="border p-2 rounded w-full" required />
                {errors.locationCity && <p className="error float-right">{errors.locationCity}</p>}
                <input value={formData.locationState} name="locationState" type="text" placeholder="State" className="border p-2 rounded w-full" required readOnly />
                <input value={formData.locationZipcode} onChange={handleChange} name="locationZipcode" type="text" placeholder="Zipcode" className="border p-2 rounded w-full" maxLength={5} required />
                {errors.locationZipcode && <p className="error float-right">{errors.locationZipcode}</p>}
                <input value={formData.locationPhoneNumber} onChange={handleChange} name="locationPhoneNumber" type="text" placeholder="Phone Number" className="border p-2 rounded w-full" maxLength={16} required />
                {errors.locationPhoneNumber && <p className="error float-right">{errors.locationPhoneNumber}</p>}
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
                <button type="submit" onClick={() => handleSubmit()} className="px-4 py-2 bg-blue-600 text-white rounded" 
                // disabled={isSubmitting || Object.keys(errors).length > 0}
                >
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </div>
            </div>
        </div>
    </dialog>
  )
}

export default NewPlace;