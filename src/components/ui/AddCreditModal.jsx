import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addCredits } from "../../redux/projects/action"; // assuming you have an addCredit action
import { useNavigate, useParams } from "react-router-dom";

const AddCreditModal = () => {
     const { key } = useParams();
  const [creditValue, setCreditValue] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Track the modal open/close state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const toggleModal = () => {
    setIsOpen(!isOpen); 
    setCreditValue(null)// Toggle modal visibility
  };

  const handleSubmit = () => {
    if (creditValue !== "") {
        console.log("creditValue",creditValue)
      // Dispatch addCredit with secret_key and the entered credit value
      dispatch(addCredits({ secret_key:key, credit: creditValue }));
      // Close modal and navigate after submission
      setCreditValue(null)
      setIsOpen(false); // Close the modal
    //   navigate("/requests"); // Navigate to the requests page after submission
    }
  };

  return (
    <div>
      <div className="flex justify-end mt-2">
        {/* <button
          onClick={toggleModal}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
        >
          Add Credits
        </button> */}

            <button  onClick={toggleModal}>
            <svg class="w-12 h-12 text-amber-500 hover:text-white bg-white hover:bg-amber-400 rounded-full " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
        </svg>
            </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 max-w-md w-full bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add Credits</h3>
              <button
                onClick={toggleModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
            <div>
              <input
                type="number"
                className="w-full text-gray-800 p-2 border border-gray-300 rounded-lg mb-4"
                placeholder="Enter Number of Credits"
                value={creditValue}
                onChange={(e) => setCreditValue(e.target.value)}
              />
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg"
              >
                Add Credits
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddCreditModal;
