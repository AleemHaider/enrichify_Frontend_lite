import React from 'react'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const EmailChart = ({ heading, color }) => {
    const data = [
        { name: 'Page A', uv: 500, pv: 2400, amt: 2400 },
        { name: 'Page A', uv: 200, pv: 2400, amt: 2400 },
        { name: 'Page A', uv: 900, pv: 2400, amt: 2400 },
        { name: 'Page A', uv: 100, pv: 2400, amt: 2400 },
        { name: 'Page A', uv: 500, pv: 2600, amt: 2100 },
        { name: 'Page A', uv: 600, pv: 2700, amt: 2400 },
    ];
    return (
        <div className='w-full'>
            <div className="flex justify-between items-center my-4">
                <h1 className='text-base font-semibold text-[#333B69]'>{heading}</h1>
                <p className='text-sm font- text-[#8A8A8A] cursor-pointer'>view details</p>
            </div>
            <div className='bg-white rounded-3xl w-[600px w-auto h-[300px p-3 pt-6'>
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                        <Line type="monotone" dataKey="uv" stroke={color} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default EmailChart