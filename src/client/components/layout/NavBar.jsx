import React, { useEffect, useRef, useState } from 'react'
// import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router';
// import { Logout } from '../../../redux/auth/action';
import { useDispatch, useSelector } from 'react-redux';
// import { getUserData } from '../../../redux/userData/action';
// import ProjectChangeDrop from '../ui/ProjectChangeDrop';
import defaultAvatar from '../../assets/imgs/default-avatar-icon.png'

const NavBar = () => {
  const navigate = useNavigate()
  const pathName = useLocation().pathname.split("/")[2]

  const dispatch = useDispatch()
  // const data = { name: "Shahzaib Qasim", email: "shahziab Qasim@gmail.com", profile_picture: "https://tailwindui.com/img/avatar-2.jpg" }
  // const data = useSelector((state) => state.userDataReducer?.data)
  const data = { full_name: "M Shahzaib", email: "admin@gmail.com" }
  // const loading = false
  const loading = useSelector((state) => state.userDataReducer?.loading)

  useEffect(() => {
    if (!data || data === null) {
      // dispatch(getUserData())
    }
  }, [data])
  console.log("data of user }}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}}", data)

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

  const handleLogout = () => {
    // logOutGoogle();
    // localStorage.removeItem('profile')
    // dispatch(Logout())
    // if (isAuthenticated) {
    //   logout()
    //   // localStorage.removeItem("googleAuth");
    // }
  }

  return (
    <nav className="shadow-sm flex sm:flex-nowrap sm:flex-row flex-wrap-reverse gap-5  items-center justify-between p-4 bg-white w-full">
      <h1 className='capitalize text-lg font-semibold text-[#343C6A]'>{pathName}</h1>
      {/* <div className="relative lg:w-[auto] w-full">
        <div className="absolute inset-y-1 left-3 flex justify-center items-center">
          <svg className='z-10' width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19.4778 19.4778L17.7158 17.7158M1.85791 10.2274C1.85791 5.60504 5.60504 1.85791 10.2274 1.85791C14.8497 1.85791 18.5968 5.60504 18.5968 10.2274C18.5968 14.8497 14.8497 18.5968 10.2274 18.5968C5.60504 18.5968 1.85791 14.8497 1.85791 10.2274Z" stroke="#1F2937" stroke-width="1.32149" stroke-linecap="round" stroke-linejoin="round" /></svg>
        </div>
        <span className='relative'>
          <input
            type='text'
            name="search"
            placeholder="Search..."
            className={`block lg:w-96 w-full rounded-full border border-gray-100 bg-gray-100 py-3 pr-5 pl-11 text-base/2 text-sm text text-neutral-950 ring-4 ring-transparent transition placeholder:text-neutral-700 focus:border-colorPrimary focus:outline-none leading-none`}
          />
        </span>
      </div> */}
      {/* <ProjectChangeDrop /> */}

      {
        loading ?
          <div className="flex gap-3 ml-auto">

            <div className="flex gap-4">
              <svg width="32" height="33" viewBox="0 0 32 33" fill="none" xmlns="http://www.w3.org/2000/svg"><rect y="0.667969" width="32" height="32" rx="6" fill="white" /><path d="M25.5557 9.11241C26.783 9.11241 27.7779 8.11749 27.7779 6.89019C27.7779 5.66289 26.783 4.66797 25.5557 4.66797C24.3284 4.66797 23.3335 5.66289 23.3335 6.89019C23.3335 8.11749 24.3284 9.11241 25.5557 9.11241Z" fill="#0067AD" /><g clip-path="url(#clip0_383_427)"><path d="M23.5057 19.4678L21.7724 13.2204C21.4022 11.884 20.5957 10.7099 19.4812 9.88475C18.3667 9.05965 17.0082 8.63104 15.622 8.66715C14.2358 8.70325 12.9015 9.202 11.8314 10.084C10.7614 10.966 10.0171 12.1806 9.71703 13.5344L8.37637 19.5678C8.31149 19.8601 8.31308 20.1632 8.381 20.4548C8.44892 20.7464 8.58144 21.019 8.76879 21.2526C8.95614 21.4861 9.19353 21.6746 9.46346 21.8042C9.73339 21.9337 10.029 22.001 10.3284 22.0011H12.733C12.886 22.7546 13.2949 23.4321 13.8902 23.9187C14.4855 24.4053 15.2308 24.6711 15.9997 24.6711C16.7686 24.6711 17.5139 24.4053 18.1092 23.9187C18.7045 23.4321 19.1134 22.7546 19.2664 22.0011H21.5797C21.8878 22.001 22.1916 21.9296 22.4676 21.7927C22.7436 21.6558 22.9842 21.457 23.1707 21.2118C23.3572 20.9666 23.4845 20.6816 23.5427 20.3791C23.601 20.0766 23.5879 19.7647 23.5057 19.4678ZM15.9997 23.3344C15.5875 23.3327 15.1859 23.2037 14.8499 22.965C14.5139 22.7264 14.2598 22.3897 14.1224 22.0011H17.877C17.7396 22.3897 17.4855 22.7264 17.1495 22.965C16.8135 23.2037 16.4119 23.3327 15.9997 23.3344ZM22.1097 20.4044C22.0475 20.4869 21.9669 20.5536 21.8743 20.5994C21.7817 20.6451 21.6796 20.6685 21.5764 20.6678H10.3284C10.2285 20.6677 10.13 20.6453 10.04 20.6021C9.95 20.5589 9.87086 20.4961 9.8084 20.4182C9.74595 20.3403 9.70178 20.2494 9.67916 20.1522C9.65654 20.0549 9.65604 19.9539 9.6777 19.8564L11.0184 13.8231C11.2546 12.7606 11.8392 11.8075 12.6793 11.1154C13.5194 10.4233 14.5668 10.0319 15.6549 10.0034C16.743 9.97486 17.8094 10.3109 18.6846 10.9581C19.5598 11.6052 20.1935 12.5264 20.485 13.5751L22.2184 19.8224C22.2467 19.9212 22.2516 20.0252 22.2327 20.1263C22.2139 20.2273 22.1717 20.3225 22.1097 20.4044Z" fill="#0067AD" /></g><defs><clipPath id="clip0_383_427"><rect width="16" height="16" fill="white" transform="translate(8 8.66797)" /></clipPath></defs></svg>
              <div className="flex items-center gap-4 md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div className="flex flex-col gap-y-2">
                    <div className="w-20 h-3 bg-gray-300 rounded"></div>
                    <div className="w-16 h-2 bg-gray-300 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          :
          <div className="flex gap-3 ml-auto">
            {/* <DropdownNotifications /> */}
            <div className="flex gap-4">
              <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                <span type="button" className="flex text-sm rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 cursor-pointer" id="user-menu-button" aria-expanded={isDropdownOpen} onClick={toggleDropdown} data-dropdown-placement="bottom">
                  <span className="sr-only">Open user menu</span>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <img className="w-8 h-8 rounded-full bg-gray-200" src={defaultAvatar} alt="user" />
                      <div className="md:max-w-[130px] max-w-[130px]">
                        <span className="block text-sm text-gray-900 truncate font-medium ms-2">{data?.full_name}</span>
                        <span className="block text-xs text-gray-500 truncate ms-2">{data?.email}</span>
                      </div>
                    </div>
                    <div className="ms-4 min-w-7">
                      <svg className='ml-auto' width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6L8 10L12 6" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  </div>
                </span>
                {isDropdownOpen && (
                  <div className="absolute z-50 top-24 right-4  sm:top-12 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-md" ref={dropdownRef}>
                    <div className="px-4 py-3" onClick={() => closeDropdown()} >
                      <span className="block text-sm text-gray-900 truncate">{data?.full_name}</span>
                      <span className="block text-xs text-gray-500 truncate">{data?.email}</span>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      {/* <li>
                        <div onClick={() => { closeDropdown(); navigate('/settings') }} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Settings</div>
                      </li> */}
                      <li>
                        <div className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={handleLogout}>Sign out</div>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
      }

    </nav>
  )
}
export default NavBar