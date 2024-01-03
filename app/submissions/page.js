"use client"
import React, { useEffect, useState } from "react";
import { SupabaseClient } from "@supabase/supabase-js";
import Select from "react-select";
import cityOptions from "@/cities"; // Import city options

function SubmissionsListPage() {
  const [submissions, setSubmissions] = useState([]);
  const [locationFilter, setLocationFilter] = useState(null);
  const [validCode, setValidCode] = useState(true);// check
  const [enteredCode, setEnteredCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const supabase = new SupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const openMessageModal = (submission) => {
    setSelectedSubmission(submission);
    setMessage("");
    document.getElementById("leave-message").showModal();
  };

  const closeMessageModal = () => {
    setSelectedSubmission(null);
    document.getElementById("leave-message").close();
  };

  // Function to reset the valid code state after 10 minutes
  useEffect(() => {
    let timeout;

    if (validCode) {
      timeout = setTimeout(() => {
        setValidCode(false);
      }, 10 * 60 * 1000); // 10 minutes in milliseconds
    }

    return () => clearTimeout(timeout);
  }, [validCode]);

  useEffect(() => {
    async function fetchSubmissions() {
      try {
        const { data, error } = await supabase
          .from("apartment_requests")
          .select("*");
        if (error) {
          console.error("Error fetching submissions:", error);
        } else {
          setSubmissions(data);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchSubmissions();
  }, []);

  const handleLocationChange = (selectedOption) => {
    setLocationFilter(selectedOption);
  };

  const filteredSubmissions = locationFilter
  ? submissions.filter((submission) =>
      submission.location.some(loc => 
        loc.toLowerCase().includes(locationFilter.value.toLowerCase())
      )
    )
  : submissions;

  const handleCodeSubmit = () => {
    if (enteredCode === "rent2023") {
      setValidCode(true);
      setCodeError(false);
    } else {
      setValidCode(false);
      setCodeError(true);
    }
  };

  const leaveMessage = async () => {
    if (selectedSubmission && message) {
      try {
        const { error } = await supabase.from("messages").upsert([
          {
            submission_id: selectedSubmission.id,
            message_text: message,
          },
        ]);

        if (error) {
          console.error("Error leaving message:", error);
        } else {
          console.log("Message saved successfully");
          // Close the modal after leaving the message
          closeMessageModal();
        }
      } catch (error) {
        console.error("Error leaving message:", error);
      }
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Submissions List</h1>
      {validCode ? (
        <div>
          <div className="space-y-4">
            <div className="flex items-center">
              <label className="font-semibold mr-2">Filter by Location:</label>
              <Select
                id="location"
                name="location"
                value={locationFilter}
                onChange={handleLocationChange}
                options={cityOptions}
                placeholder="Select cities..."
                isSearchable
                required
                className="mt-1 p-2 w-1/2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSubmissions.map((submission) => (
              <div
                key={submission.id}
                className="bg-white p-4 rounded-lg shadow-md border border-gray-300"
              >
                <p className="mb-2">
                  <span className="font-semibold">Move-In Date:</span>{" "}
                  {new Date(submission.moveInDate).toLocaleDateString()}
                </p>
                <div className="mb-2">
                  <span className="font-semibold">Location:</span>{" "}
                  {submission.location.map((location, index) => (
                    <span
                      key={index}
                      className="inline-block bg-indigo-100 text-indigo-800 px-2 py-1 text-sm mr-2"
                    >
                      {location}
                    </span>
                  ))}
                </div>
                <div className="mb-2">
                  <span className="font-semibold">Amenities:</span>{" "}
                  {submission.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm mr-2"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>
                <p className="mb-2">
                  <span className="font-semibold">Bedrooms:</span>{" "}
                  {submission.beds}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Bathrooms:</span>{" "}
                  {submission.baths}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Price Range:</span> $
                  {submission.priceMin} - ${submission.priceMax}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Additional Details:</span>{" "}
                  {submission.additionalDetails || "None"}
                </p>
                <p>
                  <span className="font-semibold">Submitted On:</span>{" "}
                  {new Date(submission.created_at).toLocaleDateString()}
                </p>
                <button
                  className="btn mt-4"
                  onClick={() => openMessageModal(submission)}
                >
                  Leave a Message
                </button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-blur p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">
            Enter the access code to view submissions:
          </h2>
          <input
            type="password"
            placeholder="Enter code..."
            className={`w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
              codeError ? "border-red-500" : ""
            }`}
            value={enteredCode}
            onChange={(e) => setEnteredCode(e.target.value)}
          />
          {codeError && (
            <p className="text-red-500 mt-2">Invalid code. Try again.</p>
          )}
          <button
            className="mt-4 bg-black hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-blue-300"
            onClick={handleCodeSubmit}
          >
            Submit Code
          </button>
        </div>
      )}
      <dialog id="leave-message" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Leave a Message</h3>
          <div className="modal-action">
            <form method="dialog">
              <textarea
                placeholder="Enter your message..."
                className="w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button
                className="mt-4 bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-blue-300"
                onClick={leaveMessage}
              >
                Leave Message
              </button>
              <button
                className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring focus:ring-blue-300"
                onClick={closeMessageModal}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default SubmissionsListPage;
