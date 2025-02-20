import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTableData } from "../../redux/home/action";

const Filter = ({ setTable, jsonData }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    setTable(jsonData);
  }, [jsonData]);

  const [selectedStates, setSelectedStates] = useState([]);
  const [selectedZipCodes, setSelectedZipCodes] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleStateSelection = (state) => {
    const updatedStates = selectedStates.includes(state)
      ? selectedStates.filter((item) => item !== state)
      : [...selectedStates, state];
    setSelectedStates(updatedStates);

    // Clear zip code selection when states change
    setSelectedZipCodes([]);
  };

  const toggleZipCodeSelection = (zip) => {
    const updatedZipCodes = selectedZipCodes.includes(zip)
      ? selectedZipCodes.filter((item) => item !== zip)
      : [...selectedZipCodes, zip];
    setSelectedZipCodes(updatedZipCodes);
  };

  const applyFilters = () => {
    let filtered = jsonData;
    if (selectedStates.length > 0) {
      filtered = filtered.filter((item) => selectedStates.includes(item.IPState));
    }
    if (selectedZipCodes.length > 0) {
      filtered = filtered.filter((item) => selectedZipCodes.includes(item.IPZipCode));
    }

    dispatch(setTableData(filtered));
    setTable(filtered); // Update the table in the parent
    console.log("filtered", filtered);
    toggleModal(); // Close the modal
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const clearFilters = () => {
    setSelectedStates([]);
    setSelectedZipCodes([]);

    setTable(jsonData);
    dispatch(setTableData(jsonData));
    toggleModal();
  };

  // Calculate state frequencies
  const stateFrequency = jsonData.reduce((acc, item) => {
    acc[item.IPState] = (acc[item.IPState] || 0) + 1;
    return acc;
  }, {});

  // Calculate zip code frequencies based on selected states
  const zipCodeFrequency = selectedStates.length
    ? jsonData
        .filter((item) => selectedStates.includes(item.IPState))
        .reduce((acc, item) => {
          acc[item.IPZipCode] = (acc[item.IPZipCode] || 0) + 1;
          return acc;
        }, {})
    : {};

  const filteredZipCodes = selectedStates.length
    ? [...new Set(jsonData
        ?.filter((item) => selectedStates.includes(item.IPState))
        ?.map((item) => item.IPZipCode))]
    : [];

  return (
    <div>
      <div className="flex justify-end mt-2">
        <button
          onClick={toggleModal}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
        >
          Filter
        </button>
      </div>
      {isOpen && (
        <div
        //   id="default-modal"
          className="absolute  z-50 flex justify-end items-start  right-0 "
        >
          <div className="relative p-4 max-w-2xl ">
            <div className="relative bg-white rounded-lg shadow-xl  ">
              <div className="flex items-center justify-between p-4 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">Filter</h3>
                <button
                  onClick={toggleModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
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
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <div className="p-4 space-y-2">
                {/* By State Section */}
                <div className="flex justify-between">
                  <h1>By State</h1>
                  <button onClick={() => clearFilters()}>Clear</button>
                </div>
                <div
  className="w-full grid  grid-cols-2 flex-wrap gap-2  border p-2 rounded-lg slim-scrollbar"
>
  {[...new Set(jsonData?.map((item) => item.IPState))]?.map((state, index) => (
    <label
      key={index}
      className="flex cursor-pointer text-nowrap items-center gap-4 rounded-lg border border-gray-200 py-2 px-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
      htmlFor={`state-${index}`}
    >
      <div className="flex items-center">
        <input
          id={`state-${index}`}
          className="size-4 rounded border-gray-300"
          type="checkbox"
          checked={selectedStates.includes(state)}
          onChange={() => toggleStateSelection(state)}
        />
      </div>
      <div>
        <h1 className="font-bold text-gray-900">
          {state}
        </h1>
        <h1 className="text-sm text-gray-500"><strong className="text-black">{stateFrequency[state] || 0}</strong>  {`${stateFrequency[state] >1?"IP  Address are":"IP  Address is "}available `}</h1>
      </div>
    </label>
  ))}
</div>

{
    selectedStates.length>0&&<>
     {/* By Zip Code Section */}
     <div className="flex justify-between pt-5">
                  <h1>By ZipCode</h1>
                  <button onClick={() => setSelectedZipCodes([])}>Clear</button>
                </div>
                <div
  className="w-full flex flex-col gap-y-2 max-h-[20vh] overflow-y-scroll border p-2 rounded-lg slim-scrollbar"
>
  {filteredZipCodes.map((zip, index) => (
    <label
      key={index}
      className="flex cursor-pointer items-center gap-4 rounded-lg border border-gray-200 p-4 transition hover:bg-gray-50 has-[:checked]:bg-blue-50"
      htmlFor={`zip-${index}`}
    >
      <div className="flex items-center gap-10">
        <input
          id={`zip-${index}`}
          className="size-4 rounded border-gray-300"
          type="checkbox"
          checked={selectedZipCodes.includes(zip)}
          onChange={() => toggleZipCodeSelection(zip)}
        />
        <div>
        <h1 className="font-bold text-gray-900">
        {zip}
        </h1>
        <h1 className="text-sm text-gray-500"><strong className="text-black">{zipCodeFrequency[zip] || 0}</strong> {`${zipCodeFrequency[zip] >1?"IP  Address are":"IP  Address is "}available `}</h1>
      </div>
      </div>
    </label>
  ))}
</div>

    </>
}
               
              </div>
              <div className="flex items-center p-4 border-t border-gray-200 rounded-b">
                <button
                  onClick={applyFilters}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Apply
                </button>
                <button
                  onClick={clearFilters}
                  type="button"
                  className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
