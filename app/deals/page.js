"use client"
import React from "react";
import ApartmentList from "@/components/ApartmentList";


const Deals = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex flex-col items-center text-center font-serif justify-center p-6">
        <p className="text-gray-700 font-bold   italic mb-4">
          An exclusive list of the best apartment deals in Minnesota.
        </p>
        <p className="text-gray-600 italic text-sm mb-3">
          Carefully vetted and maintained by humans.
        </p>
      </div>
      <div className="">
        <ApartmentList />
      </div>
      
    </div>

  );
};

export default Deals;
