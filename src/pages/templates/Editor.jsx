import React, { useEffect, useRef, useState } from "react"; 
import JoditEditor from "jodit-react"; 
import { useDispatch, useSelector } from "react-redux";
import { setTemplate, updateTemplate } from "../../redux/template/action";
// import "jodit/build/jodit.min.css";  

const Editor = ({item}) => {   
  // let item={
  //   subject: "Hello",
  //   template_name: "Hello",
  //   body: `<!DOCTYPE html> <html> <head> <meta charset="UTF-8"> <meta name="viewport" content="width=device-width, initial-scale=1"> <title>2019 Jeep Grand Cherokee Limited 4WD - Available Now!</title> <style> body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; } .container { max-width: 600px; margin: 20px auto; background: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); } .header { text-align: center; } .header h2 { color: #333; margin-bottom: 10px; } .header p { color: #555; font-size: 16px; margin-bottom: 20px; } .image-container { text-align: center; } .image-container img { width: 100%; max-width: 500px; border-radius: 8px; } .content { padding: 20px 0; } .content h3 { color: #333; } .content ul { color: #555; font-size: 16px; padding-left: 20px; } .cta { text-align: center; padding-top: 20px; } .cta a { display: inline-block; background-color: #007BFF; color: #ffffff; padding: 12px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; } .cta a:hover { background-color: #0056b3; } .contact { text-align: center; font-size: 16px; color: #555; margin-top: 20px; } .contact a { color: #007BFF; text-decoration: none; } </style> </head> <body> <div class="container"> <!-- Header Section --> <div class="header"> <h2>2019 Jeep Grand Cherokee Limited 4WD</h2> <p>Now available at York Chrysler Dodge Jeep Ram of Plainfield</p> </div> <!-- Vehicle Image --> <div class="image-container"> <img src="https://tse2.mm.bing.net/th?id=OIP.kk3hZ5nLou_stmISyU2EyQHaFj&pid=Api" alt="2019 Jeep Grand Cherokee Limited"> </div> <!-- Vehicle Features --> <div class="content"> <h3>Key Features:</h3> <ul> <li><strong>Engine:</strong> 3.6L V6 with 295 HP</li> <li><strong>Transmission:</strong> 8-speed automatic</li> <li><strong>Fuel Efficiency:</strong> 21 MPG combined</li> <li><strong>Interior:</strong> Leather seats, heated front & rear seats</li> <li><strong>Technology:</strong> 8.4-inch touchscreen, Bluetooth, Navigation</li> <li><strong>Safety:</strong> Rearview camera, blind-spot monitoring</li> </ul> </div> <!-- Call-To-Action Button --> <div class="cta"> <a href="https://www.yorkcdjrofplainfield.com/inventory/used-2019-jeep-grand-cherokee-limited-4wd-4d-sport-utility-1c4rjfbg8kc648107/"> View Listing </a> </div> <!-- Contact Information --> <div class="contact"> <p><strong>York Chrysler Dodge Jeep Ram of Plainfield</strong><br> 2695 E Main St, Plainfield, IN 46168<br> Sales: <a href="tel:3174343524">(317) 434-3524</a><br> Website: <a href="https://www.yorkcdjrofplainfield.com/">Visit Here</a></p> </div> </div> </body> </html>`
  // }
  const data = useSelector((state) => state.templateReducer?.setTemplate?.data);
  const deleteLoading = useSelector((state) => state.templateReducer?.updateTemplate?.loading);



  const editor = useRef(null);   
  const [blog, setBlog] = useState('');    
  const [title, setTitle] = useState('');  // State for title
  const [subject, setSubject] = useState(''); // State for subject
  const dispatch = useDispatch();

  // This effect runs whenever the item prop changes
  useEffect(() => {
    if (item) {
      // Populate fields with item data
      setTitle(item.template_name || '');
      setSubject(item.subject || '');
      setBlog(item.body || '');
    } else {
      // Clear the editor if item is empty
      setTitle('');
      setSubject('');
      setBlog('');
    }
  }, [item]);

  useEffect(() => {
    if (data !== null) {
      console.log(data);
      // Reset editor fields after API call is completed
      setBlog('');
      setTitle('');
      setSubject('');
    }
  }, [data]);

  const config = {     
    readonly: false,     
    uploader: {       
      insertImageAsBase64URI: true,       
      url: "/your-upload-endpoint",       
      format: "json",     
    },   
  };    

  const handleChange = () => {
    const content = editor.current?.value;
    setBlog(content);
  };

  const handleDone = () => {
    const newContent = {
      template_name: title,
      subject: subject,
      body: blog,
    };

    if (item) {
      // Update API call
      console.log("Updating template:", newContent);

      // Include ID for the update call
      const updatedContent = {
        ...newContent,
        id: item.id // Assuming item has an 'id' property
      };

      dispatch(updateTemplate(updatedContent)); // Dispatching the updated content
    } else {
      // Add API call
      console.log("Adding new template:", newContent);
      dispatch(setTemplate(newContent)); // Dispatching the new content without an ID
    }
    
    // Optionally store the new content in an array
    // setAllContent(prev => [...prev, newContent]); 
  };

  return (     
    <>       
      {/* Title Input */}
      <div className="w-full flex flex-col gap-y-2 my-2">
        <input 
          className="rounded-sm border-gray-200 shadow-sm p-2"
          type="text" 
          placeholder="Template Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />

        {/* Subject Input */}
        <textarea 
          type="text" 
          className="rounded-sm border-gray-200 shadow-sm p-2"
          placeholder="Enter Email Subject" 
          value={subject} 
          onChange={(e) => setSubject(e.target.value)} 
        />
        <div className="p-5 bg-blue-200 relative overflow-hidden ">
  <h1 className="text-lg font-semibold">Instructions</h1>
  <hr className="text-gray-900 bg-gray-800 mb-2" />
  
  <h1 className="text-sm">
    1. Replace Actual Name with <span className="text-primary animate-pulse rounded">{"{{fullName}}"}</span> <span className="text-gray-600">(For example Furqan={"{{fullName}}"})</span>
  </h1>
  <h1 className="text-sm">
    2. Replace Actual Email with <span className="text-primary animate-pulse rounded">{"{{email}}"}</span> <span className="text-gray-600">(For example furqan31304@gmail.com={"{{email}}"})</span>
  </h1>
  <h1 className="text-sm">
    3. Replace Actual Industry with <span className="text-primary animate-pulse rounded">{"{{industry}}"}</span> <span className="text-gray-600">(For example Higher Education={"{{industry}}"})</span>
  </h1>
  <h1 className="text-sm">
    4. Replace Actual Job Title with <span className="text-primary animate-pulse rounded">{"{{job_title}}"}</span> <span className="text-gray-600">(For example Web Developer={"{{job_title}}"})</span>
  </h1>
  <h1 className="text-sm">
    5. Replace Actual Country with <span className="text-primary animate-pulse rounded">{"{{location_country}}"}</span> <span className="text-gray-600">(For example Pakistan={"{{location_country}}"})</span>
  </h1>
  <h1 className="text-sm">
    6. Replace Actual Phone Number with <span className="text-primary animate-pulse rounded">{"{{phone}}"}</span> <span className="text-gray-600">(For example +92-3033899077={"{{phone}}"})</span>
  </h1>

  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-200 opacity-50 animate-pulse"></div>
</div>



        
      </div>

      <JoditEditor         
        className="custom-editor"         
        ref={editor}         
        config={config}         
        tabIndex={1}         
        onBlur={handleChange} // Call handleChange on blur         
        value={blog}       
      />       

      {/* Button to finalize content */}
      {
        item!==null?
        <div className="flex justify-end">
        <button className="my-2 px-4 py-2 bg-primary hover:to-blue-600 text-white rounded-sm" onClick={handleDone}>Save Changes</button>
      </div>:
      <div className="flex justify-end">
      <button className="my-2 px-4 py-2 bg-primary hover:to-blue-600 text-white rounded-sm" onClick={handleDone}>Save</button>
    </div>

      }
     
    </>   
  ); 
};  

