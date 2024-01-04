import React, { useState, useRef } from 'react';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';

const GoogleMapsAutocomplete = ({ setPlaces, places }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const autocompleteRef = useRef(null);

  const handlePlaceChanged = () => {
    const place = autocompleteRef.current.getPlace();
    setPlaces([...places, place]);
  };

  const removePlaceField = (index) => {
    const newPlaces = places.filter((_, placeIndex) => placeIndex !== index);
    setPlaces(newPlaces);
  };

  return (
    <div>
      {isLoaded ? (
        <div className="mb-2">
          <Autocomplete
            onLoad={(autocomplete) => {
              autocompleteRef.current = autocomplete;
            }}
            onPlaceChanged={handlePlaceChanged}
            types={['locality', 'neighborhood']}
            componentRestrictions={{ country: 'US' }}
          >
            <input
              type="text"
              placeholder="Enter a city or neighborhood in the US"
              className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </Autocomplete>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <div className="mt-4 space-y-2">
        {places.map((place, index) => (
          <div key={index} className="flex items-center justify-between p-2 border rounded-md bg-gray-50">
            <span className="font-semibold">{place.formatted_address}</span>
            <button
              onClick={() => removePlaceField(index)}
              className="text-red-500 hover:text-red-600"
              aria-label={`Remove location ${index + 1}`}
            >
              &#x2715;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GoogleMapsAutocomplete;
