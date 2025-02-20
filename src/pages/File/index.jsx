import React, { useEffect, useState } from 'react';
import MyDataTable from './MyDataTable';
import { useDispatch, useSelector } from 'react-redux';
import Papa from 'papaparse';
import illu from '../../assets/svgs/undraw_undraw_undraw_undraw_undraw_undraw_undraw_undraw_undraw_search_engines_041x_-2-_cl95_o7o8_pigd_-1-_wbm3_t5p8_-1-_mt5l_-2-_dhxr_-2-_nmxe copy.svg';
import illuwating from '../../assets/svgs/undraw_time_management_re_tk5w.svg';
import Filter from '../../components/ui/FilterV2';
import EnrichModal from '../../components/ui/EnrichModal';
import { useNavigate } from 'react-router-dom';

const File = () => {
  const [table, setTable] = useState([])
  const [selectedData, setSelectedData] = useState()
  const dataraw = useSelector((state) => state.homeReducer.enrichData.data);
  const loading = useSelector((state) => state.homeReducer?.enrichData?.loading);
  const dispatch = useDispatch();
const navigate=useNavigate()  
  const [data, setData] = useState([]);
  const [csvFile, setCsvFile] = useState(null);
  const [jsonData, setJsonData] = useState(null);

  // Parse CSV file to JSON
  const parseCSV = (file) => {
    Papa.parse(file, {
      header: true, // Use the first row as the keys
      skipEmptyLines: true, // Skip empty lines
      complete: (result) => {
        console.log("Parsed CSV Data:", result.data);
        setJsonData(result.data); // Store parsed JSON data
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
      },
    });
  };

  // Handle file change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCsvFile(file);
      parseCSV(file); // Parse the uploaded CSV file
    }
  };

  useEffect(() => {
    console.log("table",table)
  }, [table])
  

  return (
    <div className="bg-gray-100 p-5 h-screen flex flex-col">
      <div className="flex flex-col border rounded-lg p-2 border-gray-800">
        <label htmlFor="file-upload" className="mb-2">
          Upload to Enrich Data
        </label>
        <input type="file" id="file-upload" onChange={handleFileChange} />
      </div>
      {
        jsonData&&
        <div className='flex justify-between items-center mt-2'>
          <EnrichModal selectedData={selectedData}/>
        <Filter table={table} setTable={setTable}  jsonData={jsonData} />
      </div>
      }
   

      {
      // loading ? (
      //   <div className="p-4">
      //     <div className="animate-pulse">
      //       <div className="flex flex-col space-y-4">
      //         {[...Array(5)].map((_, index) => (
      //           <div key={index} className="flex justify-between items-center bg-gray-200 rounded-md p-4">
      //             <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
      //             <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
      //             <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
      //             <div className="w-1/4 h-4 bg-gray-300 rounded"></div>
      //           </div>
      //         ))}
      //       </div>
      //     </div>
      //   </div>
      // ) : 
      table ? (
        <MyDataTable rowData={table} selectedData={selectedData} setSelectedData={setSelectedData} /> // Pass parsed JSON data to the DataTable
      ) : (
        <div className="mt-5 p-10 bg-white rounded-lg flex flex-col justify-center items-center gap-y-2">
          <img className="w-96" src={illu} alt="No data illustration" />
          <h1 className="text-xl text-rose-500 mt-2">There are no results to Show</h1>
          <h1 className="text-gray-600 text-center sm:text-start">
            Select Geographic Location, time frequency, and Enter Keywords on which you want results
          </h1>
        </div>
      )}
    </div>
  );
};

export default File;
