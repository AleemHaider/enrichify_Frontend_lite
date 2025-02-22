import React, { useState } from 'react'
import InputField from '../../components/ui/InputField';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/ui/Loader';
import { SLogo } from '../../../constants/Svgs';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../redux/auth/action';

export default function LoginForm() {
    // const response = useSelector((state) => state?.authReducer)
    const loading = useSelector((state) => state.authReducer.loading)
    const dispatch = useDispatch();
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
        dispatch(loginUser(data))
    }

    return (
        <>
            <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8 h-screen">
                <div className="mx-auto">
                    <SLogo logoSize={"w-[120px] lg:w-[140px]"} />
                </div>
                <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="space-y-6">
                        <div className="mt-2">
                            <InputField label={"Enter Email"} type={"email"} value={data?.email} onChange={handleValues} />
                        </div>
                        <div>
                            <div className="mt-2">
                                <InputField label={"Password"} placeholder={"Enter Password"} type={"password"} value={data?.password} onChange={handleValues} />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                onClick={handelSubmit}
                                className="bg-yellow500 bg-gray-900 hover:bg-gray-950 hover:shadow-lg flex w-full justify-center rounded-md bg-colorPrimary px-3 py-1.5 text-sm font-semibold leading-[unset] text-white shadow-sm hover:bg-colorPrimaryHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-colorPrimary"
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