import React, { useEffect, useState } from 'react';
import ApartmentCard from './ApartmentCard';
import { SupabaseClient } from "@supabase/supabase-js";

const ApartmentList = () => {
  const [apartmentsData, setApartmentsData] = useState([]);
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {apartmentsData.map((apartment, index) => (
        <ApartmentCard key={index} apartment={apartment} />
      ))}
    </div>
  );
};

export default ApartmentList;
