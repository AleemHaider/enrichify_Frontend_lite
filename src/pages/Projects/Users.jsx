import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSubUsers } from '../../redux/projects/action'

const Users = () => {
    const users=useSelector(state=>state.projectReducer.getSubUsers.data)
    const {key}=useParams()

    const dispatch=useDispatch();
    useEffect(() => {
     dispatch(getSubUsers({secret_key:key}))
    }, [users])
    

  return (
    <div className='my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-2 w-full'>
        <div className='p-4 rounded-lg border bg-gray-50 shadow-sm'>
            <h1 className='text-2xl font-bold'>Muhammad Furqan</h1>
            <input className='mt-2' type="text"  value={"123456789"} />
        </div>
        <div className='p-4 rounded-lg border bg-gray-50 shadow-sm'>
            <h1 className='text-2xl font-bold'>Muhammad Furqan</h1>
            <input className='mt-2' type="text"  value={"123456789"} />
        </div>
        <div className='p-4 rounded-lg border bg-gray-50 shadow-sm'>
            <h1 className='text-2xl font-bold'>Muhammad Furqan</h1>
            <input className='mt-2' type="text"  value={"123456789"} />
        </div>
        <div className='p-4 rounded-lg border bg-gray-50 shadow-sm'>
            <h1 className='text-2xl font-bold'>Muhammad Furqan</h1>
            <input className='mt-2' type="text"  value={"123456789"} />
        </div>

    </div>
  )
}

export default Users