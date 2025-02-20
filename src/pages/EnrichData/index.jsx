import React, { useEffect, useState } from 'react'
import StateSearch from '../../components/layout/StateSearch'
import StateDropdown from '../../components/layout/StateSearch'
import MyDataTable from './MyDataTable'
import { useDispatch, useSelector } from 'react-redux'
import illu from '../../assets/svgs/undraw_undraw_undraw_undraw_undraw_undraw_undraw_undraw_undraw_search_engines_041x_-2-_cl95_o7o8_pigd_-1-_wbm3_t5p8_-1-_mt5l_-2-_dhxr_-2-_nmxe.svg'
import illuwating from '../../assets/svgs/undraw_time_management_re_tk5w.svg'
import Papa from 'papaparse'; 
import { enrichData } from '../../redux/home/action'
const EnrichData = () => {
const loading=useSelector((state)=>state.homeReducer?.enrichDataDetails?.loading)
return (
    <div className='bg-gray-100 p-5  h-screen flex flex-col '>
        {/* <StateSearch/> */}
    
<div>
{/* <div className='flex justify-start'>
         {
      jsonData?
      <div className='flex gap-x-2 border-2 p-2 rounded-lg '>
      <button className='bg-green-600 rounded-full text-sm text-white px-3 py-1' onClick={sendDataToApi}>Confirm</button>
      <button className='bg-rose-600 rounded-full text-sm text-white px-3 py-1' onClick={()=>{setJsonData(null);setCsvFile(null)}} >cancel</button>
      </div>
      :
      <div className='flex flex-col border rounded-lg p-2 border-gray-800 '>
        <label htmlFor="" className='mb-2'>Upload to Enrich Data</label>
      <input  type="file" placeholder='' onChange={handleFileChange} />
      </div>
    

      }
     
      
    </div> */}
</div>
    {
        loading?
        <div className='p-4'>
        <div className='animate-pulse'>
          <div className='flex flex-col space-y-4'>
            {[...Array(5)].map((_, index) => (
              <div key={index} className='flex justify-between items-center bg-gray-200 rounded-md p-4'>
                <div className='w-1/4 h-4 bg-gray-300 rounded'></div>
                <div className='w-1/4 h-4 bg-gray-300 rounded'></div>
                <div className='w-1/4 h-4 bg-gray-300 rounded'></div>
                <div className='w-1/4 h-4 bg-gray-300 rounded'></div>
              </div>
            ))}
          </div>
        </div>
      </div>:
   <MyDataTable/>
       
    }



   
    </div>
  )
}

export default EnrichData