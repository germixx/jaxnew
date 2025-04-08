import { useState } from 'react';

export default function EventModal({ eventData, closeModal }) {
  const [event, setEvent] = useState(eventData);

  const handleDelete = () => {
    // Logic for deleting the event
    console.log('Delete Event:', event.id);
    closeModal(); // Close the modal after deletion
  };

  const handleEdit = () => {
    // Logic for editing the event
    console.log('Edit Event:', event.id);
    closeModal(); // Close the modal after editing
  };

  const eventsData = [
    {
      name: 'Summer Concert',
      time: 'July 10, 2025 • 4:00 PM - 10:00 PM',
      location: 'Central Park, NYC',
      cost: '$50',
      description: 'Join us for an unforgettable summer concert featuring top bands!',
      image: 'https://via.placeholder.com/400x300',
    },
    {
      name: 'Food Festival',
      time: 'August 15, 2025 • 12:00 PM - 6:00 PM',
      location: 'Downtown Square, NY',
      cost: 'Free',
      description: 'Enjoy a day of food, drinks, and entertainment!',
      image: 'https://via.placeholder.com/400x300',
    },
    {
      name: 'Art Exhibition',
      time: 'September 5, 2025 • 10:00 AM - 5:00 PM',
      location: 'City Gallery, LA',
      cost: '$20',
      description: 'Explore stunning art pieces from local artists.',
      image: 'https://via.placeholder.com/400x300',
    },
  ];

  return (
    <div>
      Events
    </div>
  );
}