import React, { useState } from 'react';
import ExploreEvents from './ExploreEvents';
import ExploreEventsHeader from './ExploreEventsHeader';

const EventPage = () => {
  const [searchValue, setSearchValue] = useState({
    byLocation: "",
    byEventName: ""
  });

  const [triggerSearch, setTriggerSearch] = useState(false); 

  const handleSearchClick = () => {
    setTriggerSearch(true); 
  };

  return (
    <>
      <ExploreEventsHeader 
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onSearchClick={handleSearchClick}
      />
      <ExploreEvents searchValue={searchValue} triggerSearch={triggerSearch}  setTriggerSearch={setTriggerSearch} />
    </>
  );
};

export default EventPage;
