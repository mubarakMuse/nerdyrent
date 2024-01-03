"use client"
import React, { useEffect, useState } from "react";
import { SupabaseClient } from "@supabase/supabase-js";

function SubmissionViewPage({params} ) {
  const { id } = params
  const [submissionData, setSubmissionData] = useState(null);
  const [validCode, setValidCode] = useState(true);
  const [enteredCode, setEnteredCode] = useState("");
  const [codeError, setCodeError] = useState(false);
  const [messages, setMessages] = useState([]);
  const supabase = new SupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );


  // Function to check the UUID code
  const checkCode = () => {
    if (enteredCode === submissionData.code) { // Replace "your-uuid-code" with the actual UUID code
      setValidCode(true);
      setCodeError(false);
    } else {
      setValidCode(false);
      setCodeError(true);
    }
  };

  async function fetchMessages() {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("submission_id", id);

      if (error) {
        console.error("Error fetching messages:", error);
      } else {
        setMessages(data || []);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    async function fetchSubmission() {
      try {
        const { data, error } = await supabase
          .from("apartment_requests")
          .select("*")
          .eq("id", id);

        if (error) {
          console.error("Error fetching submission:", error);
        } else if (data.length === 1) {
          setSubmissionData(data[0]); // Set the submission data if found
          fetchMessages(); // Fetch messages when code is valid

        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
    fetchSubmission();
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">View Submission</h1>
      {!validCode ? (
        // Display code input and submit button
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">Enter the Access Code</h2>
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
            onClick={checkCode}
          >
            Submit Code
          </button>
        </div>
      ) : submissionData ? (
        // Display submission details if code is valid
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">
            Submission Details for : {submissionData.name || "N/A"}
          </h2>
          {/* Display submission details here */}
          <div className="grid grid-cols-2 gap-4">
      {/* <div>
        <p className="text-gray-600 font-semibold">Name:</p>
        <p>{submissionData.name || "N/A"}</p>
      </div>
      <div>
        <p className="text-gray-600 font-semibold">Email:</p>
        <p>{submissionData.email || "N/A"}</p>
      </div>
      <div>
        <p className="text-gray-600 font-semibold">Phone:</p>
        <p>{submissionData.phone || "N/A"}</p>
      </div> */}
      <div>
        <p className="text-gray-600 font-semibold">Location:</p>
        {submissionData.location.map((location, index) => (
                    <span
                      key={index}
                      className="inline-block bg-indigo-100 text-indigo-800 px-2 py-1 text-sm mr-2"
                    >
                      {location}
                    </span>
                  ))}
      </div>
      <div>
        <p className="text-gray-600 font-semibold">Bedrooms:</p>
        <p>{submissionData.beds}</p>
      </div>
      <div>
        <p className="text-gray-600 font-semibold">Bathrooms:</p>
        <p>{submissionData.baths}</p>
      </div>
      <div>
        <p className="text-gray-600 font-semibold">Move-In Date:</p>
        <p>{submissionData.moveInDate}</p>
      </div>
      <div>
        <p className="text-gray-600 font-semibold">Amenities:</p>
        <ul>
          {submissionData.amenities.length === 0 ? "N/A" : submissionData.amenities.map((amenity, index) => (
            <li key={index}>{amenity}</li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-gray-600 font-semibold">Additional Details:</p>
        <p>{submissionData.additionalDetails || "N/A"}</p>
      </div>
    </div>
        </div>
      ) : (
        <p className="text-red-500">Submission not found for code: {id}</p>
      )}

      {/* Display messages */}
      {validCode && (
         <div className="mt-8">
         <h2 className="text-2xl font-semibold mb-4">Messages</h2>
         {messages.length > 0 ? (
           <ul className="space-y-4">
             {messages.map((message) => (
               <li key={message.id} className="bg-gray-100 p-4 rounded-lg">
                 <p>{message.message_text}</p>
                 <p className="text-gray-500 mt-2">
                   Sent on: {new Date(message.created_at).toLocaleDateString()}
                 </p>
               </li>
             ))}
           </ul>
         ) : (
           <p className="text-gray-500">No messages for this submission yet.</p>
         )}
       </div>
      )}
    </div>
  );
}

export default SubmissionViewPage;

