import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const VisitorsBarChart = () => {
    const navigate = useNavigate()
    const data = useSelector(state => state.dashboardReducer.getDashboard.data)

    // const rawData = [
    //     { "id": "1", "ip_address": "203.128.10.185", "created_at": "2025-02-26 12:56:38" },
    //     { "id": "2", "ip_address": "203.128.10.183", "created_at": "2025-02-25 12:56:38" },
    //     { "id": "2", "ip_address": "203.128.10.183", "created_at": "2025-02-25 12:56:38" },
    //     { "id": "3", "ip_address": "203.128.10.13", "created_at": "2025-02-25 12:56:38" },
    //     { "id": "4", "ip_address": "203.128.10.186", "created_at": "2025-02-26 12:56:38" }
    // ];
    const rawData = [
        { "id": "1", "ip_address": "203.128.10.186", "created_at": "2025-02-26 12:56:38" },
        { "id": "2", "ip_address": "203.128.10.183", "created_at": "2025-02-25 12:56:38" },
        { "id": "3", "ip_address": "203.128.10.13", "created_at": "2025-02-25 12:56:38" },
        { "id": "4", "ip_address": "203.128.10.186", "created_at": "2025-02-26 12:56:38" },
        { "id": "5", "ip_address": "203.128.10.150", "created_at": "2025-02-15 12:56:38" },
        { "id": "6", "ip_address": "203.128.10.250", "created_at": "2025-02-20 12:56:38" },
        { "id": "7", "ip_address": "203.128.10.100", "created_at": "2025-02-18 12:56:38" },
        { "id": "7", "ip_address": "203.128.10.100", "created_at": "2025-02-01 12:56:38" },
        { "id": "7", "ip_address": "203.128.10.100", "created_at": "2025-02-01 12:56:38" },
        { "id": "7", "ip_address": "203.128.10.100", "created_at": "2025-02-02 12:56:38" },
        { "id": "7", "ip_address": "203.128.10.100", "created_at": "2025-01-01 12:56:38" },
    ];

    const groupDataByDate = (data) => {
        return data?.reduce((acc, curr) => {
            const date = curr.created_at.split(' ')[0]; // Get the date part from created_at
            if (!acc[date]) acc[date] = [];
            acc[date].push(curr.ip_address);
            return acc;
        }, {});
    };

    // Prepare data for graph: Count unique and repeated IPs per date
    const prepareGraphData = (groupedData) => {
        return Object?.keys(groupedData).map(date => {
            const ips = groupedData[date];
            const uniqueIps = [...new Set(ips)].length;  // Count unique IPs
            const repeatedIps = ips.length - uniqueIps;  // Count repeated IPs

            return {
                date,
                unique: uniqueIps,
                repeated: repeatedIps
            };
        });
    };

    // Filter to keep only the latest 7 days of data
    const getLatest7DaysData = (data) => {
        // Sort the data by date in descending order
        const sortedData = data.sort((a, b) => new Date(b.date) - new Date(a.date));

        // Slice to get the most recent 7 days
        return sortedData.slice(0, 7);
    };

    const groupedData = data && groupDataByDate(data?.visitor_data);   // Group data by date
    const graphData = data && prepareGraphData(groupedData); // Prepare data for graph

    // Get the latest 7 days
    const latest7DaysData = data && getLatest7DaysData(graphData);

    console.log("dataForGraph: ", groupedData, graphData, latest7DaysData);


    const dataa = [
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
                {/* <p className='text-[#718EBF] ms-7 mb-5 mt-3 text-s'><span className='text-gray-700'>7,560</span> Unique Visitors & <span className='text-gray-700'>$5,420</span> Repeated Visitors</p> */}
                {data && <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={latest7DaysData} margin={{ top: 5, right: 30, left: 20, bottom: 5, }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="repeated" fill="#FCAA0B" activeBar={<Rectangle fill="#FCAA0B" stroke="#FCAA0B" />} />
                        <Bar dataKey="unique" fill="#1A16F3" activeBar={<Rectangle fill="#1A16F3" stroke="#1A16F3" />} />
                    </BarChart>
                </ResponsiveContainer>}
            </div>
        </div>
    )
}

export default VisitorsBarChart