import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getSubUsers } from '../../redux/projects/action'
import AddSubUserModal from '../../components/ui/AddSubUserModal'
import noUser from  "../../assets/svgs/no_user.svg"
const Users = () => {
    const users=useSelector(state=>state.projectReducer.getSubUsers.data)
    const {key}=useParams()

    const dispatch=useDispatch();
    useEffect(() => {
      if(users==null){
        dispatch(getSubUsers({secret_key:key}))
      }
    }, [users])
    

  return (
    <><div className='flex justify-between items-end mt-2'><h1 className='text-xl'>Users</h1><AddSubUserModal/></div>
     { users && users.length>0?
         <div className='my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-2 w-full'>
          {
            users.map((user)=>
              <div className='p-4 rounded-lg border bg-gray-50 shadow-sm'>
            <h1 className='text-lg my-2 '>Name:<span className='bg-green-200 text-green-900 py-1  px-4 ml-2 rounded-full'>{user?.name}</span></h1>
            <h1 className='text-lg'>Email:<span className='bg-green-200 text-green-900 py-1 px-4 ml-2 rounded-full'>{user?.email}</span></h1>
            {/* <h1 className='text-lg mt-2'>Password:<span className='bg-green-200 py-1 px-4 ml-2 rounded-full'>{user?.password}</span></h1> */}
        </div>)
            
          }
         
     </div>
     :
     <div className='flex flex-col justify-center items-center '>
        <img className='w-52' src={noUser} alt="" />
            <h1 className='text-2xl text-gray-800 mt-2'>No Users Found</h1>
     </div>
     }
    </>
  
  )
}

export default Users