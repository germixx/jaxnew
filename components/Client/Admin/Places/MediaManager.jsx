// import { useState } from "react";

// export default function MediaManager({ mediaData, setMediaData }) {
//   const [editIndex, setEditIndex] = useState(null);
//   const [editForm, setEditForm] = useState({ name: "", logo: "", description: "", link: "" });

//   const handleDelete = (id) => {
//     if (confirm("Are you sure you want to delete this media item?")) {
//       setMediaData((prev) => prev.filter((item) => item.id !== id));
//     }
//   };

//   const handleEdit = (index) => {
//     setEditIndex(index);
//     setEditForm({ ...mediaData[index] });
//   };

//   const handleChange = (e) => {
//     setEditForm({ ...editForm, [e.target.name]: e.target.value });
//   };

//   const handleSave = () => {
//     const updated = [...mediaData];
//     updated[editIndex] = { ...editForm, id: mediaData[editIndex].id };
//     setMediaData(updated);
//     setEditIndex(null);
//   };

//   return (
//     <div className="h-72 w-full bg-gray-100 dark:bg-gray-800 rounded-md overflow-y-auto p-4 space-y-4">
//       {mediaData.length === 0 ? (
//         <p className="text-gray-500 dark:text-gray-400">No media entries yet.</p>
//       ) : (
//         mediaData.map((item, index) => (
//           <div
//             key={item.id}
//             className="flex flex-col md:flex-row items-start justify-between p-3 rounded-lg bg-white dark:bg-gray-700 shadow-sm gap-3"
//           >
//             {editIndex === index ? (
//               <div className="flex flex-col md:flex-row gap-4 w-full">
//                 <input
//                   type="text"
//                   name="name"
//                   value={editForm.name}
//                   onChange={handleChange}
//                   placeholder="Name"
//                   className="p-2 border rounded w-full dark:bg-gray-600 dark:text-white"
//                 />
//                 <input
//                   type="text"
//                   name="logo"
//                   value={editForm.logo}
//                   onChange={handleChange}
//                   placeholder="Logo URL"
//                   className="p-2 border rounded w-full dark:bg-gray-600 dark:text-white"
//                 />
//                 <input
//                   type="text"
//                   name="link"
//                   value={editForm.link}
//                   onChange={handleChange}
//                   placeholder="Link"
//                   className="p-2 border rounded w-full dark:bg-gray-600 dark:text-white"
//                 />
//                 <textarea
//                   name="description"
//                   value={editForm.description}
//                   onChange={handleChange}
//                   placeholder="Description"
//                   className="p-2 border rounded w-full dark:bg-gray-600 dark:text-white"
//                 />
//                 <div className="flex gap-2 mt-2">
//                   <button
//                     onClick={handleSave}
//                     className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => setEditIndex(null)}
//                     className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="flex items-start justify-between w-full gap-4">
//                 <div className="flex gap-4 items-start w-full">
//                   <img
//                     src={item.logo}
//                     alt={item.name}
//                     className="w-12 h-12 rounded-md object-contain border border-gray-300 dark:border-gray-600"
//                   />
//                   <div className="flex flex-col w-full">
//                     <div className="flex justify-between items-center w-full">
//                       <h3 className="text-md font-semibold text-gray-900 dark:text-white">{item.name}</h3>
//                       <a
//                         href={item.link}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-sm text-blue-500 hover:underline"
//                       >
//                         View
//                       </a>
//                     </div>
//                     <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{item.description}</p>
//                   </div>
//                 </div>
//                 <div className="flex flex-col gap-2 items-end">
//                   <button
//                     onClick={() => handleEdit(index)}
//                     className="text-yellow-500 hover:text-yellow-600 text-sm font-medium"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDelete(item.id)}
//                     className="text-red-500 hover:text-red-600 text-sm font-medium"
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// }

import { useState } from "react";

