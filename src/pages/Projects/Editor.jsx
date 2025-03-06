import React, { useEffect, useRef, useState } from "react"; 
import JoditEditor from "jodit-react"; 
import { useDispatch, useSelector } from "react-redux";
import { setTemplate, updateTemplate } from "../../redux/template/action";
// import "jodit/build/jodit.min.css";  

const Editor = ({ item }) => {   
  const data = useSelector((state) => state?.templateReducer?.setTemplate?.data);
  const deleteLoading = useSelector((state) => state?.templateReducer?.updateTemplate?.loading);



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
          className="rounded-sm border-gray-200 shadow-sm"
          type="text" 
          placeholder="Template Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />

        {/* Subject Input */}
        <textarea 
          type="text" 
          className="rounded-sm border-gray-200 shadow-sm"
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


























