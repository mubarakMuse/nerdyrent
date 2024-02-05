import React, { useEffect, useState } from 'react';
import ApartmentCard from './ApartmentCard';
import { SupabaseClient } from "@supabase/supabase-js";

const ApartmentList = () => {
  const [apartmentsData, setApartmentsData] = useState([]);
  const [selectedState, setSelectedState] = useState("Minnesota");
  const [selectedCity, setSelectedCity] = useState("");
  const supabase = new SupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const { data, error } = await supabase.from('apartments').select('*');
        if (error) {
          throw error;
        }
        setApartmentsData(data);
      } catch (error) {
        console.error('Error fetching apartments:', error.message);
      }
    };

    fetchApartments();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="p-4">
        <div className="flex justify-center space-x-4 mb-4">
          <div className="relative">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="block appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
            >
              <option value="">Select State</option>
              {/* Populate the dropdown with unique state values from apartmentsData */}
              {Array.from(new Set(apartmentsData.map((apartment) => apartment.state))).map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <div className="relative">
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="block appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-800 focus:outline-none focus:border-blue-500"
            >
              <option value="">All cities</option>
              {/* Populate the dropdown with unique city values based on the selectedState */}
              {Array.from(new Set(apartmentsData
                .filter((apartment) => apartment.state === selectedState)
                .map((apartment) => apartment.city)))
                .map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-4">
          {apartmentsData
            .filter((apartment) => {
              // Apply the filter based on selectedState and selectedCity
              if (selectedState && selectedCity) {
                return apartment.state === selectedState && apartment.city === selectedCity;
              } else if (selectedState) {
                return apartment.state === selectedState;
              } else {
                return true; // No filter applied
              }
            })
            .map((apartment, index) => (
              <ApartmentCard key={index} apartment={apartment} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default ApartmentList;
