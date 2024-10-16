import React, { useState } from 'react';
import { AiOutlineCalendar, AiOutlineDollarCircle, AiOutlineEnvironment } from 'react-icons/ai';

const EventCreationModal = ({ onClose }) => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    motive: '',
    date: '',
    isFree: true,
    amount: '',
    isOnline: true,
    location: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: checked });
    } else if (type === 'file') {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission and move to payment
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl p-8">
        <div className="flex justify-between mb-8">
          <span className="text-gray-600 text-xl">Details</span>
          <span className="text-gray-600 text-xl">Payment</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Event Name</label>
            <input 
              type="text" 
              name="name" 
              value={form.name} 
              onChange={handleChange} 
              className="border-2 border-gray-300 p-2 w-full rounded" 
              required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Event Description</label>
            <textarea 
              name="description" 
              value={form.description} 
              onChange={handleChange} 
              className="border-2 border-gray-300 p-2 w-full rounded" 
              required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Event Motive</label>
            <input 
              type="text" 
              name="motive" 
              value={form.motive} 
              onChange={handleChange} 
              className="border-2 border-gray-300 p-2 w-full rounded" 
              required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Event Date <AiOutlineCalendar className="inline" /></label>
            <input 
              type="date" 
              name="date" 
              value={form.date} 
              onChange={handleChange} 
              className="border-2 border-gray-300 p-2 w-full rounded" 
              required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Event Type</label>
            <div className="flex items-center">
              <label className="mr-4">
                <input 
                  type="radio" 
                  name="isFree" 
                  value={true} 
                  checked={form.isFree} 
                  onChange={handleChange} 
                  className="mr-2" />
                Free
              </label>
              <label>
                <input 
                  type="radio" 
                  name="isFree" 
                  value={false} 
                  checked={!form.isFree} 
                  onChange={handleChange} 
                  className="mr-2" />
                Paid
              </label>
            </div>
          </div>
          {!form.isFree && (
            <div className="mb-4">
              <label className="block text-gray-700">Amount <AiOutlineDollarCircle className="inline" /></label>
              <input 
                type="number" 
                name="amount" 
                value={form.amount} 
                onChange={handleChange} 
                className="border-2 border-gray-300 p-2 w-full rounded" 
                required />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700">Event Mode</label>
            <div className="flex items-center">
              <label className="mr-4">
                <input 
                  type="radio" 
                  name="isOnline" 
                  value={true} 
                  checked={form.isOnline} 
                  onChange={handleChange} 
                  className="mr-2" />
                Online
              </label>
              <label>
                <input 
                  type="radio" 
                  name="isOnline" 
                  value={false} 
                  checked={!form.isOnline} 
                  onChange={handleChange} 
                  className="mr-2" />
                Offline
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Event Location <AiOutlineEnvironment className="inline" /></label>
            <input 
              type="text" 
              name="location" 
              value={form.location} 
              onChange={handleChange} 
              className="border-2 border-gray-300 p-2 w-full rounded" 
              required={!form.isOnline} 
              disabled={form.isOnline} />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Event Image</label>
            <input 
              type="file" 
              name="image" 
              onChange={handleChange} 
              className="border-2 border-gray-300 p-2 w-full rounded" />
          </div>
          <div className="flex justify-between">
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-red-500 text-white px-4 py-2 rounded">
              Cancel
            </button>
            <button 
              type="submit" 
              className="bg-green-500 text-white px-4 py-2 rounded">
              Host the Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventCreationModal;
