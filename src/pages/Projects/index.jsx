import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProject, getProjects } from '../../redux/projects/action';
import DataTableComponent from './DataTableComponent';
import AddProjectModal from './AddProjectModal';
import rolling from '../../assets/images/rolling.gif'
const Projects = () => {
  const data=useSelector((state)=>state.projectReducer.getProjects.data)
  const loading=useSelector((state)=>state.projectReducer.getProjects.loading)
  const filteredData = data ? data.filter(item => item.status === "unverify") : [];
  // const loading=true;

  const dispatch=useDispatch();
  const [selected, setSelected] = useState('');
  const [title, setTitle] = useState('');
  const [site_url, setSite_url] = useState('');
  const [verifyProjects, setVerifyProjects] = useState(0)
  const [unverifyProjects, setUnVerifyProjects] = useState(0)

  useEffect(() => {
    if(data){
      data.map((item)=>{
        return(
          item.status==="verify"?setVerifyProjects(verifyProjects+1):setUnVerifyProjects(unverifyProjects+1)
        )
      })
      
      console.log(data)
    }
    else{
      dispatch(getProjects())
    }
  }, [data])
  

  const submitData=()=>{
    dispatch(createProject({type:selected,title:title,site_url:site_url}))
  }
  return (
    <>
    {loading?<div className="bg-gray-100 p-5 h-[92vh] flex flex-col gap-y-2 justify-center items-center"><img className='w-16' src={rolling} alt="" /></div>:(
           filteredData&&filteredData?.length>0?
           <div className="bg-gray-100 p-5 h-[92vh] flex flex-col gap-y-2">
              <div className='flex flex-row justify-between gap-2 items-end'>
                 <div className='rounded-lg flex flex-col gap-5 w-1/4 border p-2 bg-green-200 text-green-700 border-green-200 '>

                  <h1 className='text-lg mx-2'>Unverified Projects</h1>
                  <h1 className='text-end font-semibold text-2xl mx-2'>{filteredData.length}</h1>

                 </div>
                 <AddProjectModal/>
              
               </div>
              
               <DataTableComponent/>
           </div>
         :
           <div className="bg-gray-100 h-[92vh] p-5  flex justify-center items-center gap-y-2">
               <div className='text-center'>
                 <h1 className='font-semibold text-2xl mb-2 '>
                   Setup Your First Project
                 </h1>
                 <p>
                   Enter the following details to setup your project
                 </p>
                 <div className='p-4 rounded-lg bg-blue-200 my-5'>
                 <div className='flex flex-col justify-start text-start gap-1 my-3'>
                   <label htmlFor="title">Project title</label>
                   <input className='p-2 rounded-lg' type="text" name='title' value={title} placeholder='Enter Project Title' onChange={(e)=>setTitle(e.target.value)} />
                 </div>
                 <div className='flex flex-col justify-start text-start gap-1 my-3'>
                   <label htmlFor="site_url">Site URL</label>
                   <input className='p-2 rounded-lg' type="text" name='site_url' placeholder='Enter Site Url' value={site_url} onChange={(e)=>setSite_url(e.target.value)} />
                 </div>
                 {/* <div className='flex flex-col justify-start text-start gap-1 my-3'>
                   <label htmlFor="">Site Type</label>
                   <input className='p-2 rounded-lg' type="text" placeholder='Enter Site Url' />
                 </div> */}
     <div className='flex flex-col justify-start text-start gap-1 my-3'>
       <label>Site Type</label>
       <div className='flex flex-row gap-2'>
           <label
             className={`flex items-center p-2 rounded-lg cursor-pointer border ${
               selected === 'code' ? 'border-blue-500' : 'border-gray-300'
             }`}
           >
             <input
               type="radio"
               name="siteType"
               value="code"
               className='mr-2 '
               onChange={() => setSelected('code')}
             />
             Custom Site
           </label>
           <label
             className={`flex items-center p-2 rounded-lg cursor-pointer border ${
               selected === 'wordpress' ? 'border-blue-500 ' : 'border-gray-200'
             }`}
           >
             <input
               type="radio"
               name="siteType"
               value="wordpress"
               className='mr-2 '
               onChange={() => setSelected('wordpress')}
             />
             WordPress Site
           </label>
         </div>
     </div>
                 <div className='flex flex-col justify-start text-start gap-1 my-3'>
                   <button className='bg-blue-600 hover:bg-blue-700 py-2 text-white rounded-lg' onClick={submitData}>Next</button>
                 </div>
                 </div>
               </div>
           </div>
    )
 

    }
 
   
    </>
  );
};

export default Projects;
