import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { useDispatch, useSelector } from 'react-redux';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useParams } from 'react-router-dom';
import { enrichDataDetails } from '../../redux/home/action';

function MyDataTable() {
  const rowData = useSelector((state) => state.homeReducer.enrichDataDetails.data);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [filteredData, setFilteredData] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [columnDefs, setColumnDefs] = useState([]);

  useEffect(() => {
    if (rowData) {
      applyFilter(filterType);
      generateColumnDefs(rowData);
    }
  }, [rowData, filterType]);

  const applyFilter = (filter) => {
    if (filter === 'all') {
      setFilteredData(rowData);
    } else if (filter === 'enrich') {
      setFilteredData(rowData.filter((row) => row.m_name_first !== ''));
    }
  };

  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setFilterType(filterValue);
    applyFilter(filterValue);
  };

  const generateColumnDefs = (data) => {
    if (data.length === 0) return;

    const firstRow = data[0];
    const columns = Object.keys(firstRow).map((key) => ({
      headerName: key.replace(/_/g, ' ').toUpperCase(),
      field: key,
      sortable: true,
      resizable: true,
      valueFormatter: (params) => params.value || 'N/A',
    }));

    setColumnDefs(columns);
  };

  const totalRecords = rowData ? rowData.length : 0;
  const nullOrEmptyFirstNameCount = rowData
    ? rowData.filter((row) => row.m_name_first !== "").length
    : 0;

  useEffect(() => {
    if (!rowData) {
      dispatch(enrichDataDetails({ request_id: id }));
    }
  }, [rowData, dispatch, id]);

  const downloadCSV = () => {
    if (!rowData || rowData.length === 0) {
      alert('No data available to download!');
      return;
    }

    const headers = columnDefs.map((col) => col.headerName).join(',');
    const rows = filteredData?.map((row) =>
      columnDefs.map((col) => row[col.field] || 'N/A').join(',')
    );
    const csvContent = [headers, ...rows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.csv';
    link.click();
  };

  return (
    <div>
      <div className='w-full flex justify-between items-center gap-x-2'>
        <div className="mb-3 border rounded py-3 px-5 border-blue-500 bg-blue-200 w-full">
          <p className=' text-lg '>Total Records:</p>
          <p className='text-end text-2xl font-bold'>{totalRecords < 10 ? "0" + totalRecords : totalRecords}</p>
        </div>
        <div className="mb-3 border rounded py-3 px-5 border-green-500 bg-green-200 w-full">
          <p className='text-lg '>Enriched Records</p>
          <p className='text-end text-2xl font-bold'>{nullOrEmptyFirstNameCount < 10 ? "0" + nullOrEmptyFirstNameCount : nullOrEmptyFirstNameCount}</p>
        </div>
      </div>
      <div className='w-full flex justify-between mb-3'>
        <select
          value={filterType}
          onChange={handleFilterChange}
          className="border rounded px-2 py-1"
        >
          <option value="all">All</option>
          <option value="enrich">Enrich Data</option>
        </select>
        {filteredData?.length > 0 &&
          <button
            onClick={downloadCSV}
            className="bg-green-500 px-4 py-1 rounded text-white hover:bg-green-600"
          >
            Download CSV
          </button>
        }
      </div>
      <div className="ag-theme-alpine" style={{ height: '70vh', width: '100%' }}>
        <AgGridReact
          rowData={filteredData}
          columnDefs={columnDefs}
          defaultColDef={{ sortable: true, resizable: true }}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  );
}

export default MyDataTable;