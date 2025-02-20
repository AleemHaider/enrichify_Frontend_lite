import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enrichData, requests } from "../../redux/home/action";
import { useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";

const EnrichModal = ({ selectedData }) => {
  const recent = useSelector((state) => state.homeReducer.requests.data);
  const last5Records = recent ? recent.slice(-5) : [];
  const reverseArray=last5Records.reverse();
  useEffect(() => {
    if (recent === null) {
      dispatch(requests());
    }
    console.log("recent", recent);
  }, [recent]);

  const columns = [
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Cost",
      selector: (row) => `$${row.melissa_cost}`,
      sortable: true,
    },
    {
      name: "Total Data",
      selector: (row) => row.total_data_request,
      sortable: true,
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        fontWeight: "bold", // Make header cells bold
        fontSize: "14px", // Optional: Increase font size
        color: "#333", // Optional: Set header text color
        backgroundColor: "#f1f1f1", // Optional: Add background color to the header
      },
    },
  };

  console.log(recent);
  const [stage, setStage] = useState("first");
  console.log(selectedData);
  const [isOpen, setIsOpen] = useState(false);
  const enrichedData = useSelector((state) => state.homeReducer.enrichData.data);
  console.log("Selected Data before deduplication:", selectedData);

  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUniqueIPs = (data) => {
    const uniqueIPs = new Set();
    return data.filter((item) => {
      if (!uniqueIPs.has(item.IP)) {
        uniqueIPs.add(item.IP);
        return true;
      }
      return false;
    });
  };

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const applyEnrichment = () => {
    if (inputValue !== "" && selectedData) {
      const uniqueData = getUniqueIPs(selectedData);
      console.log("Unique Data:", uniqueData);
      dispatch(enrichData({ name: inputValue, Data: uniqueData }));
      toggleModal();
      navigate("/requests");
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
      ) : (
        isOpen &&
        stage === "second" && (
          <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div className="relative p-4 max-w-md w-full bg-white rounded-lg shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Data Enrichment</h3>
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
                <div className="border p-2">
                  <h1 className="font-bold mb-1">Recent Enrichments</h1>
                  <hr />
                  <DataTable
                    columns={columns}
                    data={reverseArray}
                    customStyles={customStyles} // Apply custom styles
                    highlightOnHover
                    responsive
                  />
                </div>
                <h1 className="my-2 border p-2 rounded border-green-500 ">
                  Estimated Cost for{" "}
                  <span className="font-semibold">
                    {selectedData?.length + " record"}
                  </span>{" "}
                  is{" "}
                  <span className="text-green-500 font-bold">
                    ${(selectedData?.length * 0.02).toFixed(2)}
                     <span> credits</span>
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
