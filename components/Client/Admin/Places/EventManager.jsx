'use client'

import { useState } from 'react'

export default function EventsInnerModal() {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Spring Festival',
      location: 'Main Square',
      cost: 20,
      time: '2025-04-15 14:00',
      description: 'Live music, food trucks, and games.',
    },
    {
      id: 2,
      name: 'Night Market',
      location: 'Downtown Blvd',
      cost: 0,
      time: '2025-04-18 19:00',
      description: 'Street food and artisan vendors until midnight.',
    },
  ])

  const [toast, setToast] = useState('')
  const [showAdd, setShowAdd] = useState(false)
  const [newEvent, setNewEvent] = useState({
    name: '',
    location: '',
    cost: '',
    time: '',
    description: '',
  })

  const handleDelete = (id) => {
    setEvents(events.filter((event) => event.id !== id))
    showToast('Event deleted!')
  }

  const handleChange = (index, key, value) => {
    const updated = [...events]
    updated[index][key] = value
    setEvents(updated)
  }

  const handleAdd = () => {
    if (!newEvent.name) return

    setEvents([
      ...events,
      {
        ...newEvent,
        id: Date.now(),
        cost: parseFloat(newEvent.cost) || 0,
      },
    ])
    setNewEvent({ name: '', location: '', cost: '', time: '', description: '' })
    showToast('Event added!')
    setShowAdd(false)
  }

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(''), 3000)
  }

  return (
    <div className="h-72 w-full bg-gray-200 rounded-md overflow-hidden p-4 flex flex-col gap-4 relative">

      {/* Toggle Button */}
      {/* <button
          className="float-right px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 self-start"
          onClick={() => setShowAdd(!showAdd)}
        >
          {showAdd ? 'Cancel' : 'Add New Event'}
        </button> */}


      <h3 className="text-lg font-semibold">Events</h3>


      <div className="h-full overflow-y-auto space-y-4 pr-2">
        {events.map((event, index) => (
          <div
            key={event.id}
            className="bg-white p-3 rounded shadow-sm flex justify-between items-start gap-3"
          >
            <div className="flex-1 space-y-1">
              <input
                className="w-full font-medium text-gray-800 bg-transparent border-b focus:outline-none"
                value={event.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
              />
              <input
                className="w-full text-sm text-gray-600 bg-transparent border-b focus:outline-none"
                value={event.location}
                onChange={(e) => handleChange(index, 'location', e.target.value)}
              />
              <input
                className="w-full text-sm text-gray-600 bg-transparent border-b focus:outline-none"
                value={event.time}
                onChange={(e) => handleChange(index, 'time', e.target.value)}
              />
              <textarea
                className="w-full text-sm text-gray-500 bg-transparent border-b focus:outline-none"
                value={event.description}
                onChange={(e) => handleChange(index, 'description', e.target.value)}
              />
              <input
                className="w-full text-sm font-semibold text-green-600 bg-transparent border-b focus:outline-none"
                value={event.cost}
                onChange={(e) => handleChange(index, 'cost', e.target.value)}
              />
            </div>
            <button
              onClick={() => handleDelete(event.id)}
              className="text-red-500 hover:text-red-700 text-xl"
              title="Delete"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>

      {/* Toggle Button */}
      <button
        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 self-start"
        onClick={() => setShowAdd(!showAdd)}
      >
        {showAdd ? 'Cancel' : 'Add New Event'}
      </button>

      {/* Add new event form (conditional) */}
      {showAdd && (
        <div className="bg-white p-3 rounded shadow-sm flex flex-col gap-2 w-full mt-2">
          <h4 className="font-semibold text-gray-700">New Event Details</h4>
          <input
            className="p-1 border rounded text-sm"
            placeholder="Name"
            value={newEvent.name}
            onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
          />
          <input
            className="p-1 border rounded text-sm"
            placeholder="Location"
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
          />
          <input
            className="p-1 border rounded text-sm"
            placeholder="Time"
            value={newEvent.time}
            onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
          />
          <input
            className="p-1 border rounded text-sm"
            placeholder="Cost"
            value={newEvent.cost}
            onChange={(e) => setNewEvent({ ...newEvent, cost: e.target.value })}
          />
          <textarea
            className="p-1 border rounded text-sm"
            placeholder="Description"
            value={newEvent.description}
            onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
          />
          <button
            className="mt-2 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
            onClick={handleAdd}
          >
            Confirm Add
          </button>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="absolute bottom-4 left-4 bg-green-600 text-white px-4 py-2 rounded shadow">
          {toast}
        </div>
      )}
    </div>
  )
}