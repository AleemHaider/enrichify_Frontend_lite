import React, { useEffect, useRef, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { getUserDetails } from '../redux/user/action';
import avatar from '../../assets/images/dp-img.jpg'
import { logout } from '../../redux/auth/action';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const NavBar = () => {
  const navigate=useNavigate()
  // const dispatch=useDispatch();
  // const data=useSelector((state)=>state.userReducer.getUserDetails.data)
  // useEffect(() => {
  //   if(!data){
  //     dispatch(getUserDetails())
  //   }
  //   console.log("data sdsd dsdsds dssd dss dsd ds.....................................aaaaaaaaaaaaa.............aaaaaaa.......",data)
  // }, [data])

  const dispatch=useDispatch()
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const closeDropdown = () => {
    setDropdownOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <nav className=" shadow-sm flex flex-wrap items-center justify-between p-4 bg-white w-full">
      <h6 className='font-medium text-lg text-black'>Dashboard</h6>
      <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
        <span
          type="button"
          className="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 cursor-pointer"
          id="user-menu-button"
          aria-expanded={isDropdownOpen}
          onClick={toggleDropdown}
          data-dropdown-placement="bottom"
        >
          <span className="sr-only">Open user menu</span>
          <div className="flex items-center">
            <div className="flex items-center">
              <img
                className="w-10 h-10 rounded-full"
                src={avatar}
                alt="user photo"
              />
              <span className="block text-sm text-gray-900 font-medium ms-2">
               Roose
              </span>
            </div>
            <div className="ms-4">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4 6L8 10L12 6"
                  stroke="#94A3B8"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </span>
        {isDropdownOpen && (
          <div
            className=" absolute z-50 top-28 right-4  sm:top-12 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-md"
            ref={dropdownRef}
          >
            <div className="px-4 py-3" onClick={() => closeDropdown()} >
              <span className="block text-sm text-gray-900 truncate">
              {/* {data?.name} */} Roose
              </span>
              {/* <span className="block text-sm text-gray-500 truncate">
                name@flowbite.com
              </span> */}
            </div>
            <ul className="py-2 cursor-pointer" aria-labelledby="user-menu-button">
              {/* <li>
                <div
                  onClick={() => closeDropdown()}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Settings
                </div>
              </li> */}
              <li>
                <div
                  onClick={() => {closeDropdown(); dispatch(logout()) ;navigate('/')}}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign out
                </div>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  )
}
export default NavBar