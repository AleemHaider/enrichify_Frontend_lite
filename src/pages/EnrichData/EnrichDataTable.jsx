// import React, { useEffect, useState } from 'react';
// import DataTable from 'react-data-table-component';
// import { useSelector } from 'react-redux';

// function MyDataTable() {
//   const dataraw = useSelector((state) => state.homeReducer.enrichData.data);
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     if (dataraw && dataraw.ResponseDetail && dataraw.ResponseDetail.Data) {
//       setData(dataraw.ResponseDetail.Data);
//     }
//   }, [dataraw]);

//   const columns = [
//     { name: 'IP Address', selector: row => row.IP || 'N/A', sortable: true },
//     { name: 'IP Country', selector: row => row.IPCountry || 'N/A', sortable: true },
//     { name: 'IP State', selector: row => row.IPState || 'N/A', sortable: true },
//     { name: 'IP City', selector: row => row.IPCity || 'N/A', sortable: true },
//     { name: 'IP ZipCode', selector: row => row.IPZipCode || 'N/A', sortable: true },
//     { name: 'IP Latitude', selector: row => row.IPLatitude || 'N/A', sortable: true },
//     { name: 'IP Longitude', selector: row => row.IPLongitude || 'N/A', sortable: true },
//     { name: 'ISP', selector: row => row.ISP || 'N/A', sortable: true },
//     { name: 'Organization', selector: row => row.Organization || 'N/A', sortable: true },
//     { name: 'IP Type', selector: row => row.IPType || 'N/A', sortable: true },
//     { name: 'First Name', selector: row => row.FirstName || 'N/A', sortable: true },
//     { name: 'Last Name', selector: row => row.LastName || 'N/A', sortable: true },
//     { name: 'Address', selector: row => row.Address || 'N/A', sortable: true },
//     { name: 'Address 2', selector: row => row.Address2 || 'N/A', sortable: true },
//     { name: 'Email', selector: row => row.Email || 'N/A', sortable: true },
//     { name: 'Cell', selector: row => row.Cell || 'N/A', sortable: true },
//     { name: 'Cell DNC', selector: row => row.Cell_DNC || 'N/A', sortable: true },
//     { name: 'Phone', selector: row => row.Phone || 'N/A', sortable: true },
//     { name: 'Phone DNC', selector: row => row.Phone_DNC || 'N/A', sortable: true },
//     { name: 'State', selector: row => row.State || 'N/A', sortable: true },
//     { name: 'City', selector: row => row.City || 'N/A', sortable: true },
//     { name: 'Country', selector: row => row.Country || 'N/A', sortable: true },
//     { name: 'ZipCode', selector: row => row.ZipCode || 'N/A', sortable: true },
//     { name: 'Is Proxy', selector: row => row.IsProxy || 'N/A', sortable: true },
//     { name: 'Last Seen Date', selector: row => row.LastSeenDate || 'N/A', sortable: true },
//     { name: 'Address Status', selector: row => row.AddressStatus || 'N/A', sortable: true },
//     { name: 'Address Type', selector: row => row.AddressType || 'N/A', sortable: true },
//     { name: 'Residential Address Flag', selector: row => row.ResidentialAddressFlag || 'N/A', sortable: true },
//     { name: 'Confidence', selector: row => row.Confidence || 'N/A', sortable: true },
//   ];

//   const customStyles = {
//     rows: {
//       style: {
//         whiteSpace: 'nowrap', // Prevent text wrapping
//       },
//     },
//     headCells: {
//       style: {
//         fontSize: '14px',
//         fontWeight: 'bold',
//         whiteSpace: 'nowrap',
//       },
//     },
//     cells: {
//       style: {
//         whiteSpace: 'nowrap',
//         overflow: 'hidden',
//         textOverflow: 'ellipsis',
//       },
//     },
//   };

//   return (
//     <div className="overflow-x-auto">
//       <div className="flex justify-between items-center mt-4 mb-2">
//         <h1 className="text-lg font-semibold">Enriched Data</h1>
//       </div>
//       <DataTable
//         columns={columns}
//         data={data}
//         pagination
//         highlightOnHover
//         pointerOnHover
//         customStyles={customStyles} // Apply custom styles
//       />
//     </div>
//   );
// }

// export default MyDataTable;





import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useSelector } from 'react-redux';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function EnrichDataTable() {
  const dataraw = useSelector((state) => state.homeReducer.enrichData.data);
  const [rowData, setRowData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    if (dataraw && dataraw.ResponseDetail && dataraw.ResponseDetail.Data) {
      setRowData(dataraw.ResponseDetail.Data);
    }
  }, [dataraw]);

  const columnDefs = [
    { headerName: 'First Name', field: 'd_first_name', sortable: true, resizable: true },
    { headerName: 'Last Name', field: 'd_last_name', sortable: true, resizable: true },
    { headerName: 'Address', field: 'd_address', sortable: true, resizable: true },
    { headerName: 'Address 2', field: 'd_address_2', sortable: true, resizable: true },
    { headerName: 'Email', field: 'd_email', sortable: true, resizable: true },
    { headerName: 'Cell', field: 'd_cell', sortable: true, resizable: true },
    { headerName: 'Cell DNC', field: 'd_cell_dnc', sortable: true, resizable: true },
    { headerName: 'Phone', field: 'd_phone', sortable: true, resizable: true },
    { headerName: 'Phone DNC', field: 'd_phone_dnc', sortable: true, resizable: true },
    { headerName: 'State', field: 'd_state', sortable: true, resizable: true },
    { headerName: 'City', field: 'd_city', sortable: true, resizable: true },
    { headerName: 'Country', field: 'd_country', sortable: true, resizable: true },
    { headerName: 'Zip Code', field: 'd_zip_code', sortable: true, resizable: true },
    { headerName: 'IP', field: 'd_ip', sortable: true, resizable: true },
    { headerName: 'IP Country', field: 'd_ip_country', sortable: true, resizable: true },
    { headerName: 'IP State', field: 'd_ip_state', sortable: true, resizable: true },
    { headerName: 'IP City', field: 'd_ip_city', sortable: true, resizable: true },
    { headerName: 'IP Zip Code', field: 'd_ip_zip_code', sortable: true, resizable: true },
    { headerName: 'IP Latitude', field: 'd_ip_latitude', sortable: true, resizable: true },
    { headerName: 'IP Longitude', field: 'd_ip_longitude', sortable: true, resizable: true },
    { headerName: 'ISP', field: 'd_isp', sortable: true, resizable: true },
    { headerName: 'Organization', field: 'd_organization', sortable: true, resizable: true },
    { headerName: 'IP Type', field: 'd_ip_type', sortable: true, resizable: true },
    { headerName: 'Is Proxy', field: 'd_is_proxy', sortable: true, resizable: true },
    { headerName: 'Last Seen Date', field: 'd_last_seen_date', sortable: true, resizable: true },
    { headerName: 'Address Status', field: 'd_address_status', sortable: true, resizable: true },
    { headerName: 'Address Type', field: 'd_address_type', sortable: true, resizable: true },
    { headerName: 'Residential Address Flag', field: 'd_residential_address_flag', sortable: true, resizable: true },
    { headerName: 'Confidence', field: 'd_confidence', sortable: true, resizable: true },
    { headerName: '_Full Name', field: 'm_name_full', sortable: true, resizable: true },
    { headerName: '_First Name', field: 'm_name_first', sortable: true, resizable: true },
    { headerName: '_Middle Name', field: 'm_name_middle', sortable: true, resizable: true },
    { headerName: '_Last Name', field: 'm_name_last', sortable: true, resizable: true },
    { headerName: '_Organization', field: 'm_organization', sortable: true, resizable: true },
    { headerName: '_Address Line 1', field: 'm_address_line_1', sortable: true, resizable: true },
    { headerName: '_Address Line 2', field: 'm_address_line_2', sortable: true, resizable: true },
    { headerName: '_City', field: 'm_city', sortable: true, resizable: true },
    { headerName: '_State', field: 'm_state', sortable: true, resizable: true },
    { headerName: '_Postal Code', field: 'm_postal_code', sortable: true, resizable: true },
    { headerName: '_Latitude', field: 'm_latitude', sortable: true, resizable: true },
    { headerName: '_Longitude', field: 'm_longitude', sortable: true, resizable: true },
    { headerName: '_Phone Number', field: 'm_phone_number', sortable: true, resizable: true },
    { headerName: '_Email Address', field: 'm_email_address', sortable: true, resizable: true },
    { headerName: '_IP Address', field: 'm_ip_address', sortable: true, resizable: true },
    { headerName: '_ISP Name', field: 'm_isp_name', sortable: true, resizable: true },
    { headerName: '_Domain Name', field: 'm_domain_name', sortable: true, resizable: true },
    { headerName: '_LinkedIn Data', field: 'linkedin_data', sortable: true, resizable: true },

  ];
  

  const onSelectionChanged = (params) => {
    const selectedNodes = params.api.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    setSelectedRows(selectedData);
    console.log('Selected Rows:', selectedData);
  };

  return (
    <div className="ag-theme-alpine mt-3" style={{ height: '70vh', width: '100%' }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefs}
        defaultColDef={{
          sortable: true,
          resizable: true,
        }}
        pagination={true}
        paginationPageSize={10}
        rowSelection="multiple" // Enable row selection
        onSelectionChanged={onSelectionChanged} // Handle selection change
      />
      <div className="mt-4">
        <h2 className="font-semibold">Selected Rows:</h2>
        <pre>{JSON.stringify(selectedRows, null, 2)}</pre>
      </div>
    </div>
  );
}

export default EnrichDataTable;

