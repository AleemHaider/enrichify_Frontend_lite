import React, { useEffect, useState } from "react";
import homeActive from "../../assets/svgs/home-active.svg";
import home from "../../assets/svgs/home.svg";

// import logo from '../../assets/svgs/analytics-pie-chart-svgrepo-com.svg'

import logo from '../../assets/images/logo.png'


import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../../redux/projects/action";
const SideBar = () => {
  const navigate=useNavigate();
  const location = useLocation();
  console.log("location.pathname: ", location.pathname.split("/")[1], location);
  const [isSettingsOpen, setSettingsOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const toggleSettings = () => {
    setSettingsOpen(!isSettingsOpen);
  };
  const closeSidebar = () => {
    setSidebarOpen(false);
    setSettingsOpen(false)
  };
  const dispatch=useDispatch()
  const isDashboardActive = location.pathname.split("/")[1] === "home";
  // const isEnrichActive = location.pathname.split("/")[1] === "enrichdata"
  const isFileUpload = location.pathname.split("/")[1] === "fileupload"
  const isRequest = location.pathname.split("/")[1] === "requests"
  const isProjects = location.pathname.split("/")[1] === "projects"
  const data = useSelector((state) => state.projectReducer.getProjects?.data);
  useEffect(() => {
    if(data==null){
      dispatch(getProjects())
    }
  }, [data])
  
  return (
    <>
      <button
        data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:text-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-gray-200 hamburger"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      {isSidebarOpen && (
        <div
          className="fixed top-0 left-0 z-30 w-screen h-screen bg-black opacity-50"
          onClick={closeSidebar}
        ></div>
      )}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40   h-screen transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="bg-white h-full px-3 py-4 overflow-y-auto">
          <NavLink onClick={closeSidebar} to="/home" class="flex items-center justify-center pt-2">
            <img src={logo} class=" m-auto" alt="Logo" />
            {/* <h1 className="text-center">Google Search Console</h1> */}
          </NavLink>
          <hr class="h-px my-4 bg-gray-100 " />
          <div className="flex flex-col justify-between"></div>
          <ul class="space-y-2 font-medium">
            {/* <li>
              <NavLink onClick={closeSidebar} to="/home" className={`flex items-center justify-center p-2  text-gray-500 rounded-lg hover:text-blue-700 hover:border-blue-700 group`}>
                {isDashboardActive ? (
                  <div className="flex gap-2 w-52 bg-blue-200 py-2 px-2 rounded-lg items-start border-blue-600 text-blue-600 hover:bg-blue-100 ">
                <img src={homeActive} alt="Active Home" />
                <h1 className="text-lg">Home</h1>
                  </div>
                 
                ) : (
                  <div className="flex gap-2 w-52 bg-gray-100 py-2 px-2 rounded-lg item-center border-gray-500 text-gray-500 ">
                <img src={homeActive} alt="Inactive Home" />
                <h1>Home</h1>
                  </div>
                )}
              </NavLink>
            </li> */}
            <li>
            <select
  className="flex gap-2 w-52 m-2 border bg-white p-3 rounded-lg items-start border-blue-600 text-blue-600 hover:bg-gray-100"
  onChange={(e) => {
    if (e.target.value) {
      navigate(`/project/traffic/${e.target.value}`);
    }
  }}
>
  <option selected disabled>Select Project</option>
  {data?.filter(item => item.status === "verify").map((item) => (
    <option key={item.secret_key} value={item.secret_key}>
      {item.title}
    </option>
  ))}
</select>

</li>

             <li>
              <NavLink onClick={closeSidebar} to="/projects" className={`flex items-center justify-center p-2  text-gray-500 rounded-lg hover:text-blue-700 hover:border-blue-700 group`}>
                {isProjects ? (
                  <div className="flex gap-2 w-52 bg-blue-200 py-2 px-2 rounded-lg items-start border-blue-600 text-blue-600 hover:bg-blue-100 ">
                {/* <img src={homeActive} alt="Active Home" /> */}
                <h1 className="text-lg">Projects</h1>
                  </div>
                ) : (
                  <div className="flex gap-2 w-52 bg-gray-100  py-2 px-2 rounded-lg item-center border-gray-500 text-gray-500 ">
                {/* <img src={homeActive} alt="Inactive Home" /> */}
                <h1 className="">Projects</h1>
                  </div>
                )}
              </NavLink>
            </li>
            {/* <li>
              <NavLink onClick={closeSidebar} to="/project/requests/:id" className={`flex items-center justify-center p-2  text-gray-500 rounded-lg hover:text-blue-700 hover:border-blue-700 group`}>
                {isRequest ? (
                  <div className="flex gap-2 w-52 bg-blue-200 py-2 px-2 rounded-lg items-start border-blue-600 text-blue-600 hover:bg-blue-100 ">
         
                <h1 className="text-lg">Requests</h1>
                  </div>
                ) : (
                  <div className="flex gap-2 w-52 bg-gray-100  py-2 px-2 rounded-lg item-center border-gray-500 text-gray-500 ">
               
                <h1 className="">Requests</h1>
                  </div>
                )}
              </NavLink>
            </li> */}
           
            <li>
              <NavLink onClick={closeSidebar} to="/fileupload" className={`flex items-center justify-center p-2  text-gray-500 rounded-lg hover:text-blue-700 hover:border-blue-700 group`}>
                {isFileUpload ? (
                  <div className="flex gap-2 w-52 bg-blue-200 py-2 px-2 rounded-lg items-start border-blue-600 text-blue-600 hover:bg-blue-100 ">
                {/* <img src={homeActive} alt="Active Home" /> */}
                <h1 className="text-lg">FileData Enrichment</h1>
                  </div>
                ) : (
                  <div className="flex gap-2 w-52 bg-gray-100 py-2 px-2 rounded-lg item-center border-gray-500 text-gray-500 ">
                {/* <img src={homeActive} alt="Inactive Home" /> */}
                <h1>FileData Enrichment</h1>
                  </div>
                )}
              </NavLink>
            </li>
          </ul>
          
        </div>
      </aside>
    </>
  );
};
export default SideBar;