export default Editor;



























// variables convertions 


// import React, { useEffect, useRef, useState } from "react"; 
// import JoditEditor from "jodit-react"; 
// import { useDispatch, useSelector } from "react-redux";
// import { setTemplate, updateTemplate } from "../../redux/template/action";
// // import "jodit/build/jodit.min.css";  

// const Editor = ({ item }) => {   
//   const data = useSelector((state) => state.templateReducer?.setTemplate?.data);
//   const deleteLoading = useSelector((state) => state.templateReducer?.updateTemplate?.loading);
  
//   const editor = useRef(null);   
//   const [blog, setBlog] = useState('');    
//   const [title, setTitle] = useState('');  // State for title
//   const [subject, setSubject] = useState(''); // State for subject
//   const dispatch = useDispatch();

//   // Function to convert {{variable}} to $variable
//   const convertToDollarFormat = (text) => {
//     return text.replace(/{{(.*?)}}/g, '$$$1');
//   };

//   // Function to convert $variable to {{variable}}
//   const convertToCurlyBracesFormat = (text) => {
//     return text.replace(/\$(\w+)/g, '{{$1}}');
//   };

//   // This effect runs whenever the item prop changes
//   useEffect(() => {
//     if (item) {
//       // Populate fields with item data, converting format for the editor
//       setTitle(item.template_name || '');
//       setSubject(item.subject || '');
//       setBlog(convertToCurlyBracesFormat(item.body) || ''); // Convert before setting
//     } else {
//       // Clear the editor if item is empty
//       setTitle('');
//       setSubject('');
//       setBlog('');
//     }
//   }, [item]);

