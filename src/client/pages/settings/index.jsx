import React, { useState } from 'react'
import { toast } from 'react-toastify';
import InputField from '../../components/ui/InputField';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../../../redux/client-redux/dashboard/action';

const Settings = () => {
    const dispatch = useDispatch()
    const [data, setData] = useState({ old_password: "", new_password: "", confirm_password: "" })

    const handleValues = (value, type) => {
        console.log(value, type);
        setData(prevState => ({
            ...prevState,
            [type]: value
        }))
        console.log(data);
    }

    const handelSubmit = () => {
        if (!data?.old_password || !data?.new_password || !data?.confirm_password) {
            return toast.error("All fields are required")
        }
        dispatch(updatePassword(data))
        setData({ old_password: "", new_password: "", confirm_password: "" })
    }
    return (
        <div className='bg-white rounded-3xl p-5'>
            <h1 className='px-2 py-1 text-cPrimary border-b-[3px] border-cPrimary w-fit font-medium'>Edit Profile</h1>
            <h1 className='text-[#333B69] font-medium w-fit mt-6 mb-3 text-[17px]'>Change Password</h1>
            <div className="mt-">
                <InputField label={"Current Password"} placeholder={"Current Password"} type={"password"} value={data?.old_password} name={"old_password"} onChange={handleValues} />
            </div>
            <div className="mt-3">
                <InputField label={"New Password"} placeholder={"New Password"} type={"password"} value={data?.new_password} name={"new_password"} onChange={handleValues} />
            </div>
            <div className="mt-3">
                <InputField label={"Confirm Password"} placeholder={"Confirm Password"} type={"password"} value={data?.confirm_password} name={"confirm_password"} onChange={handleValues} />
            </div>
            <div className='text-end'>
                <button onClick={handelSubmit} className='py-1.5 px-8 bg-cPrimary text-white rounded-xl mt-5'>Save</button>
            </div>
        </div>
    )
}

export default Settings