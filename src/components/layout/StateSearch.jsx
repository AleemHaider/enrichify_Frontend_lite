import React, { useState, useEffect } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import { useDispatch, useSelector } from 'react-redux';
import { enrichData, getSearch, resetSearch } from '../../redux/home/action';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Papa from 'papaparse'; // Import PapaParse for CSV parsing
import axios from 'axios';

const StateSearch = () => {

  const [country, setCountry] = useState('United States');
  const [region, setRegion] = useState('');
  const [keyword, setKeyword] = useState('');

  const data = useSelector((state) => state.homeReducer.getSearch.data);
  const dispatch = useDispatch();

  const selectRegion = (val) => {
    setRegion(val);
  };

  useEffect(() => {
    if (country === 'United States') {
      setRegion(''); // Reset or set a default region if needed
    }
  }, [country]);

  const handleSearch = () => {
    if (!region && !keyword) {
      toast.error('Make sure region and keyword is selected.');
    } else if (!region) {
      toast.error('Make sure region is selected');
    } else if (!keyword) {
      toast.error('Make sure Keyword is added');
    } else {
      dispatch(getSearch({ geo: region, keyword: keyword }));
    }
  };





  const [csvFile, setCsvFile] = useState(null); // State to store the uploaded CSV file
  const [jsonData, setJsonData] = useState(null); // State to store the converted JSON data

  // Function to send data to API
  const sendDataToApi = async () => {
  
    dispatch(enrichData({Data:jsonData}))
  };

useEffect(() => {
  console.log(jsonData)
}, [jsonData])


  return (
    <div className='w-full flex flex-col gap-y-2 sm:flex sm:flex-row gap-x-2'>
      <RegionDropdown
        country={country}
        value={region}
        className='w-full sm:w-1/2'
        defaultOptionLabel='Select Geographic Location'
        disabled={data?.length > 0 && data !== 'empty'}
        onChange={selectRegion}
        style={{ padding: '5px 10px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '16px' }} 
      />
      <select name="" id="" className='p-1 border border-[#ccc] rounded-sm'>
        <option disabled>Select time frequency</option>
        <option value="">24 hours</option>
        <option value="">48 hours</option>
        <option value="">72 hours</option>
      </select>

      <input 
        disabled={data?.length > 0 && data !== 'empty'}  
        className='py-1 px-3 rounded-sm border border-[#ccc] w-full ' 
        type="text" 
        placeholder='Enter Keyword' 
        value={keyword} 
        onChange={(e) => setKeyword(e.target.value)} 
      />
      {
        data && data.length > 0 && data !== 'empty' ?
        <button 
          className='py-1 px-6 bg-rose-600 text-nowrap text-sm text-white rounded-full hover:bg-rose-700' 
          onClick={() => { 
            dispatch(resetSearch()); 
            setRegion(''); 
            setKeyword(''); 
          }}
        >
          Clear Search
        </button>
        :
        <button 
          className='py-1 px-6 bg-blue-500 text-sm text-white rounded-full hover:bg-blue-600' 
          onClick={handleSearch}
        >
          Search
        </button>
      }
         {/* <div className='flex'>
         {
      jsonData?
      <div className='flex gap-x-2 border-2 p-2 rounded-lg '>
      <button className='bg-green-600 rounded-full text-sm text-white px-3 py-1' onClick={sendDataToApi}>Confirm</button>
      <button className='bg-rose-600 rounded-full text-sm text-white px-3 py-1' onClick={()=>{setJsonData(null);setCsvFile(null)}} >cancel</button>
      </div>
      :
      <div>
         {jsonData && (
        <div>
          <h3>Preview of JSON Data</h3>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </div>
      )}
      <input className='bg-green-600 rounded-full text-sm text-white px-3 py-2' type="file" placeholder='' onChange={handleFileChange} />


      </div>
    

      }
     
      
    </div> */}
      <ToastContainer />
    </div>
  );
}

export default StateSearch;
