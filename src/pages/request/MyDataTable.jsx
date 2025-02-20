import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { enrichData, enrichDataDetails, requests } from '../../redux/home/action';
import { useNavigate, useParams } from 'react-router-dom';

function MyDataTable() {
const {key}=useParams();
  const data = useSelector((state) => state.homeReducer.requests.data); // Get data from Redux
  const dispatch = useDispatch();
  const navigate=useNavigate()
  const [selectedRequests, setSelectedRequests] = useState([]);

  // Define the columns for the DataTable
  const columns = [
    {
      name: 'Request ID',
      selector: (row) => row.request_id, // Access `request_id`
      sortable: true,
    },
    // {
    //   name: 'User ID',
    //   selector: (row) => row.user_id_fk, // Access `user_id_fk`
    //   sortable: true,
    // },
    {
      name: 'Name',
      selector: (row) => row.name, // Access `name`
      sortable: true,
    },
    // {
    //   name: 'Cost',
    //   selector: (row) => (row.datazapp_cost>0?'$ '+row.datazapp_cost:row.datazapp_cost)|| 'N/A', // Access `datazapp_cost`
    //   sortable: true,
    // },

    {
      name: 'Total Cost',
      selector: (row) => ("$"+row.total_cost), // Access `datazapp_cost`
      sortable: true,
    },
    // {
    //   name: '_Cost',
    //   selector: (row) => (row.melissa_cost>0?'$ '+row.melissa_cost:row.melissa_cost) || 'N/A', // Access `melissa_cost`
    //   sortable: true,
    // },
    {
      name: 'Total Data Request',
      selector: (row) => row.total_data_request, // Access `total_data_request`
      sortable: true,
    },
    {
      name: 'Enrichment Data',
      selector: (row) => row.enrichment_data || 'N/A', // Access `enrichment_data`
      sortable: true,
    },
    {
      name: 'Status',
      selector: (row) => <div className={`${row.status==='expired'?"rounded-full px-2 py-1 text-sm text-white bg-orange-500":row.status==='pending'?"rounded-full px-2 py-1 text-sm text-cyan-100 bg-cyan-500":row.status==="done"?"rounded-full px-2 py-1 text-sm text-green-100 bg-green-500":"bg-yellow-500 text-white rounded-full px-2 py-1 text-sm"} `}>{row.status==='expired'?"Low Credits":row.status==='done'?"Ready":row.status==='pending'?"Processing":"Not Found"}</div> || 'N/A', // Access `status`
      sortable: true,
    },
    {
      name: 'Action',
    selector: (row) => <button disabled={row.status==="pending"|| row.status==="failed"|| row.status==="expired"} onClick={()=>{  dispatch(enrichDataDetails({ request_id: row?.request_id }));navigate(`/project/requests/${key}/enrichdata/${row?.request_id}`)}} className={`${row.status==="expired"||row.status==="pending"|| row.status==="failed"?"bg-gray-200 text-white":"bg-blue-500 text-white hover:bg-blue-600"} px-4 py-1 rounded-md text-sm `} >View</button>  || 'N/A', // Access `enrichment_data`
      sortable: true,
    },

  ];

  // Handle row selection
  const handleSelectedRowsChange = ({ selectedRows }) => {
    setSelectedRequests(selectedRows); // Update state with selected rows
  };

  // Dispatch selected requests for enrichment
  const handleDispatch = () => {
    dispatch(enrichData({ Data: selectedRequests }));
    console.log('Dispatched Requests:', selectedRequests);
  };

  // Reverse the data array
  const reversedData = data ? [...data].reverse() : [];
    const handleRequest=()=>{
        dispatch(requests({secret_key:key}));
    }
  return (
    <div className="p-5">
      <div className="p-5 rounded-md border border-gray-300 bg-white shadow">
        <h1 className="text-lg font-semibold">Total Requests</h1>
        <h1 className="text-end text-3xl font-semibold text-blue-500">{data?.length || 0}</h1>
      </div>
      <div className="flex justify-between items-center mt-4 mb-2">
        <h1 className="text-lg font-semibold">Request Data</h1>
        <div className="flex gap-2 ">
          <button onClick={handleRequest} className='group hover:border p-2 hover:border-blue-500 hover:rounded-lg flex justify-between items-center transition delay-150 duration-300 ease-in-out' >
          <svg class="w-6 h-6 group-hover:text-blue-500 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.651 7.65a7.131 7.131 0 0 0-12.68 3.15M18.001 4v4h-4m-7.652 8.35a7.13 7.13 0 0 0 12.68-3.15M6 20v-4h4"/>
</svg>
<span className='mx-2 hidden group-hover:block transition delay-150 duration-300 ease-in-out group-hover:text-blue-500'> Refresh</span>

          </button>
          
        </div>
      </div>
      <DataTable
        columns={columns}
        data={reversedData} // Pass reversed data here
        pagination
        highlightOnHover
        pointerOnHover
        // selectableRows
         // Enable row selection
        onSelectedRowsChange={handleSelectedRowsChange} // Handle row selection
      />
    </div>
  );
}

export default MyDataTable;
