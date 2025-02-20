import React, { useEffect, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useDispatch, useSelector } from "react-redux";
import { requests } from "../../redux/home/action";

function MyDataTable({ rowData, setSelectedData, selectedData }) {
  const dispatch = useDispatch(); // Initialize Redux dispatch
  const requestsData = useSelector((state) => state.homeReducer.requests.data);

  const [selectedRowCount, setSelectedRowCount] = useState(0); // State to track selected row count

  useEffect(() => {
    if (requestsData === null) {
      dispatch(requests());
    } else {
      console.log(requestsData);
    }
  }, [requestsData]);

  // Automatically generate column definitions with Multi Filter
  const columnDefs = rowData?.length
    ? [
        {
          headerName: "Select",
          checkboxSelection: true, // Add checkbox selection for each row
          headerCheckboxSelection: true, // Add checkbox in the header for select-all functionality
          headerCheckboxSelectionFilteredOnly: true, // Applies to filtered rows only
          width: 50, // Adjust the width of the checkbox column
        },
        ...Object.keys(rowData[0])?.map((key) => ({
          headerName: key.replace(/_/g, " "), // Replace underscores with spaces for readability
          field: key,
          sortable: true,
          resizable: true,
        })),
      ]
    : [];

  const onSelectionChanged = (params) => {
    const selectedNodes = params.api.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    const selectedIPs = selectedData.map((row) => ({ IP: row["IP Address"] })); // Extract 'IP Address' field
    console.log("Selected IPs:", selectedIPs);
    setSelectedData(selectedIPs);
    setSelectedRowCount(selectedData.length); // Update selected row count
  };

  return (
    <div>
      {
        selectedRowCount>0&&
        <div className="flex justify-start mt-3 ">
        <h2 className="bg-white p-2 rounded-lg shadow-md border border-gray-200">Selected Rows: {selectedRowCount}</h2> {/* Display selected row count */}
      </div>
      }
  
      <div className="ag-theme-alpine mt-3" style={{ height: "70vh", width: "100%" }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            sortable: true,
            resizable: true,
          }}
          pagination={true}
          paginationPageSize={10}
          rowSelection="multiple" // Enable multiple row selection
          domLayout="autoHeight" // Ensures that the grid adjusts its height properly
          suppressRowClickSelection={true} // Prevent row click from deselecting checkboxes
          onSelectionChanged={onSelectionChanged} // Handle selection change
        />
      </div>
    </div>
  );
}

export default MyDataTable;
