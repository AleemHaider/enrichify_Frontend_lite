import React, { useEffect, useState } from 'react';
import OtpInputs from './OtpInputs';
import loader from '../../../assets/svgs/Rolling@1x-1.0s-200px-200px.svg'
import { useLocation, useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { optVerification, resendOtp, setStatusNull } from '../../../redux/auth/action';
import Logo from '../../../assets/images/logo.png'

export default function OtpScreen({ setScreenStep }) {
  const { pathname } = useLocation()
  console.log(pathname);
  const [seconds, setSeconds] = useState(600);
  const loadingResend = useSelector((state) => state?.authReducer?.resendOTP?.loading)
  // const loadingResend=true;
  const loadingOtp = useSelector((state) => state?.authReducer?.verification?.loading)
  // const loadingOtp=true;


  const otpResponse = useSelector((state) => state?.authReducer?.resendOTP?.status);
  // const isAuth = useSelector((state) => state.authReducer.isAuthenticated);
const navigate=useNavigate();
  const dispatch = useDispatch();
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [moveFocus, setMoveFocus] = useState(null);
  const status=localStorage.getItem('status')
  useEffect(() => {
    if(status==='verify'){
        navigate("/otp")
      }
      if(status===true){
        navigate("/projects")
      }
  }, [status])
  const auth=localStorage.getItem('authToken')
  useEffect(() => {
    if(auth){
      // navigate('/home')
      navigate("/projects")
    }
  }, [auth])


  const resetTimer = () => {
    setSeconds(600); // Reset the timer to its initial value
  };
  useEffect(() => {

    if (otpResponse === 'verify') {
      resetTimer()
    }
  }, [otpResponse]);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            clearInterval(timer); // Stop the timer when it reaches 0
          } else {
            return prevSeconds - 1; // Decrement the timer
          }
        });
      }, 1000);
      return () => clearInterval(timer);
    }
    // Clear the interval when component unmounts
  }, [seconds]);
  const submit = () => {
    const data = otp.join('');

    dispatch(optVerification({ token: data, email: localStorage.getItem('email') }));
  };
  console.log("otp");
  const resend = () => {
    setOtp(new Array(6).fill(''));
    // dispatch(resendOtp({ "email": localStorage.getItem('email'), "phone": localStorage.getItem('otpPhone') }));// Reset the timer when resend is clicked
  };

  const handleBack = () => {
    setOtp(new Array(6).fill(''));
    // dispatch(setStatusNull())
    // localStorage.removeItem("email")
    localStorage.clear()
    navigate('/')
    // localStorage.removeItem("otpPhone")

    // setScreenStep(`${pathname === "/signup" ? "registration" : "login"}`)
  }
  return (
    <div className="h-screen flex items-center justify-center bg-white">
            <div className="relative">
            <div className="absolute -top-1 -left-1 -right-1 -bottom-1 rounded-lg "></div>

            <div id="form-container" className="bg-white py-16 px-8 rounded-lg shadow-2xl w-80 relative z-10 transform transition duration-500 ease-in-out">
            <div className="flex flex-col gap-3 my-auto">

            <div className='flex flex-col items-center gap-2'>
           <img className='w-32' src={Logo} alt="" />
           <h2 id="form-title" className="text-center text-2xl font-bold   text-gray-800">OTP Verification</h2>
           <p className="text-gray-500 text-sm text-center">A verification code has been sent to your phone number and email. The code is valid for 10 minutes</p>

           </div>
        <div className="container mx-auto ">
          <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs mt-1.5 mb-4">
            {otp.map((_, index) => (
              <OtpInputs
                key={index}
                type={"text"}
                otp={otp}
                setOtp={setOtp}
                index={index}
                moveFocus={moveFocus}
                setMoveFocus={setMoveFocus}
              />
            ))}
          </div>
          {

            <div className="flex gap-2 mx-auto justify-center text-xs mt-1 text-gray-700 mb-4">
              <p>Remaining time:</p>
              <p className='text-rose-500 font-semibold cursor-pointer'> {Math.floor(seconds / 60)}:{seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60} minutes</p>
            </div>
          }

          <div className='flex flex-col gap-3'>
            {
              // seconds > 0 ?
                <button type="submit" onClick={submit} className={`flex w-full justify-center rounded-md ${loadingOtp ? 'bg-gray-100 hover:bg-white py-0 ' : 'bg-blue-500 py-1.5 '}  px-3   text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-colorPrimary`}>{loadingOtp ? <img className='w-10' src={loader} alt="" /> : 'Submit'}</button>

                // <button type="submit" onClick={submit} className="flex w-full justify-center rounded-md bg-colorPrimary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-colorPrimary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-colorPrimary">Submit</button>
                // :
                // <button type="submit" onClick={resend} className={`flex w-full justify-center rounded-md ${loadingResend ? 'bg-gray-100 hover:bg-white py-0 ' : 'bg-blue-500 py-1.5 '}  px-3   text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-colorPrimary`}>{loadingResend ? <img className='w-10' src={loader} alt="" /> : 'Resend'}</button>
              // <button onClick={resend} type="submit" className="flex w-full justify-center rounded-md bg-colorPrimary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-colorPrimary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-colorPrimary">Resend</button>
            }
            <button type="submit" onClick={handleBack} className="flex items-center gap-2 border border-gray-300 w-full justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">Back</button>
          </div>
        </div>
      </div>
            </div>
   
            </div>
     
    </div>
  );
}
