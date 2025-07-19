import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTemplate, getTemplates } from '../../redux/template/action'
import Editor from './Editor'
import { useParams } from 'react-router-dom'
// import svg from '../../assets/svgs/undraw_designer_girl_re_h54c.svg'
// import deleteIcon from '../../assets/svgs/delete-svgrepo-com.svg'

const Templates = () => {
    const [id, setId] = useState()
    const {key}=useParams()
    const [editor, setEditor] = useState(false)
    const dispatch=useDispatch()
    const data=useSelector((state)=>state?.templateReducer?.getTemplates?.data)
    const setLoading = useSelector((state) => state.templateReducer?.setTemplate?.loading);
    const updateLoading = useSelector((state) => state.templateReducer?.updateTemplate?.loading);
     useEffect(() => {
    if(data==null){
        dispatch(getTemplates({secret_key:key}));
        }
        console.log(data)
        }, [data])
        console.log("data+++++++++++++++",data)
        
        // useEffect(() => {
        // dispatch(getTemplates());
         
        // }, [data])
        

  return (
    <div className=''>
        <div className='flex justify-between my-2 items-center'>
        <h1 className='text-lg font-semibold'>Templates</h1>
        <button className='text-white bg-primary hover:bg-blue-600 px-4 py-1 rounded-md' onClick={()=>{setEditor(true);setId(null)}}>Add new Template</button>
        </div>
         <div className='flex w-full gap-x-2 h-screen'>
                 <div className='flex flex-col gap-y-2 w-1/4  p-2 shadow-xl'>
        {
            
            data?.map((item)=>
                <div className= {`border rounded-sm p-3 cursor-pointer   ${id===item.id?"bg-primary text-white hover:bg-blue-600":"bg-white hover:bg-gray-100"}`} onClick={()=>{setId(item?.id);setEditor(false); }}>
                    <div className='flex items-center justify-between'>
                    <div className='text-lg font-semibold'>{item?.template_name}</div>
                    <button className=' bg-rose-500 px-2 py-1 rounded-lg hover:bg-rose-600 text-white' onClick={()=>{dispatch(deleteTemplate(item.id));setEditor(true)}} >
                    {/* <img className='w-5' src={deleteIcon} alt="" />
                     */}
                     Delete
                    </button>

                    </div>
                    <hr className='my-2' />
                    <div className=' font-semibold'><span className='font-bold'>Subject: </span>{item?.subject}</div>
                </div>
        
        )
        }
    </div>
    <div className='w-full'>
        { 
            editor?
            <Editor item={null} editorNew={true}/>
            :
            data?.filter(item => item.id === id).map((item) => (
                <Editor item={item} editorNew={false}/>
            ))
        }

        {/* {editor===false&&
        <div className='w-full h-full flex flex-col justify- items-center'>
            <h1 className='text-xl font-semibold text-Primary text-center '>
            Welcome!
            </h1>
            <img className='w-80 my-4' src={svg} alt="" />
            <h1 className='text-lg font-semibold text-gray-400'>
            Here you can add New Templates or Update Templates
            </h1>
           


        </div>} */}
      
              
            </div>

    </div>
    </div>
   
   
  )
}

export default Templates