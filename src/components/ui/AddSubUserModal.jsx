import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSubUser, generateApiKey, getApiKeys } from "../../redux/projects/action"; // assuming you have these actions
import { useNavigate, useParams } from "react-router-dom";
import DataTable from "react-data-table-component";

const AddSubUserModal = () => {
  const { key } = useParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // For generating API key
   // For generating API key
  const [isOpen, setIsOpen] = useState(false); // Modal state
  const [step, setStep] = useState(1); // Track step (1: data table, 2: generate API key form)

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch the API keys from the redux store
  const apiKeys = useSelector((state) => state.projectReducer?.getApiKeys?.data);

  console.log("api keys", apiKeys);
  useEffect(() => {
    dispatch(getApiKeys({ secret_key: key })); // Fetch API keys when the component mounts
  }, [dispatch, key]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setStep(1); // Reset to first step when the modal is toggled
    setEmail(""); // Reset the input field
  };

  const handleUserCreation = () => {
    if (email !== "") {
      dispatch(addSubUser({ secret_key: key, email: email, password:password }));
      setStep(1); // Return to the first step after generating the key
      setIsOpen(false); // Close the modal after generating the key
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("API key copied to clipboard!");
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      wrap: true, // Allow text wrapping
      style: {
        minWidth: "150px", // Minimum width
        maxWidth: "300px", // Maximum width
      },
    },
    {
      name: "API Key",
      selector: (row) => row.api_key,
      cell: (row) => (
        <div className="flex items-center gap-2">
          <span className="break-all">{row.api_key}</span>
         
            <svg  onClick={() => copyToClipboard(row.api_key)} class="w-6 h-6 cursor-pointer hover:text-blue-500 text-gray-300 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
  <path fill-rule="evenodd" d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-6 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clip-rule="evenodd"/>
</svg>

            

        </div>
      ),
      wrap: true, // Ensure text wraps and shows fully
      sortable: true,
    },
  ];

  return (
    <div>
      <div className="flex justify-end mt-2">
        <button
          onClick={toggleModal}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm p-3 text-center"
          type="button"
        >
          Add User
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 max-w-4xl w-full bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Add New User
              </h3>
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

            { (
              // Step 2: Generate API Key Form
              <div>
                <input
                  type="text"
                  className="w-full text-gray-800 p-2 border border-gray-300 rounded-lg mb-4"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

<input
                  type="password"
                  className="w-full text-gray-800 p-2 border border-gray-300 rounded-lg mb-4"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  onClick={handleUserCreation}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSubUserModal;
