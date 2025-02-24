import React from 'react'
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const EmailChart = () => {
    const data = [
        { name: 'Page A', uv: 500, pv: 2400, amt: 2400 },
        { name: 'Page A', uv: 200, pv: 2400, amt: 2400 },
        { name: 'Page A', uv: 900, pv: 2400, amt: 2400 },
        { name: 'Page A', uv: 100, pv: 2400, amt: 2400 },
        { name: 'Page A', uv: 500, pv: 2600, amt: 2100 },
        { name: 'Page A', uv: 600, pv: 2700, amt: 2400 },
    ];
    return (
        <div className='bg-white w-[600px] h-[300px] p-3'>
            <ResponsiveContainer  width="100%" height={300}>
                <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <Line type="monotone" dataKey="uv" stroke="#396AFF" />
                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}

export default EmailChart