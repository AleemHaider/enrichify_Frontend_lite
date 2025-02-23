import React, { useEffect, useState } from "react";
// import logo from "../../assets/svgs/logo.svg";
// import logo from "../../assets/images/dipspik.png";
// import logo from '../../assets/svgs/dipspik.svg'

// import SettingsSvg from "../ui/SettingsSvg";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { SLogo } from "../../../constants/Svgs";
import Logo from '../../../assets/images/logo.png'
import home from '../../assets/svg/home.svg'


const SideBar = () => {
  // const dispatch = useDispatch();
  let audiolocation = useLocation()
  audiolocation = audiolocation.pathname.split("/")[1] === "home"
  console.log("location location audiolocation: ", audiolocation);
  const language = [
    { name: "Home Header", link: "/home/header" },
    { name: "Benefits", link: "/home/benefits" },
    { name: "Reference", link: "/home/references" },
  ]
  const projects = [
    { name: "Project Header", link: "/admin/projectHeader" },
    { name: "Project Filters", link: "/admin/projectFilters" },
    { name: "Project Highlights", link: "/admin/projectHighlights" },
  ]

  const [isAudioOpen, setAudioOpen] = useState(false);
  const [isProjectsOpen, setProjectsOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };
  const handleAudioTab = () => {
    setAudioOpen(!isAudioOpen);
  }
  const handleProjectsTab = () => {
    setProjectsOpen(!isProjectsOpen);
  }
  const closeSidebar = () => {
    setSidebarOpen(false);
  };
  return (
    <>
      <button
        data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-800 rounded-lg sm:hidden hover:text-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-gray-200"
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
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="bg-gray-50 h-full px-5 py-4 overflow-y-auto flex flex-col">
          <NavLink onClick={closeSidebar} to="/admin/" className="flex items-center justify-center pt5">
            {/* <SLogo logoSize={"w-[80px] sm:w-[120px] lg:w-36"} /> */}
            <img src={Logo} alt='logo' className={"w-[140px] sm:w-[165px] lg:w-40 w-[165px mx-auo"} />

          </NavLink>
          <hr className="h-px my-7 bg-secondary border-0" />
          <ul className="space-y-2 font-medium mb-12">
            {/* {<li>
              <button onClick={handleAudioTab} to="/home" className={`flex items-center p-2 text-gray-800 hover:text-colorPrimary group font-semibold text-lg ${audiolocation && " text-colorPrimary"}`}>
                <i className={`fa-solid fa-house ${audiolocation && " text-colorPrimary"}`}></i>
                <span className={`flex-1 ms-3 whitespace-nowrap font-semibold ${audiolocation && " text-colorPrimary"}`}>
                  Home
                </span>
                <svg className={`w-5 h-5 ml-3 ${isAudioOpen && "rotate-180"} ${audiolocation ? "text-colorPrimary" : "text-gray-800"} transition duration-75 group-hover:text-colorPrimary`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                </svg>
              </button>
              {
                isAudioOpen &&
                <ul className=" p-2 mt-2 w-full">
                  {
                    language.map((item, index) =>
                      <li key={index} className=" bg-gray-200 w-full rounded-md mb-2">
                        <NavLink onClick={closeSidebar} to={`${item?.link}`} className={`flex items-center p-2  text-gray-800 hover:text-colorPrimary group font-semibold`} style={{ textWrap: "nowrap" }}>
                          <span className="my-1 leading-none font-medium">{item?.name}</span>
                        </NavLink>
                      </li>)
                  }
                </ul>
              }
            </li>} */}
            <li>
              <NavLink onClick={closeSidebar} to='/client/dashboard' className={`flex items-center p-2  text-gray-800 hover:text-colorPrimary group font-semibold text-lg`}>
                <i className="fa-brands fa-leanpub"></i>
                <img src={home} alt="home" className="text-black bg-black"/>
                <span className="flex-1 ms-3 whitespace-nowrap font-semibold">
                  Dashboard
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeSidebar} to='/admin/promotionalVideo' className={`flex items-center p-2  text-gray-800 hover:text-colorPrimary group font-semibold text-lg`}>
                <i className="fa-brands fa-leanpub"></i>
                <span className="flex-1 ms-3 whitespace-nowrap font-semibold">
                  Promotional Video
                </span>
              </NavLink>
            </li>
            {/* <li>
              <NavLink onClick={closeSidebar} to='/admin/projectHighlights' className={`flex items-center p-2  text-gray-800 hover:text-colorPrimary group font-semibold text-lg`}>
                <i className="fa-brands fa-leanpub"></i>
                <span className="flex-1 ms-3 whitespace-nowrap font-semibold">
                  Project Highlights
                </span>
              </NavLink>
            </li> */}

            {<li>
              <button onClick={handleProjectsTab} to="/home" className={`flex items-center p-2 text-gray-800 hover:text-colorPrimary group font-semibold text-lg ${audiolocation && " text-colorPrimary"}`}>
                <i className={`fa-solid fa-house ${audiolocation && " text-colorPrimary"}`}></i>
                <span className={`flex-1 ms-3 whitespace-nowrap font-semibold ${audiolocation && " text-colorPrimary"}`}>
                  Projects
                </span>
                <svg className={`w-5 h-5 ml-3 ${isProjectsOpen && "rotate-180"} ${audiolocation ? "text-colorPrimary" : "text-gray-800"} transition duration-75 group-hover:text-colorPrimary`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 9-7 7-7-7" />
                </svg>
              </button>
              {
                isProjectsOpen &&
                <ul className=" p-2 mt-2 w-full">
                  {
                    projects.map((item, index) =>
                      <li key={index} className=" bg-gray-200 w-full rounded-md mb-2">
                        <NavLink onClick={closeSidebar} to={`${item?.link}`} className={`flex items-center p-2  text-gray-800 hover:text-colorPrimary group font-semibold`} style={{ textWrap: "nowrap" }}>
                          <span className="my-1 leading-none font-medium">{item?.name}</span>
                        </NavLink>
                      </li>)
                  }
                </ul>
              }
            </li>}
            <li>
              <NavLink onClick={closeSidebar} to='/admin/contact/messages' className={`flex items-center p-2  text-gray-800 hover:text-colorPrimary group font-semibold text-lg`}>
                <i className="fa-brands fa-leanpub"></i>
                <span className="flex-1 ms-3 whitespace-nowrap font-semibold">
                  Contact Us
                </span>
              </NavLink>
            </li>
            {/* <li>
              <NavLink onClick={closeSidebar} to='/fee' className={`flex items-center p-2  text-gray-800 hover:text-colorPrimary group font-semibold text-lg`}>
                <i class="fa-solid fa-money-bills"></i>
                <span className="flex-1 ms-3 whitespace-nowrap font-semibold">
                  Fee
                </span>
              </NavLink>
            </li> */}
          </ul>
        </div>
      </aside >
    </>
  );
};

export default SideBar;
