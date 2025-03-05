import React, { useEffect, useState } from 'react'
import InputField from '../../../components/ui/InputField';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../../components/ui/Loader';
// import { SLogo } from '../../../constants/Svgs';
import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../../../redux/auth/action';
import Logo from '../../../../assets/images/logo.png'
import OtpInputs from './OtpInputs';
import { clientForgotPassword, clientResetPassword, emptyForgot } from '../../../../redux/client-redux/auth/action';

export default function ClientOtpScreen() {
    // const response = useSelector((state) => state?.authReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [otp, setOtp] = useState(new Array(6).fill(''));
    const [moveFocus, setMoveFocus] = useState(null);
    const [step, setStep] = useState("email");
    const loading = useSelector((state) => state.clientAuthReducer.loading)
    const [data, setData] = useState({ email: "", new_password: "", confirm_password: "", secret_key: "" })
    const forgotResponse = useSelector((state) => state.clientAuthReducer.forgotPassword)
    const resetResponse = useSelector((state) => state.clientAuthReducer.resetPassword)

    const handleValues = (value, type) => {
        console.log(value, type);
        setData(prevState => ({
            ...prevState,
            [type]: value
        }))
        console.log(data);
    }

    useEffect(() => {
        const forgot_email = localStorage.getItem("forgot-email", data.email)
        const secret_key = localStorage.getItem("secret-key", data.secret_key)
        if (forgot_email && secret_key) {
            setData(prevState => ({
                ...prevState,
                email: forgot_email,
                secret_key: secret_key
            }))
            setStep("otp")
        }
    }, [])

    useEffect(() => {
        if (forgotResponse?.status) {
            setStep("otp")
            localStorage.setItem("forgot-email", data.email)
            localStorage.setItem("secret-key", data.secret_key)
        }
    }, [forgotResponse?.status])

    console.log("resetResponse: ", resetResponse);


    useEffect(() => {
        if (resetResponse?.status) {
            setStep(() => "email")
            localStorage.removeItem("forgot-email")
            localStorage.removeItem("secret-key")
            // navigate("/client")
            window.location.href = '/#/client'
            dispatch(emptyForgot())
        }
    }, [resetResponse?.status])

    const handelSubmit = () => {
        console.log("astartdf", { ...data, reset_token: otp }, data.new_password === data.confirm_password, otp.length, otp.includes(''), otp.join(''));
        if (!data?.email || !data?.secret_key) {
            return toast.error("All fields are required")
        } else if (step === "email") {
            dispatch(clientForgotPassword(data))
        }
        else if (!data?.email || !data?.secret_key || !data?.new_password || !data.confirm_password || otp.includes('')) {
            return toast.error("All fields are required")
        } else if (data.new_password !== data.confirm_password) {
            return toast.error("Confirm Password did not match")
        } else if (step === "otp") {
            console.log("adf", { ...data, reset_token: otp.join('') });
            dispatch(clientResetPassword({ ...data, reset_token: otp.join('') }))
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 h-screen bg-[#F5F7FA]">
                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6 px-8 py-10 bg-white rounded-3xl shadow-md">
                        <div className="mx-auto mb-8">
                            <img src={Logo} alt='logo' className={"w-[165px] mx-auto"} />
                        </div>
                        <p className="text-gray-5 text-lg text-center font-medium">{data.email ? "An OTP has been sent to your email" : "Enter email to forgot password"}</p>
                        {step === "email" ?
                            <>
                                <div className="mt-2">
                                    <InputField label={"Email"} placeholder={"Enter Email"} type={"email"} value={data?.email} onChange={handleValues} />
                                </div>
                                <div className="mt-2">
                                    <InputField label={"Secret Key"} placeholder={"Enter Secret Key"} type={"secret_key"} value={data?.secret_key} onChange={handleValues} />
                                </div>
                            </> :
                            <>
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
                                        <InputField label={"New Password"} placeholder={"Enter New Password"} type={"password"} name={"new_password"} value={data?.new_password} onChange={handleValues} />
                                    </div>
                                    <div className="mt-2">
                                        <InputField label={"Confirm Password"} placeholder={"Enter Confirm Password"} type={"password"} name={"confirm_password"} value={data?.confirm_password} onChange={handleValues} />
                                    </div>
                                </div>
                            </>}
                        <div>
                            <button
                                type="submit"
                                onClick={handelSubmit}
                                className="bg-yellow500 bg-blue-600 hover:bg-blue-700 hover:shadow-lg flex w-full justify-center rounded-md px-3 py-[8px] text-sm font-semibold leading-[unset] text-white shadow-sm hover:bg-colorPrimaryHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-colorPrimary"
                            >
                                {!loading ? `${step === "email" ? 'Forgot' : 'Reset'} Password` : <Loader />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}