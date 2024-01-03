"use client"
import React, { useState, useRef } from 'react';
import { Autocomplete, useJsApiLoader } from '@react-google-maps/api';

const GoogleMapsAutocomplete = ({ setPlaces, places }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const autocompleteRefs = useRef([]);

  const handlePlaceChanged = (index) => {
    const place = autocompleteRefs.current[index].getPlace();
    const newPlaces = [...places];
    newPlaces[index] = place;
    setPlaces(newPlaces);
  };

  const addPlaceField = () => {
    setPlaces([...places, null]);
    autocompleteRefs.current = [...autocompleteRefs.current, null];
  };

  const removePlaceField = (index) => {
    const newPlaces = [...places];
    newPlaces.splice(index, 1);
    setPlaces(newPlaces);
    autocompleteRefs.current.splice(index, 1);
  };

  return (
    <div>
      {isLoaded ? (
        places.map((_, index) => (
          <div key={index} className="mb-2">
            <Autocomplete
              onLoad={(autocomplete) => {
                autocompleteRefs.current[index] = autocomplete;
              }}
              onPlaceChanged={() => handlePlaceChanged(index)}
              types={['locality', 'neighborhood']}
              componentRestrictions={{ country: 'US' }}
            >
              <input
                type="text"
                placeholder="Enter a city or neighborhood in the US"
                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </Autocomplete>
            <button
              onClick={() => removePlaceField(index)}
              className="mt-1 p-2 bg-red-500 text-white rounded-md"
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}

      <button onClick={addPlaceField} className="mt-2 p-2 border bg-gray-300 text-black-100 rounded-md">
        Add Another Location
      </button>

      {places.map((place, index) => (
        place && (
          <div key={index}>
            <h3>Location {index + 1}</h3>
            <p>{place.formatted_address}</p>
          </div>
        )
      ))}
    </div>
  );
};

export default GoogleMapsAutocomplete;
