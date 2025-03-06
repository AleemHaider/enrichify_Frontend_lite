import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { getEmails, getSubUsers, getTemplates } from '../../redux/projects/action'
import AddSubUserModal from '../../components/ui/AddSubUserModal'
import noUser from  "../../assets/svgs/no_user.svg"
import AddEmailModal from '../../components/ui/AddEmailModal'
import DataTable from 'react-data-table-component'
const Templates = () => {

    const body={__html:
        `<!DOCTYPE html> <html> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <title>2019 Jeep Grand Cherokee Limited 4WD - Available Now!</title> <style> body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; } .container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); } .header { text-align: center; } .header h2 { color: #333; margin-bottom: 10px; } .header p { color: #555; font-size: 16px; margin-bottom: 20px; } .image-container { text-align: center; } .image-container img { width: 100%; max-width: 500px; border-radius: 8px; } .content { padding: 20px 0; } .content h3 { color: #333; } .content ul { color: #555; font-size: 16px; padding-left: 20px; } .cta { text-align: center; padding-top: 20px; } .cta a { display: inline-block; background-color: #007BFF; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; } .cta a:hover { background-color: #0056b3; } .contact { text-align: center; font-size: 16px; color: #555; margin-top: 20px; } .contact a { color: #007BFF; text-decoration: none; } </style> </head> <body> <div class="container"> <!-- Header Section --> <div class="header"> <h2>2019 Jeep Grand Cherokee Limited 4WD</h2> <p>Now available at York Chrysler Dodge Jeep Ram of Plainfield</p> </div> <!-- Vehicle Image --> <div class="image-container"> <img src="https://tse2.mm.bing.net/th?id=OIP.kk3hZ5nLou_stmISyU2EyQHaFj&pid=Api" alt="2019 Jeep Grand Cherokee Limited"> </div> <!-- Vehicle Features --> <div class="content"> <h3>Key Features:</h3> <ul> <li><strong>Engine:</strong> 3.6L V6 with 295 HP</li> <li><strong>Transmission:</strong> 8-speed automatic</li> <li><strong>Fuel Efficiency:</strong> 21 MPG combined</li> <li><strong>Interior:</strong> Leather seats, heated front & rear seats</li> <li><strong>Technology:</strong> 8.4-inch touchscreen, Bluetooth, Navigation</li> <li><strong>Safety:</strong> Rearview camera, blind-spot monitoring</li> </ul> </div> <!-- Call-To-Action Button --> <div class="cta"> <a href="https://www.yorkcdjrofplainfield.com/inventory/used-2019-jeep-grand-cherokee-limited-4wd-4d-sport-utility-1c4rjfbg8kc648107/"> View Listing </a> </div> <!-- Contact Information --> <div class="contact"> <p><strong>York Chrysler Dodge Jeep Ram of Plainfield</strong><br> 2695 E Main St, Plainfield, IN 46168<br> Sales: <a href="tel:3174343524">(317) 434-3524</a><br> Website: <a href="https://www.yorkcdjrofplainfield.com/">Visit Here</a></p> </div> </div> </body> </html>`
    }
    const templates=useSelector(state=>state.projectReducer?.getTemplates?.data)
    const {key}=useParams()
    const dispatch=useDispatch();
    console.log(templates)
    useEffect(() => {
      if(templates==null){
        dispatch(getTemplates({secret_key:key}))
      }
      console.log(JSON.stringify(templates))
    }, [templates])
    // const body={__html:templates[0]?.body}
    
//     const columns = [
//       {
//           name: 'From Email',
//           selector: (row) => row.from_email,
//           sortable: true,
//       },
//       {
//           name: 'From Name',
//           selector: (row) => row.from_name,
//           sortable: true,
//       },
//       {
//           name: 'Reply To',
//           selector: (row) => row.reply_to,
//           sortable: true,
//       },
//       {
//           name: 'Address',
//           selector: (row) => row.address,
//           sortable: true,
//       },
//       {
//           name: 'City',
//           selector: (row) => row.city,
//           sortable: true,
//       },
//       {
//           name: 'Country',
//           selector: (row) => row.country,
//           sortable: true,
//       },
//       {
//           name: 'Zip Code',
//           selector: (row) => row.zip,
//           sortable: true,
//       },
//       {
//           name: 'Nickname',
//           selector: (row) => row.nickname,
//           sortable: true,
//       },
//       {
//           name: 'Status',
//           selector: (row) => (row.verified ? <div className='text-green-500 bg-green-100 px-2 py-1 rounded-full'>Verified</div>:<div className='text-red-500 bg-red-100 px-2 py-1 rounded-full'>Unverified</div>),
//           sortable: true,
//       },
      
//   ];
  
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
    {
        templates[0]?.template_name
    }
    {
        <div dangerouslySetInnerHTML={body} />
    }
    </>

  
  )
}

export default Templates