//   useEffect(() => {
//     if (data !== null) {
//       console.log(data);
//       // Reset editor fields after API call is completed
//       setBlog('');
//       setTitle('');
//       setSubject('');
//     }
//   }, [data]);

//   const config = {     
//     readonly: false,     
//     uploader: {       
//       insertImageAsBase64URI: true,       
//       url: "/your-upload-endpoint",       
//       format: "json",     
//     },   
//   };    

//   const handleChange = () => {
//     const content = editor.current?.value;
//     setBlog(content);
//   };

//   const handleDone = () => {
//     const newContent = {
//       template_name: title,
//       subject: subject,
//       body: convertToDollarFormat(blog), // Convert before sending
//     };

//     if (item) {
//       // Update API call
//       console.log("Updating template:", newContent);

//       // Include ID for the update call
//       const updatedContent = {
//         ...newContent,
//         id: item.id // Assuming item has an 'id' property
//       };

//       dispatch(updateTemplate(updatedContent)); // Dispatching the updated content
//     } else {
//       // Add API call
//       console.log("Adding new template:", newContent);
//       dispatch(setTemplate(newContent)); // Dispatching the new content without an ID
//     }
    
//     // Optionally store the new content in an array
//     // setAllContent(prev => [...prev, newContent]); 
//   };

//   return (     
//     <>       
//       {/* Title Input */}
//       <div className="w-full flex flex-col gap-y-2 my-2">
//         <input 
//           className="rounded-sm border-gray-200 shadow-sm"
//           type="text" 
//           placeholder="Template Title" 
//           value={title} 
//           onChange={(e) => setTitle(e.target.value)} 
//         />

//         {/* Subject Input */}
//         <textarea 
//           type="text" 
//           className="rounded-sm border-gray-200 shadow-sm"
//           placeholder="Enter Email Subject" 
//           value={subject} 
//           onChange={(e) => setSubject(e.target.value)} 
//         />

//         <div className="p-5 bg-gray-200 relative overflow-hidden ">
//           <h1 className="text-lg font-semibold">Instructions</h1>
//           <hr className="text-gray-900 bg-gray-800 mb-2" />
//           <h1 className="text-sm">
//             1. Replace Actual Name with <span className="text-primary animate-pulse rounded">${"fullName"}</span> <span className="text-gray-600">(For example Furqan=$fullName)</span>
//           </h1>
//           <h1 className="text-sm">
//             2. Replace Actual Email with <span className="text-primary animate-pulse rounded">${"email"}</span> <span className="text-gray-600">(For example furqan31304@gmail.com=$email)</span>
//           </h1>
//           <h1 className="text-sm">
//             3. Replace Actual Industry with <span className="text-primary animate-pulse rounded">${"industry"}</span> <span className="text-gray-600">(For example Higher Education=$industry)</span>
//           </h1>
//           <h1 className="text-sm">
//             4. Replace Actual Job Title with <span className="text-primary animate-pulse rounded">${"job_title"}</span> <span className="text-gray-600">(For example Web Developer=$job_title)</span>
//           </h1>
//           <h1 className="text-sm">
//             5. Replace Actual Country with <span className="text-primary animate-pulse rounded">${"location_country"}</span> <span className="text-gray-600">(For example Pakistan=$location_country)</span>
//           </h1>
//           <h1 className="text-sm">
//             6. Replace Actual Phone Number with <span className="text-primary animate-pulse rounded">${"phone"}</span> <span className="text-gray-600">(For example +92-3033899077=$phone)</span>
//           </h1>
//           <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-200 opacity-50 animate-pulse"></div>
//         </div>
//       </div>

//       <JoditEditor         
//         className="custom-editor"         
//         ref={editor}         
//         config={config}         
//         tabIndex={1}         
//         onBlur={handleChange} // Call handleChange on blur         
//         value={blog}       
//       />       

//       {/* Button to finalize content */}
//       <div className="flex justify-end">
//         <button className="my-2 px-4 py-2 bg-primary hover:to-blue-600 text-white rounded-sm" onClick={handleDone}>
//           {item ? "Save Changes" : "Save"}
//         </button>
//       </div>
//     </>   
//   ); 
// };  

// export default Editor;
