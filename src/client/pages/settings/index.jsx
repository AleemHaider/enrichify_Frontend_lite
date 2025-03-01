import React, { useState } from 'react'
import { toast } from 'react-toastify';
import InputField from '../../components/ui/InputField';

const Settings = () => {
    const [data, setData] = useState({ cPassword: "", nPassword: "", })

    const handleValues = (value, type) => {
        console.log(value, type);
        setData(prevState => ({
            ...prevState,
            [type]: value
        }))
        console.log(data);
    }

    const handelSubmit = () => {
        if (!data?.cPassword || !data?.nPassword) {
            return toast.error("All fields are required")
        }
        console.log(data);
        // dispatch(loginUser(data))
    }
    return (
        <div className='bg-white rounded-3xl p-5'>
            <h1 className='px-2 py-1 text-cPrimary border-b-[3px] border-cPrimary w-fit font-medium'>Edit Profile</h1>
            <h1 className='text-[#333B69] font-medium w-fit mt-6 mb-3 text-[17px]'>Change Password</h1>
            <div className="mt-">
                <InputField label={"Current Password"} placeholder={"Current Password"} type={"password"} value={data?.cPassword} onChange={handleValues} />
            </div>
            <div className="mt-3">
                <InputField label={"New Password"} placeholder={"New Password"} type={"password"} value={data?.nPassword} onChange={handleValues} />
            </div>
            <div className='text-end'>
                <button className='py-1.5 px-8 bg-cPrimary text-white rounded-xl mt-5'>Save</button>
            </div>
        </div>
    )
}

export default Settings