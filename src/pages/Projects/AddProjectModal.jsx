import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enrichData } from "../../redux/home/action";
import { useNavigate } from "react-router-dom";
import { createProject } from "../../redux/projects/action";

const AddProjectModal = () => {
  const toggleModal = () => {
    setIsOpen(!isOpen);
  };
  const [isOpen, setIsOpen] = useState(false);
  const dispatch=useDispatch();
  const [selected, setSelected] = useState('');
  const [title, setTitle] = useState('');
  const [site_url, setSite_url] = useState('');
const submitData=()=>{
    dispatch(createProject({type:selected,title:title,site_url:site_url}))
    toggleModal();
  }

  return (
    <div>
      <div className="flex justify-end mt-2">
        <button
          onClick={toggleModal}
          className="block text-white  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          type="button"
        >
          Add Project
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 max-w-md w-full bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Add New Project</h3>
              <button
                onClick={toggleModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
              >
                <svg
                  className="w-3 h-3"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
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
      )}
    </div>
  );
};

export default AddProjectModal;
