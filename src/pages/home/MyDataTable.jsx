import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useDispatch, useSelector } from 'react-redux';
import { enrichData } from '../../redux/home/action';
import EnrichModal from '../../components/ui/EnrichModal';

// Define the columns




function MyDataTable() {
  const data= useSelector((state)=>state.homeReducer.getSearch.data)
  const dispatch = useDispatch();
  const [selectedIPs, setSelectedIPs] = useState([]);
  const columns = [
    {
      name: 'IP Address',
      selector: row => row.ip_address,
      sortable: true,
    },
    {
      name: 'Google ID',
      selector: row => row.google_id,
      sortable: true,
    },
    {
      name: 'First Name',
      selector: row => row.first_name,
      sortable: true,
    },
    {
      name: 'Last Name',
      selector: row => row.last_name,
      sortable: true,
    },
    {
      name: 'Email',
      selector: row => row.email,
      sortable: true,
    },
    {
      name: 'Google Keyword',
      selector: row => row.google_keyword,
      sortable: true,
    },
    {
      name: 'GEO',
      selector: row => row.geo,
      sortable: true,
    },
  ];

  // const data = [
  //   {
  //     id: 1,
  //     ipAddress: '192.168.1.1',
  //     googleId: '123456789',
  //     firstName: 'John',
  //     lastName: 'Doe',
  //     email: 'john.doe@example.com',
  //     googleKeyword: 'React table',
  //     geo: 'USA',
  //   },
  //   {
  //     id: 2,
  //     ipAddress: '192.168.1.2',
  //     googleId: '987654321',
  //     firstName: 'Jane',
  //     lastName: 'Smith',
  //     email: 'jane.smith@example.com',
  //     googleKeyword: 'JavaScript',
  //     geo: 'Canada',
  //   },
  //   // Add more rows as needed
  // ];
  
  // Function to convert data to CSV format
  const handleSelectedRowsChange = ({ selectedRows }) => {
    const ips = selectedRows.map((row) =>{return{ip:row.ip_address}} ); // Extract IP Addresses
    setSelectedIPs(ips); // Update state with selected IPs
  };
  const handleDispatch = () => {
    dispatch(enrichData({Data:selectedIPs}))
    console.log('Dispatched IPs:', selectedIPs);
  };
  const convertToCSV = (array) => {
    const header = Object.keys(array[0]).join(',') + '\n';
    const rows = array.map(row => Object.values(row).join(',')).join('\n');
    return header + rows;
  };
  
  // Function to trigger the download
  const downloadCSV = () => {
    const csvData = convertToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  
    // Get current date and time
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    const formattedTime = `${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}-${now.getSeconds().toString().padStart(2, '0')}`;
    const filename = `user_data_${formattedDate}_${formattedTime}.csv`;
  
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename); // Use the formatted filename
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };



  console.log(data);
  return (
    
    <div className=''>
      <div className=' p-5 rounded-md border-2 border-blue-500'>
        <h1 className='text-lg font-semibolds'>Total Results</h1>
        <h1 className='text-end text-3xl font-semibold text-blue-500'>{data?.length}</h1>
      </div>
      <div className="flex justify-between items-center mt-4 mb-2">
        <h1 className='text-lg font-semibold'>User Data</h1>
        <div className='flex gap-2'>
        <button 
          className="border-blue-500 text-sm text-blue-500 border px-2 py-1 rounded-lg hover:bg-blue-600 hover:text-white"
          onClick={downloadCSV}
        >
          Export to CSV
        </button>
        {
          selectedIPs.length>0&&
          <EnrichModal selectedData={selectedIPs}/>
}
        </div>
        

     
      </div>
      <DataTable
        columns={columns}
        data={data}
        pagination
        highlightOnHover
        pointerOnHover
        selectableRows // Enable row selection
        onSelectedRowsChange={handleSelectedRowsChange} // Handle row selection
      />

    </div>
  );
}

export default MyDataTable;
