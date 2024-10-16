import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, json } from 'react-router-dom';
import axios from 'axios';
import { MdOutlineLocationOn } from 'react-icons/md';
import { RiVideoLine } from "react-icons/ri";
import { FaShareAlt } from "react-icons/fa";
import { CiBookmark } from "react-icons/ci";
import AlertModal from '../../utils/AlertModal';
import { IoArrowBackSharp } from "react-icons/io5";
import Spinner from '../../utils/Spinner';
import GooglePayButton from '@google-pay/button-react';
import { useDispatch } from 'react-redux';
import { setEventsHosted } from '../../store/user'; 

const EventInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [alert, setAlert] = useState({ message: '', type: '', show: false });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [paymentDeatils, setPaymentDeatils] = useState({});
  const [step, setStep] = useState(0);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://eventsphere-backend-neu9.onrender.com/api/event/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setEvent(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleShareClick = () => {
    const eventLink = window.location.href;
    navigator.clipboard.writeText(eventLink).then(() => {
      setAlert({ message: 'Link copied!!', type: '', show: true });
    });
  };

  const handleMeetLink = () => {
    console.log("hi");

  }

  const handlePaymentSubmit = async (paymentData) => {
    //api to put the payment details
  }

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
      setAlert({ show: true, message: 'payment successful done !! Ticket booked ! ', type: 'success' });
      handelGenerateTicket();
      setStep(2);
    } catch (error) {
      console.error('Error processing payment:', error);
      setAlert({ show: true, message: 'Payment failed. Please try again.', type: 'error' });
    }
  };
  const handelGenerateTicket = async () => {
    try {
      const response = await axios.post('https://eventsphere-backend-neu9.onrender.com/api/ticket/generate-ticket', {
        eventName: event.eventName,
        eventDate: new Date(event.eventStartDateTime).toISOString(),
        eventLocation: event.venueDetails || 'Online',
        userName: event.userId.name,
        userEmail: event.userId.email,
        websiteName: 'EventSphere.com'
      });
      setAlert({ message: 'PDF is being sent to your email.', type: 'success', show: true });
    } catch (error) {
      setAlert({ message: 'Failed to book ticket. Please try again.', type: 'error', show: true });
    } finally {
      setBookingLoading(false);
    }
  }

  const handleBookTicket = async () => {
    setBookingLoading(true);
    setStep(1);

  };

  const handelEventSave = async () => {


    try {
      const userId = localStorage.getItem("user")
      const user = JSON.parse(userId);
      const response = await axios.get(`https://eventsphere-backend-neu9.onrender.com/api/event/saveEvent/${id}/${user._id}`);
      dispatch(setEventsHosted(response.data.user));
      
    } catch (error) {
      console.log(error);
    }


  }

  if (loading) {
    return <div className='w-full h-screen flex justify-center items-center'><Spinner /></div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!event) {
    return <div>No event data available</div>;
  }

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-6 mb-4">

        <div className="w-full flex flex-col-reverse lg:flex-col">
          <div className="flex flex-col lg:flex-row items-start lg:items-center mb-4">
            <Link to='/eventpage' ><p className='absolute flex gap-2 justify-center items-center top-1 left-3 font-semibold' > <IoArrowBackSharp />Go To Event Page</p></Link>
            <div className="bg-green-700 text-white rounded-l-lg p-2 hidden lg:flex flex-col items-center">
              <p className="text-xs">{new Date(event.eventStartDateTime).toLocaleDateString('en-GB', { weekday: 'long' })}</p>
              <p className="text-2xl">{new Date(event.eventStartDateTime).getDate()}</p>
              <p className="text-xs">{new Date(event.eventStartDateTime).toLocaleDateString('en-GB', { month: 'short' })}</p>
            </div>
            <div className='w-full flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-10 items-start lg:items-center mt-4 lg:mt-0 m-3'>
              <div className="md:ml-3 lg:ml-0 flex flex-col lg:w-[60%] lg:flex-row lg:justify-between">
                <div>
                  <h1 className="text-2xl lg:text-3xl font-bold">{event.eventName}</h1>
                  <div className="text-sm text-[#22B0C1] mt-1">Location</div>
                  {event.venueDetails ? (
                    <div className="flex items-center mt-1">
                      <MdOutlineLocationOn size={20} className="mr-1" />
                      <span>{event.venueDetails}</span>
                    </div>
                  ) : (
                    <div className="flex items-center mt-1">
                      <RiVideoLine size={20} className="mr-1" />
                      <span>Online</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col lg:flex-row lg:items-center gap-4 mt-4 lg:mt-0 w-[96%]  p-2 md:p-0">
                <div className="flex w-[100%] justify-between">
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="text-lg">
                      {new Date(event.eventStartDateTime).toLocaleDateString('en-GB', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'short',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Time (IST)</p>
                    <p className="text-lg">
                      {new Date(event.eventStartDateTime).toLocaleTimeString('en-GB', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 justify-between lg:m-0">
                  <button
                    className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-100"
                    onClick={handleShareClick}
                  >
                    <FaShareAlt /> Share
                  </button>
                  <button onClick={handelEventSave} className="flex items-center gap-2 p-2 border rounded-lg hover:bg-gray-100">
                    <CiBookmark /> Save
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="relative mt-10 md:mt-2 shadow-2xl">
            <img
              src={event.images[currentImageIndex]?.url || 'placeholder_image_url'}
              alt={event.eventName}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
      <div className='mb-4'>
        <div className='flex gap-3 items-center'>
          <img className='w-14 h-14 rounded-full' src={event.userId.profileImage || 'placeholder_profile_image_url'} alt="Organizer" />
          <div>
            <p className='text-sm'>Organized by</p>
            <p className="text-lg font-bold">{event.userId.name}</p>
          </div>
        </div>
      </div>
      <div className='lg:flex lg:gap-4'>
        <div className="text-lg mb-4 w-full lg:w-[70%]">
          <span className='font-bold text-sm'>About This Event</span>
          <p className='font-sans'>{event.eventDesc}</p>
        </div>
        <div className="lg:w-1/3 bg-gray-100 p-4 rounded-lg shadow-md flex flex-col justify-between">
          <div>
            <div className="mb-4">
              <h2 className="text-xl font-bold">Date & Time</h2>
              <p className='whitespace-nowrap'>Start's at -
                {new Date(event?.eventStartDateTime).toLocaleString('en-GB', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
              <p className='whitespace-nowrap'>End's at -
                {new Date(event?.eventStartDateTime).toLocaleString('en-GB', {
                  weekday: 'long',
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-bold">Location</h2>
              <p>{event.venueDetails || 'Online'}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-xl font-bold">Price</h2>
              <p>{event.isFree ? 'Free' : `$${event.amount}`}</p>
            </div>
          </div>
          <button
            onClick={(event.isFree && event.venueDetails == null) ? handleMeetLink : handleBookTicket}
            className="bg-green-500 text-white w-full py-2 rounded-lg mt-4 hover:bg-green-600"
            disabled={bookingLoading}
          >
            {bookingLoading
              ? 'Getting Ticket....'
              : (event.isFree && event.venueDetails == null)
                ? 'Get Meeting Link'
                : 'Book Ticket'
            }
          </button>
          {
            step == 1 ? <GooglePayButton
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
                        gateway: 'example',
                        gatewayMerchantId: 'exampleMerchantId',
                      },
                    },
                  },
                ],
                merchantInfo: {
                  merchantId: 'BCR2DN4T6Y4TH4KF',
                  merchantName: 'Kolhapur Event Planner',
                },
                transactionInfo: {
                  totalPriceStatus: 'FINAL',
                  totalPriceLabel: 'Total',
                  totalPrice: "10",
                  currencyCode: 'INR',
                  countryCode: 'IN',
                },
              }}
              onLoadPaymentData={(paymentRequest) => handleGooglePaySuccess(paymentRequest)}
            /> : null
          }
        </div>
      </div>
      <div className="flex-col items-center gap-4 mt-6">
        <div className="text-lg font-bold mb-3">About the Organizer</div>
        <div className='flex gap-3 shadow-2xl bg-white md:w-[30%] p-3 m-3 rounded-lg'>
          <img className='w-10 h-10 rounded-full' src={event.userId.profileImage || 'placeholder_profile_image_url'} alt="Organizer" />
          <div>
            <p className="text-lg">{event.userId.name}</p>
            <p className="text-sm text-gray-500">{event.userId.email}</p>
            <button
              className="text-blue-500 text-sm mt-1 hover:underline"
              onClick={() => navigate(`/organizer/${event.userId._id}/${event._id}`)}
            >
              View Profile
            </button>
          </div>
        </div>
      </div>
      <AlertModal
        message={alert.message}
        type={alert.type}
        show={alert.show}
        onClose={() => setAlert({ ...alert, show: false })}
      />

    </div>

  );
};

export default EventInfo;
