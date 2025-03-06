import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getEmails, getSubUsers } from '../../redux/projects/action'
import AddSubUserModal from '../../components/ui/AddSubUserModal'
import noUser from  "../../assets/svgs/no_user.svg"
import AddEmailModal from '../../components/ui/AddEmailModal'
import DataTable from 'react-data-table-component'
const Emails = () => {
    const emails=useSelector(state=>state.projectReducer?.getEmails?.data)
    const {key}=useParams()
    const dispatch=useDispatch();
    console.log(emails)
    useEffect(() => {
      if(emails==null){
        dispatch(getEmails({secret_key:key}))
      }
      console.log(JSON.stringify(emails))
    }, [emails])


    const columns = [
      {
          name: 'From Email',
          selector: (row) => row.from_email,
          sortable: true,
      },
      {
          name: 'From Name',
          selector: (row) => row.from_name,
          sortable: true,
      },
      {
          name: 'Reply To',
          selector: (row) => row.reply_to,
          sortable: true,
      },
      {
          name: 'Address',
          selector: (row) => row.address,
          sortable: true,
      },
      {
          name: 'City',
          selector: (row) => row.city,
          sortable: true,
      },
      {
          name: 'Country',
          selector: (row) => row.country,
          sortable: true,
      },
      {
          name: 'Zip Code',
          selector: (row) => row.zip,
          sortable: true,
      },
      {
          name: 'Nickname',
          selector: (row) => row.nickname,
          sortable: true,
      },
      {
          name: 'Status',
          selector: (row) => (row.verified ? <div className='text-green-500 bg-green-100 px-2 py-1 rounded-full'>Verified</div>:<div className='text-red-500 bg-red-100 px-2 py-1 rounded-full'>Unverified</div>),
          sortable: true,
      },
      
  ];
  
  return (
    // <><div className='flex justify-between items-end mt-2'><h1 className='text-xl'>Emails</h1><AddEmailModal/></div>
    //  { users && users.length>0?
    //      <div className='my-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-2 w-full'>
    //       {
    //         users.map((user)=>
    //           <div className='p-4 rounded-lg border bg-gray-50 shadow-sm'>
    //         <h1 className='text-lg my-2 '>Name:<span className='bg-green-200 text-green-900 py-1  px-4 ml-2 rounded-full'>{user?.name}</span></h1>
    //         <h1 className='text-lg'>Email:<span className='bg-green-200 text-green-900 py-1 px-4 ml-2 rounded-full'>{user?.email}</span></h1>
    //         {/* <h1 className='text-lg mt-2'>Password:<span className='bg-green-200 py-1 px-4 ml-2 rounded-full'>{user?.password}</span></h1> */}
    //     </div>)
            
    //       }
    //  </div>
    //  :
    //  <div className='flex flex-col justify-center items-center '>
    //     <img className='w-52' src={noUser} alt="" />
    //         <h1 className='text-2xl text-gray-800 mt-2'>No Users Found</h1>
    //  </div>
    //  }
    // </>
    <>
    <div className='flex justify-between items-end my-2'><h1 className='text-xl'>Emails</h1><AddEmailModal/></div>
    <DataTable
                    columns={columns}
                    data={emails || []}
                    pagination
                    selectableRows
                    // onSelectedRowsChange={handleSelectedRowsChange}
                />
    </>

  
  )
}

export default Emails