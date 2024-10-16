import { useState, useEffect } from 'react';

const useEventFilter = (events) => {
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [filteredEvents, setFilteredEvents] = useState(events);

  useEffect(() => {
    filterEvents();
  }, [selectedFilter, events]);

  const filterEvents = () => {
    const today = new Date();
    let filtered = events;

    switch (selectedFilter) {
      case 'Today':
        filtered = events.filter(event => {
          const eventDate = new Date(event.eventStartDateTime);
          return (
            eventDate.getDate() === today.getDate() &&
            eventDate.getMonth() === today.getMonth() &&
            eventDate.getFullYear() === today.getFullYear()
          );
        });
        break;
      case 'Tomorrow':
        filtered = events.filter(event => {
          const eventDate = new Date(event.eventStartDateTime);
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);
          return (
            eventDate.getDate() === tomorrow.getDate() &&
            eventDate.getMonth() === tomorrow.getMonth() &&
            eventDate.getFullYear() === tomorrow.getFullYear()
          );
        });
        break;
      case 'This Week':
        const startOfWeek = today.getDate() - today.getDay();
        filtered = events.filter(event => {
          const eventDate = new Date(event.eventStartDateTime);
          return (
            eventDate >= new Date(today.setDate(startOfWeek)) &&
            eventDate <= new Date(today.setDate(startOfWeek + 6))
          );
        });
        break;
      case 'Next Week':
        const nextWeekStart = new Date(today.setDate(today.getDate() + (7 - today.getDay())));
        const nextWeekEnd = new Date(nextWeekStart);
        nextWeekEnd.setDate(nextWeekEnd.getDate() + 6);
        filtered = events.filter(event => {
          const eventDate = new Date(event.eventStartDateTime);
          return eventDate >= nextWeekStart && eventDate <= nextWeekEnd;
        });
        break;
      case 'This Month':
        filtered = events.filter(event => {
          const eventDate = new Date(event.eventStartDateTime);
          return (
            eventDate.getMonth() === today.getMonth() &&
            eventDate.getFullYear() === today.getFullYear()
          );
        });
        break;
      case 'Next Month':
        filtered = events.filter(event => {
          const eventDate = new Date(event.eventStartDateTime);
          const nextMonth = new Date(today.setMonth(today.getMonth() + 1));
          return (
            eventDate.getMonth() === nextMonth.getMonth() &&
            eventDate.getFullYear() === nextMonth.getFullYear()
          );
        });
        break;
      case 'This Year':
        filtered = events.filter(event => {
          const eventDate = new Date(event.eventStartDateTime);
          return eventDate.getFullYear() === today.getFullYear();
        });
        break;
      case 'Next Year':
        filtered = events.filter(event => {
          const eventDate = new Date(event.eventStartDateTime);
          return eventDate.getFullYear() === today.getFullYear() + 1;
        });
        break;
      default:
        filtered = events;
        break;
    }

    setFilteredEvents(filtered);
  };

  return {
    selectedFilter,
    filteredEvents,
    setSelectedFilter,
  };
};

export default useEventFilter;
