import React from 'react'
import StateSearch from '../../components/layout/StateSearch'
import StateDropdown from '../../components/layout/StateSearch'
import MyDataTable from './MyDataTable'
import { useSelector } from 'react-redux'
import illu from '../../assets/svgs/undraw_undraw_undraw_undraw_undraw_undraw_undraw_undraw_undraw_search_engines_041x_-2-_cl95_o7o8_pigd_-1-_wbm3_t5p8_-1-_mt5l_-2-_dhxr_-2-_nmxe.svg'
import illuwating from '../../assets/svgs/undraw_time_management_re_tk5w.svg'

const Home = () => {
  const data= useSelector((state)=>state.homeReducer.getSearch.data)
  const loading=useSelector((state)=>state.homeReducer?.getSearch?.loading)


  
return (
    <div className='bg-gray-100 p-5  h-screen flex flex-col gap-y-2'>
        {/* <StateSearch/> */}
    
    <StateDropdown/>
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
      </div>:<>
        {data!=='empty'&&
             data&&data.length>0&&data!=='empty'?
             <MyDataTable/>:
             data==='empty'?
             <div className='mt-5 p-10 bg-white rounded-lg flex flex-col justify-center items-center gap-y-2'>
                <img className='w-96' src={illu} alt="" />
                 <h1 className='text-xl text-rose-500 mt-2  '>There are no results to Show</h1>
                 <h1 className=' text-gray-600 text-center sm:text-start '>Select Geographic Location, time frequency and Enter Keywords on which you want results</h1>
             </div>:
             <div className='mt-5 p-10 bg-white rounded-lg flex flex-col justify-center items-center gap-y-2'>
             <img className='w-80' src={illuwating} alt="" />
              {/* <h1 className='text-xl text-rose-500 mt-2  '>There are no results to Show</h1> */}
              <h1 className=' text-gray-600 text-center sm:text-start '>We’re currently working on your inquiry and will notify you as soon as the results are available.</h1>
              <h1 className=' text-blue-600 text-center sm:text-start '>Thank you for your patience!</h1>
          </div>
        }
        </>
       
    }
   
    </div>
  )
}

export default Home