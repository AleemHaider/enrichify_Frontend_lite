import React, { useState } from 'react'
import InputField from '../../../components/ui/InputField';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../../components/ui/Loader';
// import { SLogo } from '../../../constants/Svgs';
import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../../../redux/auth/action';
import Logo from '../../../../assets/images/logo.png'
import OtpInputs from './OtpInputs';

export default function OtpScreen() {
    // const response = useSelector((state) => state?.authReducer)
    const loading = useSelector((state) => state.authReducer.loading)
    const dispatch = useDispatch();
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [moveFocus, setMoveFocus] = useState(null);
    const [data, setData] = useState({ email: "", password: "", })

    const handleValues = (value, type) => {
        console.log(value, type);
        setData(prevState => ({
            ...prevState,
            [type]: value
        }))
        console.log(data);
    }

    const handelSubmit = () => {
        if (!data?.email || !data?.password) {
            return toast.error("All fields are required")
        }
        console.log(data);
        // dispatch(loginUser(data))
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 h-screen bg-[#F5F7FA]">
                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6 px-8 py-10 bg-white rounded-3xl shadow-md">
                        <div className="mx-auto mb-8">
                            <img src={Logo} alt='logo' className={"w-[165px] mx-auto"} />
                        </div>
                        <p className="text-gray-5 text-lg text-center font-medium">An OTP has been sent to your email</p>
                        {/* <p className="text-gray-500 text-sm text-center">A verification code has been sent to your phone number and email. The code is valid for 10 minutes</p> */}
                        <div className="mt-2">
                            {/* <InputField label={"Enter Email"} type={"email"} value={data?.email} onChange={handleValues} /> */}
                            <label htmlFor={""} className='text-sm font-semibol'>OTP Verification</label>
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
                        </div>
                        <div>
                            <div className="mt-2">
                                <InputField label={"Create Password"} placeholder={"Enter Password"} type={"password"} value={data?.password} onChange={handleValues} />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                onClick={handelSubmit}
                                className="bg-yellow500 bg-blue-600 hover:bg-blue-700 hover:shadow-lg flex w-full justify-center rounded-md px-3 py-[8px] text-sm font-semibold leading-[unset] text-white shadow-sm hover:bg-colorPrimaryHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-colorPrimary"
                            >
                                {!loading ? "Login" : <Loader />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}