"use client";
import React, { useState } from "react";
import ApartmentList from "@/components/ApartmentList";
import ApartmentModal from "@/components/ApartmentModal"; // Import the modal component
import { useRouter } from "next/navigation";


const Deals = () => {
  const router = useRouter();

  const handleButtonClick = () => {
    router.push("/new");
  };
  return (
    <div className="bg-gray-100 min-h-screen">
    <div className="flex flex-col items-center justify-center p-6">
        <p className="text-gray-700 font-bold text-lg italic mb-4">
          Explore the Best Apartment Deals Nationwide
        </p>
        <p className="text-gray-600 italic text-sm mb-6">
          Carefully vetted and maintained by our team.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white text-sm py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-300 transition duration-150"
          onClick={()=> window.open("https://forms.gle/pnxkBbjqixhsugGc7", "_blank")}
        >
          Help me find an Apartment [$100]
        </button>
      </div>
      <div className="">
        <ApartmentList />
      </div>
    </div>
  );
};

export default Deals;
