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
        className={`fixed top-0 left-0 z-40 w-64 h-screen shadow-sm transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div id="client" className="bg-white h-full pr-5 py-4 overflow-y-auto flex flex-col">
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
              <NavLink onClick={closeSidebar} to='/client/dashboard' className={`flex items-center p-2  text-gray-800 hover:text-cPrimary group font-semibold text-lg ps-6`}>
                {/* <i className="fa-brands fa-leanpub"></i> */}
                {/* <img src={home} alt="home" className="bg-transparent w-5 icon" /> */}
                <svg className="w-5" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M24.326 10.8738C24.3254 10.8732 24.3248 10.8727 24.3242 10.8721L14.1262 0.674438C13.6915 0.239563 13.1136 0 12.4989 0C11.8841 0 11.3062 0.239372 10.8713 0.674248L0.67866 10.8667C0.675227 10.8702 0.671794 10.8738 0.668361 10.8772C-0.224279 11.775 -0.222753 13.2317 0.672747 14.1272C1.08187 14.5365 1.62223 14.7736 2.19996 14.7984C2.22342 14.8006 2.24707 14.8018 2.27091 14.8018H2.67737V22.3066C2.67737 23.7917 3.88568 25 5.37112 25H9.36091C9.76527 25 10.0933 24.6721 10.0933 24.2676V18.3838C10.0933 17.7061 10.6446 17.1549 11.3222 17.1549H13.6755C14.3532 17.1549 14.9044 17.7061 14.9044 18.3838V24.2676C14.9044 24.6721 15.2323 25 15.6368 25H19.6266C21.1121 25 22.3204 23.7917 22.3204 22.3066V14.8018H22.6973C23.3118 14.8018 23.8898 14.5624 24.3248 14.1275C25.2213 13.2305 25.2217 11.7714 24.326 10.8738Z" fill="currentColor" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap font-semibold">
                  Dashboard
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink onClick={closeSidebar} to='/client/settings' className={`flex items-center p-2  text-gray-800 hover:text-cPrimary group font-semibold text-lg ps-6`}>
                {/* <i className="fa-brands fa-leanpub"></i> */}
                <svg className="w-5" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.6985 9.41406H22.1678C21.9954 8.87451 21.7778 8.35039 21.5172 7.84683L21.8931 7.47095C22.8045 6.56055 22.7801 5.10156 21.8934 4.21582L20.7845 3.10693C19.8993 2.22056 18.44 2.19487 17.5293 3.10659L17.1532 3.48276C16.6496 3.22222 16.1254 3.00464 15.5859 2.83223V2.30142C15.5859 1.03242 14.5535 0 13.2845 0H11.7155C10.4465 0 9.41406 1.03242 9.41406 2.30142V2.83223C8.87456 3.00459 8.35039 3.22217 7.84683 3.48276L7.471 3.10693C6.56216 2.19702 5.10293 2.21836 4.21592 3.10664L3.10688 4.21558C2.22056 5.10093 2.19492 6.56001 3.10659 7.4707L3.48276 7.84687C3.22217 8.35044 3.00464 8.87451 2.83223 9.41411H2.30146C1.03247 9.41406 0 10.4465 0 11.7155V13.2845C0 14.5535 1.03247 15.5859 2.30146 15.5859H2.83223C3.00464 16.1255 3.22217 16.6496 3.48276 17.1532L3.10688 17.5291C2.19551 18.4395 2.21992 19.8984 3.10659 20.7842L4.21553 21.8931C5.10073 22.7794 6.56001 22.8051 7.47065 21.8934L7.84683 21.5172C8.35039 21.7778 8.87456 21.9954 9.41406 22.1678V22.6986C9.41406 23.9676 10.4465 25 11.7155 25H13.2845C14.5535 25 15.586 23.9676 15.586 22.6986V22.1678C16.1255 21.9954 16.6497 21.7778 17.1532 21.5172L17.5291 21.8931C18.4379 22.803 19.8971 22.7816 20.7841 21.8934L21.8932 20.7844C22.7795 19.899 22.8051 18.4399 21.8935 17.5292L21.5173 17.1531C21.7779 16.6495 21.9954 16.1254 22.1678 15.5858H22.6986C23.9676 15.5858 25 14.5534 25 13.2844V11.7154C25 10.4465 23.9675 9.41406 22.6985 9.41406ZM12.5 17.9395C9.50064 17.9395 7.06055 15.4993 7.06055 12.5C7.06055 9.50068 9.50064 7.06055 12.5 7.06055C15.4994 7.06055 17.9395 9.50068 17.9395 12.5C17.9395 15.4993 15.4994 17.9395 12.5 17.9395Z" fill="currentColor" />
                </svg>

                <span className="flex-1 ms-3 whitespace-nowrap font-semibold">
                  Settings
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

            {/* {<li>
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
            </li> */}
          </ul>
        </div>
      </aside >
    </>
  );
};

export default SideBar;