export default function MediaManager({ mediaData, setMediaData }) {
  const [editIndex, setEditIndex] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", logo: "", description: "", link: "" });
  const [newForm, setNewForm] = useState({ name: "", logo: "", description: "", link: "" });
  const [showAdd, setShowAdd] = useState(false);

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this media item?")) {
      setMediaData((prev) => prev.filter((item) => item.id !== id));
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditForm({ ...mediaData[index] });
  };

  const handleChange = (e, formSetter) => {
    formSetter((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    const updated = [...mediaData];
    updated[editIndex] = { ...editForm, id: mediaData[editIndex].id };
    setMediaData(updated);
    setEditIndex(null);
  };

  const handleAdd = () => {
    const newItem = { ...newForm, id: Date.now() };
    setMediaData((prev) => [...prev, newItem]);
    setNewForm({ name: "", logo: "", description: "", link: "" });
    setShowAdd(false);
  };

  return (
    <div className="h-96 w-full bg-gray-100 dark:bg-gray-800 rounded-md overflow-y-auto">
      <div className="sticky top-0 bg-gray-100 dark:bg-gray-800 z-10 p-4 border-b border-gray-300 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-800 dark:text-white">Manage Media Mentions</h2>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600 text-sm"
        >
          {showAdd ? "Cancel" : "Add New"}
        </button>
      </div>

      {showAdd && (
        <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md space-y-2">
          <input
            type="text"
            name="name"
            value={newForm.name}
            onChange={(e) => handleChange(e, setNewForm)}
            placeholder="Media Name"
            className="p-2 w-full border rounded dark:bg-gray-600 dark:text-white"
          />
          <input
            type="text"
            name="logo"
            value={newForm.logo}
            onChange={(e) => handleChange(e, setNewForm)}
            placeholder="Logo URL"
            className="p-2 w-full border rounded dark:bg-gray-600 dark:text-white"
          />
          <input
            type="text"
            name="link"
            value={newForm.link}
            onChange={(e) => handleChange(e, setNewForm)}
            placeholder="Article Link"
            className="p-2 w-full border rounded dark:bg-gray-600 dark:text-white"
          />
          <textarea
            name="description"
            value={newForm.description}
            onChange={(e) => handleChange(e, setNewForm)}
            placeholder="Short description"
            className="p-2 w-full border rounded dark:bg-gray-600 dark:text-white"
          />
          <button
            onClick={handleAdd}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add Media
          </button>
        </div>
      )}

      {mediaData.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No media entries added yet.</p>
      ) : (
        mediaData.map((item, index) => (
          <div
            key={item.id}
            className="flex flex-col md:flex-row items-start justify-between p-3 rounded-lg bg-white dark:bg-gray-700 shadow-sm gap-3"
          >
            {editIndex === index ? (
              <div className="flex flex-col md:flex-row gap-4 w-full">
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={(e) => handleChange(e, setEditForm)}
                  placeholder="Name"
                  className="p-2 border rounded w-full dark:bg-gray-600 dark:text-white"
                />
                <input
                  type="text"
                  name="logo"
                  value={editForm.logo}
                  onChange={(e) => handleChange(e, setEditForm)}
                  placeholder="Logo URL"
                  className="p-2 border rounded w-full dark:bg-gray-600 dark:text-white"
                />
                <input
                  type="text"
                  name="link"
                  value={editForm.link}
                  onChange={(e) => handleChange(e, setEditForm)}
                  placeholder="Link"
                  className="p-2 border rounded w-full dark:bg-gray-600 dark:text-white"
                />
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={(e) => handleChange(e, setEditForm)}
                  placeholder="Description"
                  className="p-2 border rounded w-full dark:bg-gray-600 dark:text-white"
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleSave}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditIndex(null)}
                    className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start justify-between w-full gap-4">
                <div className="flex gap-4 items-start w-full">
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="w-12 h-12 rounded-md object-contain border border-gray-300 dark:border-gray-600"
                  />
                  <div className="flex flex-col w-full">
                    <div className="flex justify-between items-center w-full">
                      <h3 className="text-md font-semibold text-gray-900 dark:text-white">{item.name}</h3>
                      <a
                        href={item.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline"
                      >
                        View
                      </a>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">{item.description}</p>
                  </div>
                </div>
                <div className="flex flex-col gap-2 items-end">
                  <button
                    onClick={() => handleEdit(index)}
                    className="text-yellow-500 hover:text-yellow-600 text-sm font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-500 hover:text-red-600 text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}