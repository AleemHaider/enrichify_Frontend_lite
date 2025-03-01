import React from 'react'
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const VisitorsBarChart = () => {
    const navigate = useNavigate()
    const data = [
        {
            name: 'Page A',
            uv: 4000,
            pv: 2400,
            amt: 2400,
        },
        {
            name: 'Page B',
            uv: 3000,
            pv: 1398,
            amt: 2210,
        },
        {
            name: 'Page C',
            uv: 2000,
            pv: 9800,
            amt: 2290,
        },
        {
            name: 'Page D',
            uv: 2780,
            pv: 3908,
            amt: 2000,
        },
        {
            name: 'Page E',
            uv: 1890,
            pv: 4800,
            amt: 2181,
        },
        {
            name: 'Page F',
            uv: 2390,
            pv: 3800,
            amt: 2500,
        },
        {
            name: 'Page G',
            uv: 3490,
            pv: 4300,
            amt: 2100,
        },
    ];
    return (
        <div className='w-full'>
            <div className="flex justify-between items-center my-4">
                <h1 className='text-base font-semibold text-[#333B69]'>Visitors Overview</h1>
                <p onClick={() => navigate("visitors")} className='text-sm font- text-[#8A8A8A] cursor-pointer'>view details</p>
            </div>
            <div className='bg-white rounded-3xl w-auto p-3'>
                <p className='text-[#718EBF] ms-7 mb-5 mt-3 text-s'><span className='text-gray-700'>7,560</span> Unique Visitors & <span className='text-gray-700'>$5,420</span> Repeated Visitors</p>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5, }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="pv" fill="#FCAA0B" activeBar={<Rectangle fill="#FCAA0B" stroke="#FCAA0B" />} />
                        <Bar dataKey="uv" fill="#1A16F3" activeBar={<Rectangle fill="#1A16F3" stroke="#1A16F3" />} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default VisitorsBarChart