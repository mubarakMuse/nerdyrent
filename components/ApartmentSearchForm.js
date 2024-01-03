import React, { useState } from "react";
import Select from "react-select"; // Install this library
import { SupabaseClient } from "@supabase/supabase-js";


import cityOptions from "@/cities"; // Import city options
// import { supabase } from "./supabase"; // Import your Supabase client instance
// import { v4 as uuidv4 } from "uuid"; // Import the uuid library for generating unique IDs

function ApartmentSearchForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: [],
    beds: "Any",
    baths: "Any",
    priceMin: 0,
    priceMax: 0,
    moveInDate: null,
    amenities: [],
    additionalDetails: "",
  });
  
  const [submissionMessage, setSubmissionMessage] = useState("");
  const [id, setId] = useState(null);

  const supabase = new SupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  // Function to generate price options with a specified range and increment
  function generatePriceOptions(min, max, increment) {
    const options = [];
    for (let price = min; price <= max; price += increment) {
      options.push(
        <option key={price} value={price}>
          ${price}
        </option>
      );
    }
    return options;
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      if (checked) {
        setFormData({
          ...formData,
          amenities: [...formData.amenities, value],
        });
      } else {
        setFormData({
          ...formData,
          amenities: formData.amenities.filter((amenity) => amenity !== value),
        });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleLocationChange = (selectedOption) => {
    console.log(selectedOption);
    setFormData({ ...formData, location: selectedOption });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const uniqueCode = uuidv4();

    try {
      // Insert the form data into your Supabase database table
      const { data, error } = await supabase
        .from("apartment_requests") // Replace 'your_table_name' with the actual table name
        .upsert([
          {
            // code: uniqueCode, // Include the unique code
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            location: formData.location.map((option) => option.formatted_address),
            beds: formData.beds,
            baths: formData.baths,
            priceMin: formData.priceMin,
            priceMax: formData.priceMax,
            moveInDate: formData.moveInDate,
            amenities: formData.amenities,
            additionalDetails: formData.additionalDetails,
          },
        ])
        .select();

      if (error) {
        console.error("Error inserting data into Supabase:", error);
        setSubmissionMessage(
          "Error: Something went wrong. Please try again later."
        );
      } else {
        const submissionLink = `/submissions/${data[0].id}`;
        setSubmissionMessage(
          `Thank you, ${formData.name}! Your request has been submitted successfully. Apartments that have units matching your request will leave a message here: nerdyrent.com${submissionLink}`
        );
        setId(data[0].id);
        window.open(submissionLink, "_blank");

        setFormData({
          name: "",
          email: "",
          phone: "",
          location: [],
          beds: "Any",
          baths: "Any",
          priceMin: "",
          priceMax: "",
          moveInDate: "",
          amenities: [],
          additionalDetails: "",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setSubmissionMessage(
        "Error: Something went wrong during submission. Please try again later."
      );
    }
  };

  const SubmissionMessage = ({ submissionStatus }) => {
    if (!submissionStatus) {
      return null;
    }

    const isError = submissionStatus.startsWith("Error");
    const messageClass = isError
      ? "bg-red-100 border border-red-400 text-red-700"
      : "bg-green-100 border border-green-400 text-green-700";

    return (
      <div className={`${messageClass} p-4 rounded-lg`} role="alert">
        <p>{submissionStatus}</p>
        {!isError && id && (
          <a
            href={`/submissions/${id}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:no-underline"
          >
            View your submission
          </a>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-md w-11/12 mx-auto p-6 border bg-base-100 border-gray-300">
    {submissionMessage ? (
        <>
          <h2 className="text-center text-2xl font-bold mb-8">
            Submission Status
          </h2>{" "}
          <SubmissionMessage submissionStatus={submissionMessage} />
        </>
      ) : (
        <>
          <h2 className="text-center text-2xl font-bold mb-8">
            Tell us your preferences:
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Location */}
            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-gray-800 font-bold mb-2"
              >
                Location(s):
              </label>
              <Select
                id="location"
                name="location"
                value={formData.location}
                onChange={handleLocationChange}
                options={cityOptions}
                placeholder="Select cities..."
                isMulti
                isSearchable
                required
                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Number of Beds */}
              <div>
                <label
                  htmlFor="beds"
                  className="block text-gray-800 font-bold mb-2"
                >
                  Bedrooms:
                </label>
                <select
                  id="beds"
                  name="beds"
                  value={formData.beds}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="Any">Any</option>
                  <option value="Studio+">Studio+</option>
                  <option value="1+ Beds">1+ Beds</option>
                  <option value="2+ Beds">2+ Beds</option>
                  <option value="3+ Beds">3+ Beds</option>
                  <option value="4+ Beds">4+ Beds</option>
                </select>
              </div>

              {/* Number of Baths */}
              <div>
                <label
                  htmlFor="baths"
                  className="block text-gray-800 font-bold mb-2"
                >
                  Bathrooms:
                </label>
                <select
                  id="baths"
                  name="baths"
                  value={formData.baths}
                  onChange={handleChange}
                  required
                  className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="Any">Any</option>
                  <option value="1+ Baths">1+ Baths</option>
                  <option value="2+ Baths">2+ Baths</option>
                  <option value="3+ Baths">3+ Baths</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              {/* Price Range (Min) */}
              <div>
                <label
                  htmlFor="priceMin"
                  className="block text-gray-800 font-bold mb-2"
                >
                  Min Price:
                </label>
                <select
                  id="priceMin"
                  name="priceMin"
                  value={formData.priceMin}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {generatePriceOptions(600, 5000, 50)}
                </select>
              </div>

              {/* Price Range (Max) */}
              <div>
                <label
                  htmlFor="priceMax"
                  className="block text-gray-800 font-bold mb-2"
                >
                  Max Price:
                </label>
                <select
                  id="priceMax"
                  name="priceMax"
                  value={formData.priceMax}
                  onChange={handleChange}
                  required
                  className="w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  {generatePriceOptions(600, 5000, 50)}
                </select>
              </div>
            </div>

            {/* Move-In Date */}
            <div className="mb-4">
              <label
                htmlFor="moveInDate"
                className="block text-gray-800 font-bold mb-2"
              >
                Move-In Date:
              </label>
              <input
                type="date"
                id="moveInDate"
                name="moveInDate"
                value={formData.moveInDate}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Amenities */}
            <div className="mb-4">
              <label className="block text-gray-800 font-bold mb-2">
                Amenities:
              </label>
              <Select
                isMulti
                name="amenities"
                options={amenitiesOptions.map((amenity) => ({
                  value: amenity,
                  label: amenity,
                }))}
                value={formData.amenities.map((amenity) => ({
                  value: amenity,
                  label: amenity,
                }))}
                onChange={(selectedOptions) =>
                  setFormData({
                    ...formData,
                    amenities: selectedOptions.map((option) => option.value),
                  })
                }
                className="mt-1 p-2 w-full border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="additionalDetails"
                className="block text-gray-800 font-bold mb-2"
              >
                Additional Details:
              </label>
              <textarea
                id="additionalDetails"
                name="additionalDetails"
                value={formData.additionalDetails}
                onChange={handleChange}
                rows="4" // You can adjust the number of rows as needed
                placeholder="Enter any additional details here..."
                className="w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-800 font-bold mb-2"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            {/* Name */}
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-800 font-bold mb-2"
              >
                Name (Optional):
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Phone (Optional) */}
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-gray-800 font-bold mb-2"
              >
                Phone (Optional):
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-blue-300"
              >
                Submit
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

const amenitiesOptions = [
  "Air Conditioning",
  "In Unit Washer & Dryer",
  "Washer & Dryer Hookups",
  "Dishwasher",
  "Wheelchair Access",
  "Parking",
  "Laundry Facilities",
  "Fitness Center",
  "Pool",
  "Elevator",
  "Doorman",
  "Dog Friendly",
  "Cat Friendly",
  "Furnished",
  "Lofts",
  "Utilities Included",
  "Gated",
  "Fireplace",
  "Patio",
  "Garage",
  "Hardwood Floors",
  "Balcony",
  "Office",
  "Den",
  "Yard",
  "Clubhouse",
  "Business Center",
  "Controlled Access",
  "Playground",
  "Basement",
  "Walk-In Closets",
  "Concierge",
  "EV Charging",
  "Storage Units",
  "Dog Park",
  "High Ceilings",
];

export default ApartmentSearchForm;
