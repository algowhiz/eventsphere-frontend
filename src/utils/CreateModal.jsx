import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import AlertModal from '../utils/AlertModal';
import { useSelector } from 'react-redux';
import GooglePayButton from '@google-pay/button-react';

const CreateModal = ({ show, onClose }) => {
  const user = useSelector((state) => state.user);
  const [eventName, setEventName] = useState('');
  const [eventDesc, setEventDesc] = useState('');
  const [isFree, setIsFree] = useState(true);
  const [amount, setAmount] = useState('');
  const [meetingType, setMeetingType] = useState('online');
  const [meetingLink, setMeetingLink] = useState('');
  const [venueDetails, setVenueDetails] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState('');
  const [selectedEndDate, setSelectedEndDate] = useState(''); // New state for end date and time
  const [eventImages, setEventImages] = useState([]); // State for event images
  const [step, setStep] = useState(1); // Track the current step
  const [alert, setAlert] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [showGooglePayBtn, setShowGooglePayBtn] = useState(false);
  const [paymentDeatils, setPaymentDeatils] = useState({});

  if (!show) return null;

  const getAddress = async (lat, lon) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/reverse`, {
        params: {
          lat,
          lon,
          format: 'json',
        },
      });
      const address = response.data.display_name;
      setVenueDetails(address);
    } catch (error) {
      setAlert({ show: true, message: 'An error occurred during loading map', type: 'error' });
      console.error('Error fetching address:', error);
    }
  };

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setSelectedPosition(e.latlng);
        getAddress(e.latlng.lat, e.latlng.lng);
      },
    });

    return selectedPosition ? (
      <Marker position={selectedPosition} />
    ) : null;
  };

  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (loading) return; 

    // date validation 
    const currentDateTime = new Date();
    const startDateTime = new Date(selectedStartDate);
    const endDateTime = new Date(selectedEndDate);
  
    if (startDateTime < currentDateTime) {
      setAlert({ show: true, message: 'Start date cannot be in the past.', type: 'error' });
      return;
    }
  
    if (endDateTime <= startDateTime) {
      setAlert({ show: true, message: 'End date must be after the start date.', type: 'error' });
      return;
    }

    setLoading(true);
    if (!isFree) {
      setStep(2);
    } else {
      handlePaymentSubmit();
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setEventImages((prevImages) => [...prevImages, ...files]);
  };

  const handlePaymentSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('eventName', eventName);
      formData.append('eventDesc', eventDesc);
      formData.append('isFree', isFree);
      formData.append('amount', amount);
      formData.append('meetingType', meetingType);
      formData.append('meetingLink', meetingLink);
      formData.append('venueDetails', venueDetails);
      formData.append('eventStartDate', selectedStartDate); // Updated key
      formData.append('eventEndDate', selectedEndDate); // New key for end date and time
      formData.append('userId', user._id);
      formData.append('paymentMethod','Card');
      formData.append('transactionId',paymentDeatils.token);
      formData.append('cardDetails',JSON.stringify(paymentDeatils));

      eventImages.forEach((image) => {
        formData.append('images', image);
      });


      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/event/events', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response) {
        console.log('Event created successfully:', response.data.event);
        onClose();
      }
    } catch (error) {
      console.error('Error processing payment:', error);
      setAlert({ show: true, message: 'An error occurred', type: 'error' });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  const handleGooglePaySuccess = async (paymentRequest) => {
    const paymentData = paymentRequest.paymentMethodData;
    const paymentDetails = {
      cardNetwork: paymentData.info.cardNetwork,
      cardDetails: paymentData.info.cardDetails,
      token: paymentData.tokenizationData.token,
    };

    try {
      console.log('Payment Successful:', paymentDetails);
      setPaymentDeatils(paymentDetails)    
      await handlePaymentSubmit(paymentData);
      setAlert({ show: true, message: 'Event created and payment successful!', type: 'success' });
      onClose();
    } catch (error) {
      console.error('Error processing payment:', error);
      setAlert({ show: true, message: 'Payment failed. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="fixed w-auto inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <AlertModal
        show={alert.show}
        message={alert.message}
        type={alert.type}
        onClose={() => setAlert({ show: false, message: '', type: '' })}
      />
      <div className="bg-white w-full h-[90%] max-w-3xl rounded-lg overflow-auto p-6 relative shadow-lg">
        <button className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl" onClick={onClose}>
          &times;
        </button>
        {step === 1 && (
          <>
            <h2 className="text-2xl font-semibold mb-6 text-center">Create New Event</h2>
            <form onSubmit={handleEventSubmit}>
              <div className="mb-6 shadow-xl">
                <div className="p-8">
                  <label className="block mb-2 font-medium">Event Name</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded focus:outline-none focus:border-teal-500"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                    placeholder="Enter the event name"
                  />
                </div>
              </div>

              <div className="mb-6 shadow-xl">
                <div className="p-8">
                  <label className="block mb-2 font-medium">Event Description</label>
                  <input
                    type="text"
                    className="w-full p-3 border rounded focus:outline-none focus:border-teal-500"
                    value={eventDesc}
                    onChange={(e) => setEventDesc(e.target.value)}
                    required
                    placeholder="Enter the event description"
                  />
                </div>
              </div>

              <div className="mb-6 shadow-xl">
                <div className="p-8">
                  <label className="block mb-2 font-medium">Event Type</label>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="eventType"
                        className="form-radio text-teal-500"
                        checked={isFree}
                        onChange={() => setIsFree(true)}
                      />
                      <span>Free</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="radio"
                        name="eventType"
                        className="form-radio text-teal-500"
                        checked={!isFree}
                        onChange={() => setIsFree(false)}
                      />
                      <span>Paid</span>
                    </label>
                  </div>
                  {!isFree && (
                    <input
                      type="number"
                      className="w-full p-3 border rounded mt-3 focus:outline-none focus:border-teal-500"
                      placeholder="Enter amount"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  )}
                </div>
              </div>

              <div className="mb-6 shadow-xl">
                <div className="mb-6 p-8">
                  <label className="block mb-2 font-medium">Meeting Type</label>
                  <select
                    className="w-full p-3 border rounded focus:outline-none focus:border-teal-500"
                    value={meetingType}
                    onChange={(e) => setMeetingType(e.target.value)}
                  >
                    <option value="online">Online</option>
                    <option value="venue">Venue</option>
                  </select>
                </div>

                {meetingType === 'online' && (
                  <div className="mb-6 p-8">
                    <label className="block mb-2 font-medium">Meeting Link</label>
                    <input
                      type="text"
                      className="w-full p-3 border rounded focus:outline-none focus:border-teal-500"
                      placeholder="Enter meeting link"
                      value={meetingLink}
                      onChange={(e) => setMeetingLink(e.target.value)}
                      required
                    />
                  </div>
                )}

                {meetingType === 'venue' && (
                  <div className="mb-6 p-8">
                    <label className="block mb-2 font-medium">Venue Details</label>
                    <div className="flex items-center space-x-4">
                      <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        onClick={() => setShowMap(true)}
                      >
                        Browse
                      </button>
                      <input
                        type="text"
                        className="w-full p-3 border rounded focus:outline-none focus:border-teal-500"
                        value={venueDetails}
                        readOnly
                        placeholder="Select a location on the map"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="mb-6 shadow-xl">
                <div className="mb-6 p-8">
                  <label className="block mb-2 font-medium">Event Start Date and Time</label>
                  <input
                    type="datetime-local"
                    className="w-full p-3 border rounded focus:outline-none focus:border-teal-500"
                    value={selectedStartDate}
                    onChange={(e) => setSelectedStartDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-6 shadow-xl">
                <div className="mb-6 p-8">
                  <label className="block mb-2 font-medium">Event End Date and Time</label>
                  <input
                    type="datetime-local"
                    className="w-full p-3 border rounded focus:outline-none focus:border-teal-500"
                    value={selectedEndDate}
                    onChange={(e) => setSelectedEndDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="mb-6 shadow-xl">
                <div className="mb-6 p-8">
                  <label className="block mb-2 font-medium">Event Images</label>
                  <input
                    type="file"
                    className="w-full p-3 border rounded focus:outline-none focus:border-teal-500"
                    onChange={handleImageChange}
                    multiple
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`bg-teal-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-teal-600 transition duration-200 ${loading ? 'opacity-50 cursor-not-allowed' : ''}  `}
                  disabled={loading}
                >
                  {isFree ? ` ${loading ? 'Processing...' : 'Create Event'}  ` : "Next"}
                </button>
              </div>
            </form>
          </>
        )}

        {step === 2 && !isFree && (
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center">Payment</h2>
            <p className="mb-6 text-center">Please complete the payment to host your event.</p>

            <div className="flex justify-center items-center">
              <button
                className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-600 transition duration-200"
                onClick={()=> setShowGooglePayBtn(true)}
              >
                Pay and Create Event
              </button>
              {showGooglePayBtn && (
                <GooglePayButton
                  environment="TEST"
                  paymentRequest={{
                    apiVersion: 2,
                    apiVersionMinor: 0,
                    allowedPaymentMethods: [
                      {
                        type: 'CARD',
                        parameters: {
                          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                          allowedCardNetworks: ['VISA', 'MASTERCARD', 'AMEX', 'DISCOVER'],
                        },
                        tokenizationSpecification: {
                          type: 'PAYMENT_GATEWAY',
                          parameters: {
                            gateway: 'example',  // Replace with actual gateway provider
                            gatewayMerchantId: 'exampleMerchantId',  // Replace with actual merchant ID
                          },
                        },
                      },
                    ],
                    merchantInfo: {
                      merchantId: 'BCR2DN4T6Y4TH4KF',  // Replace with actual merchant ID
                      merchantName: 'Kolhapur Event Planner',
                    },
                    transactionInfo: {
                      totalPriceStatus: 'FINAL',
                      totalPriceLabel: 'Total',
                      totalPrice: "10",  // Use the event amount
                      currencyCode: 'INR',
                      countryCode: 'IN',
                    },
                  }}
                  onLoadPaymentData={(paymentRequest) => handleGooglePaySuccess(paymentRequest)}
                />
              )}

            </div>
          </div>
        )}

        {/* Map Modal */}
        {showMap && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg">
              <button className="absolute top-2 right-2 text-gray-600" onClick={() => setShowMap(false)}>
                &times;
              </button>
              <MapContainer
                center={[51.505, -0.09]}
                zoom={13}
                style={{ height: '400px', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationMarker />
              </MapContainer>
              <p className="text-center mt-4 text-sm text-gray-600">Click on the map to select a location</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateModal;
