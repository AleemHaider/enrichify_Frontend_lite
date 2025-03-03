import React, { useState } from 'react'
import InputField from '../../components/ui/InputField';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/ui/Loader';
// import { SLogo } from '../../../constants/Svgs';
import { useDispatch, useSelector } from 'react-redux';
// import { loginUser } from '../../../redux/auth/action';
import Logo from '../../../assets/images/logo.png'
import { loginClient } from '../../../redux/client-redux/auth/action';

export default function LoginForm() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({ email: "", password: "", secret_key: "" })
    const loading = useSelector((state) => state.clientAuthReducer.login.loading)
    const response = useSelector((state) => state.clientAuthReducer.login)

    const handleValues = (value, type) => {
        console.log(value, type);
        setData(prevState => ({
            ...prevState,
            [type]: value
        }))
        console.log(data);
    }

    const handelSubmit = () => {
        if (!data?.email || !data?.password || !data?.secret_key) {
            return toast.error("All fields are required")
        }
        console.log(data);
        dispatch(loginClient(data))
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 h-screen bg-[#F5F7FA]">
                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6 px-8 py-10 bg-white rounded-3xl shadow-md">
                        <div className="mx-auto mb-8">
                            <img src={Logo} alt='logo' className={"w-[165px] mx-auto"} />
                        </div>
                        <div className="mt-2">
                            <InputField label={"Enter Email"} type={"email"} value={data?.email} onChange={handleValues} />
                        </div>
                        <div>
                            <div className="mt-2">
                                <InputField label={"Password"} placeholder={"Enter Password"} type={"password"} value={data?.password} onChange={handleValues} />
                            </div>
                            <label htmlFor="" onClick={() => navigate("forgot-password")} className='text-red-500 text-sm mt-2 block text-end cursor-pointer'>Forget Password</label>
                        </div>
                        <div>
                            <div className="-mt-6">
                                <InputField label={"Secret Key"} placeholder={"Enter Secret Key"} type={"secret_key"} value={data?.secret_key} onChange={handleValues} />
                            </div>
                            {/* <label htmlFor="" onClick={() => navigate("forgot-password")} className='text-red-500 text-sm mt-2 block text-end cursor-pointer'>Forget Password</label> */}
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