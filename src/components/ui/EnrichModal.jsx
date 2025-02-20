import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enrichData, requests } from "../../redux/home/action";
import { useNavigate, useParams } from "react-router-dom";
import { all } from "axios";

const EnrichModal = ({ selectedData,availableCredits}) => {
  // let availableCredits=10
  const {key}=useParams();
  const [allFieldsState, setAllFieldsState] = useState([]);
  const handleFieldNameToggle = (fieldName) => {
    setAllFieldsState((prev) =>
      prev.includes(fieldName)
        ? prev.filter((field) => field !== fieldName) // Remove field if it exists
        : [...prev, fieldName] // Add field if it doesn't exist
    );
  };

  const uniqueData = selectedData.filter(
    (item, index, self) => self.findIndex((data) => data.IP === item.IP) === index
  );
  console.log("(allFieldsState",allFieldsState);
  const recent = useSelector((state) => state.homeReducer.requests.data);
  const last5Records = recent ? recent.slice(-5) : [];
  const reverseArray = last5Records.reverse();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [stage, setStage] = useState("first");
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [selectedFields, setSelectedFields] = useState([]);
  // Primary Fields (non-interactive, pre-selected)
  const [primaryFields] = useState([
    { 'ipAddress': ['m_ip_address', 'd_ip_address'] },
    { 'state': ['m_state', 'd_state'] },
    { 'city': ['m_city', 'd_city'] },
    { 'zipCode': ['m_postal_code', 'd_zip_code'] },
  ]);

  // Basic Fields (non-interactive, pre-selected)
  const [basicFields] = useState([
    { 'email': ['m_email_address', 'd_email'] },
  ]);



  // useEffect(() => {
  //   // Pre-select the primary and basic fields by default
  //   setSelectedFields([
  //     ...selectedFields,
  //     // ...primaryFields.flatMap(field => Object.values(field)).flat(),
  //     ...basicFields.flatMap(field => Object.values(field)).flat()
  //   ]);
  // }, [primaryFields, basicFields]);

  console.log("selectedFields",selectedFields)
  const fields = [
    {'email': ['m_email_address', 'd_email']},
    { 'firstName': ['m_name_first', 'd_first_name'] },
    { 'middleName': ['m_name_middle'] },
    { 'lastName': ['m_name_last', 'd_last_name'] },
    { 'fullName': ['m_name_full', 'd_full_name'] },
    { 'address': ['m_address_line_1', 'd_address'] },
    { 'address2': ['m_address_line_2', 'd_address_2'] },
    { 'cell': ['m_cell', 'd_cell'] },
    { 'phone': ['m_phone_number', 'd_phone'] },
    { 'latitude': ['m_latitude', 'd_ip_latitude'] },
    { 'longitude': ['m_longitude', 'd_ip_longitude'] },
    { 'organization': ['m_organization', 'd_organization'] },
  ];

  // useEffect(() => {
  //   if (recent === null) {
  //     dispatch(requests());
  //   }
  // }, [recent]);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setStage("first");
    setSelectedFields([]);
    setAllFieldsState([]);
    setAmount(0);
  };

  const handleCheckboxChange = (fieldName) => {
    setSelectedFields((prev) =>
      prev.includes(fieldName)
        ? prev.filter((field) => field !== fieldName) // Remove the field if already selected
        : [...prev, fieldName] // Add the field if not already selected
    );
  };



  useEffect(() => {
   let totalamount= allFieldsState.length*uniqueData.length
   setAmount(totalamount)
  }, [allFieldsState,uniqueData])
  

  const applyEnrichment = () => {
    if (inputValue !== "" && selectedFields.length > 0 && selectedData) {
      const uniqueData = selectedData.filter(
        (item, index, self) => self.findIndex((data) => data.IP === item.IP) === index
      );
      dispatch(enrichData({ secret_key:key, name: inputValue, all_field: selectedFields,total_field: selectedFields?.length, Data: uniqueData }));
      toggleModal();
      navigate(`/projects/requests/${key}`);
    }
  };

  return (
    <div>
      <div className="flex justify-end mt-2">
        <button
          onClick={toggleModal}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
        >
          Enrich Data
        </button>
      </div>
      {isOpen && stage === "first" ? (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 max-w-md w-full bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Data Enrichment</h3>
              <h1>
                {"Total Selected Leads: "+ uniqueData?.length}
              </h1>
              
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
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                placeholder="Enter Enrichment Batch Name"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />

              <button
                onClick={() => setStage("second")}
                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      ) : isOpen && stage === "second" ? (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 max-w-6xl w-full bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Select Fields <span className="bg-yellow-500 font-normal text-base bg-opacity-20 border border-yellow-500 text-yellow-800 px-2 py-2 rounded">({uniqueData?.length} leads) x ({allFieldsState.length} Attributes of each) = <span className="font-bold text-white p-2 bg-rose-600">${amount}</span>  for {uniqueData?.length} leads Enrichment will be charged</span></h3>
              <h1 className="px-2 py-1 rounded border border-primary text-primary bg-primary bg-opacity-20">{availableCredits} credits available </h1>
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

            {/* Primary Fields (non-interactive) */}
            <h1 className="text-lg font-normal my-2">Primary Data</h1>
            <div className="flex flex-wrap gap-2">
              {primaryFields.map((field, index) => {
                const fieldName = Object.keys(field)[0];
                const fieldKeys = field[fieldName];
                return (
                  <label
                    key={index}
                    htmlFor={fieldName}
                    className="flex px-3 py-1 rounded-full text-nowrap bg-green-500 text-white cursor-not-allowed"
                  >
                    <input
                      type="checkbox"
                      id={fieldName}
                      checked={true}  // Always selected
                      disabled // Prevent user from unchecking
                      className="mr-2 hidden"
                    />
                    {fieldName}
                  </label>
                );
              })}
            </div>

            <hr className="my-3" />

            {/* Basic Fields (non-interactive) */}
            {/* <h1 className="text-lg font-normal my-2">Basic Data</h1>
            <div className="flex flex-wrap gap-2">
              {basicFields.map((field, index) => {
                const fieldName = Object.keys(field)[0];
                const fieldKeys = field[fieldName];
                return (
                  <label
                    key={index}
                    htmlFor={fieldName}
                    className="flex px-3 py-1 rounded-full text-nowrap bg-green-500 text-white "
                  >
                    <input
                      type="checkbox"
                      id={fieldName}
                      checked={true}  // Always selected
                      // disabled // Prevent user from unchecking
                      className="mr-2 hidden"
                    />
                    {fieldName}
                    <span
                      className={`rounded-full ml-2 px-2  bg-white ${
                        selectedFields.some((selected) =>
                          fieldKeys.includes(selected)
                        )
                          ? "border-green-500 text-green-500"
                          : ""
                      } text-sm border`}
                    >
                      $1
                    </span>
                  </label>
                );
              })}
            </div>

            <hr className="my-3" /> */}

            {/* User-selectable Fields */}
            <h1 className="text-lg font-normal my-2">Premium Data</h1>
            <div className="flex flex-wrap gap-2  py-2">
              {fields.map((field) => {
                const fieldName = Object.keys(field)[0];
                const fieldKeys = field[fieldName];
                return (
                  <label
                    key={fieldName}
                    htmlFor={fieldName}
                    className={`flex px-3 py-1 rounded-full text-nowrap cursor-pointer ${
                      selectedFields.includes(fieldName)
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    <input
                      type="checkbox"
                      id={fieldName}
                      checked={selectedFields.includes(fieldName)}
                      onChange={() => {
                        handleCheckboxChange(fieldName);
                        handleFieldNameToggle(fieldName);
                        console.log("fieldName",fieldName)
                      }}
                      className="mr-2 hidden"
                    />
                    {fieldName}
                    <span
                      className={`rounded-full ml-2 px-2 bg-white ${
                        selectedFields.includes(fieldName)
                          ? "border-green-500 text-green-500"
                          : ""
                      } text-sm border`}
                    >
                      $1
                    </span>
                  </label>
                );
              })}
            </div>
            {
              selectedFields?.length>0&&
              <>
              {
                     amount>availableCredits? <h1 className="w-full text-red-500 py-2 px-4 rounded-lg bg-red-100">You don't have enough credits to enrich the data, Unselect Data or Add More Credits to Enrich Leads</h1>:
                     <button
                     onClick={() => setStage("third")}
                     className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg mt-4"
                   >
                     Next
                   </button>

              }
              </>
         
            }
            
          </div>
        </div>
      ) : (
        isOpen && stage === "third" && (
          <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div className="relative p-4 max-w-4xl w-full bg-white rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Confirm and Proceed</h3>
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
                <h1>
                  Premium Data
                </h1>
                {
                  <div className="flex flex-wrap gap-2 ">
                    {
                      allFieldsState.map((field) => <h1 className="bg-gray-200 px-2 py-1 rounded-md">{field}</h1>)
                    }
                  </div>
                }
                <h1 className="my-2 border p-2 rounded border-green-500">
                  Estimated Cost for{" "}
                  <span className="font-semibold">{selectedData?.length + " recordsb                                                                                                                                   "}</span> is{" "}
                  <span className="text-green-500 font-bold">
                    ${amount}{" "}
                    <span>credits</span>
                  </span>
                </h1>
                <button
                  onClick={applyEnrichment}
                  className="w-full bg-blue-700 hover:bg-blue-800 text-white font-medium py-2 px-4 rounded-lg"
                >
                  Proceed to Enrich
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default EnrichModal;
