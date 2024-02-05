import React, { useState } from "react";

const ApartmentCard = ({ apartment }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const navigateToCompanyWebsite = () => {
    window.open(apartment.companyWebsite, "_blank");
  };

  const handleCallButtonClick = () => {
    window.location.href = `tel:${apartment.phone.replace(/\D/g, "")}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={apartment.image}
        alt={apartment.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {apartment.name}
        </h2>
        <p className="text-gray-600 text-sm mb-2">{apartment.address}</p>

        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="text-lg font-semibold text-blue-600">
              {apartment.priceRange}
            </p>
          </div>
        </div>

        <span className="bg-blue-400 text-white text-md px-2 py-1 rounded-md mb-4">
          {apartment.deal}
        </span>

        <div className="flex items-center text-sm space-x-2 mt-4">
          <button
            onClick={navigateToCompanyWebsite}
            className="bg-blue-600 text-white px-2 py-1 rounded-md text-sm hover:bg-blue-700 focus:outline-none"
          >
            Visit Site
          </button>
          <button
            onClick={handleCallButtonClick}
            className="bg-gray-600 text-white px-2 py-1 rounded-md text-sm hover:bg-gray-700 focus:outline-none"
          >
            Call {apartment.phone}
          </button>
          <button
            onClick={toggleDetails}
            className="bg-gray-300 text-gray-800 px-2 py-1 rounded-md text-sm hover:bg-gray-400 focus:outline-none"
          >
            {showDetails ? "Hide Details" : "Show Details"}
          </button>
        </div>

        {showDetails && (
          <div className="mt-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Additional Details
            </h3>
            <p className="text-gray-600 text-sm">Beds: {apartment.beds}</p>
            <p className="text-gray-600 text-sm">Sq. Ft: {apartment.sqFt}</p>
            <p className="text-gray-600 text-sm">Baths: {apartment.baths}</p>
            <p className="text-gray-600 text-sm">Type: {apartment.type}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApartmentCard;
