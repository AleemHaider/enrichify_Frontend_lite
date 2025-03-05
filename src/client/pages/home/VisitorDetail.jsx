import React, { useState } from 'react'
import StatsSection from './StatsSection'
import DataTable from 'react-data-table-component'
import { useSelector } from 'react-redux'

const VisitorDetail = () => {
    const tabs = ["All Visitors", "Unique", "Repeated"]
    const [activeTab, setActiveTab] = useState("All Visitors")
    // const [filter, setFilter] = useState('all');
    const loading = useSelector(state => state.dashboardReducer.getDashboard.loading)
    const data = useSelector(state => state.dashboardReducer.getDashboard?.data?.visitor_data)
    console.log("loading: ", loading);

    const rawData = [
        {
            "id": "1",
            "ip_address": "203.128.10.186",
            "user_agent": "mozilla",
            "domain_url": "bitbot-3ppv76jja-shahzaibs-projects-5480f32e.vercel.app",
            "page_url": "https://bitbot-3ppv76jja-shahzaibs-projects-5480f32e.vercel.app/",
            "visit_time": "21-22-24 3:40",
            "state": "Punjab",
            "country": "Pakistan",
            "city": "Lahore",
            "isp": "Brain Telecommunication Ltd",
            "session_time": "5",
            "left_time": null,
            "secret_key": "8764ebb550fcc5e1c840bd3c9a361ac0",
            "zip_code": "54760",
            "created_at": "2025-02-26 12:56:38"
        },
        {
            "id": "2",
            "ip_address": "203.128.10.183",
            "user_agent": "mozilla",
            "domain_url": "bitbot-3ppv76jja-shahzaibs-projects-5480f32e.vercel.app",
            "page_url": "https://bitbot-3ppv76jja-shahzaibs-projects-5480f32e.vercel.app/",
            "visit_time": "21-22-24 3:40",
            "state": "Punjab",
            "country": "Pakistan",
            "city": "Lahore",
            "isp": "Brain Telecommunication Ltd",
            "session_time": "5",
            "left_time": null,
            "secret_key": "8764ebb550fcc5e1c840bd3c9a361ac0",
            "zip_code": "54760",
            "created_at": "2025-02-25 12:56:38"
        },
        {
            "id": "3",
            "ip_address": "203.128.10.13",
            "user_agent": "mozilla",
            "domain_url": "bitbot-3ppv76jja-shahzaibs-projects-5480f32e.vercel.app",
            "page_url": "https://bitbot-3ppv76jja-shahzaibs-projects-5480f32e.vercel.app/",
            "visit_time": "21-22-24 3:40",
            "state": "Punjab",
            "country": "Pakistan",
            "city": "Lahore",
            "isp": "Brain Telecommunication Ltd",
            "session_time": "5",
            "left_time": null,
            "secret_key": "8764ebb550fcc5e1c840bd3c9a361ac0",
            "zip_code": "54760",
            "created_at": "2025-02-25 12:56:38"
        },
        {
            "id": "4",
            "ip_address": "203.128.10.186",
            "user_agent": "mozilla",
            "domain_url": "bitbot-3ppv76jja-shahzaibs-projects-5480f32e.vercel.app",
            "page_url": "https://bitbot-3ppv76jja-shahzaibs-projects-5480f32e.vercel.app/",
            "visit_time": "21-22-24 3:40",
            "state": "Punjab",
            "country": "Pakistan",
            "city": "Lahore",
            "isp": "Brain Telecommunication Ltd",
            "session_time": "5",
            "left_time": null,
            "secret_key": "8764ebb550fcc5e1c840bd3c9a361ac0",
            "zip_code": "54760",
            "created_at": "2025-02-26 12:56:38"
        }
    ]

    const visitorCount = data?.reduce((acc, curr) => {
        acc[curr.ip_address] = (acc[curr.ip_address] || 0) + 1;
        return acc;
    }, {});

    // Step 2: Attach the visit count to each row
    const dataWithVisitCount = data?.map(row => ({
        ...row,
        visits: visitorCount[row.ip_address] || 0
    }));

    console.log("dataWithVisitCount: ", dataWithVisitCount, visitorCount);

    // Step 3: Filter data based on the active tab
    const filteredData = activeTab === 'Unique'
        ? dataWithVisitCount?.filter((row, index, self) => {
            // Show all IPs, but only show a repeated IP once
            return self.findIndex(r => r.ip_address === row.ip_address) === index;
        })
        : activeTab === 'Repeated'
            ? dataWithVisitCount?.filter((row, index, self) => {
                // Show only repeated IPs, and each IP should appear once
                return visitorCount[row.ip_address] > 1 && self.findIndex(r => r.ip_address === row.ip_address) === index;
            })
            : dataWithVisitCount;

    console.log("filteredData: ", filteredData);

    // const visitorCount = data?.reduce((acc, curr) => {
    //     acc[curr.ip_address] = (acc[curr.ip_address] || 0) + 1;
    //     return acc;
    // }, {});

    // console.log("visitorCount: ", visitorCount);


    // const filteredData = activeTab === 'Unique'
    //     ? data?.filter(row => row.visits === 1)
    //     : activeTab === 'Repeated'
    //         ? data?.filter(row => row.visits > 1)
    //         : data;

    const dat = [
        { ip_address: "192.168.1.58", state: "Punjab", city: "Lahore", zip_code: "54350", visit_time: "10 min, 20 sec", },
        { ip_address: "192.168.1.58", state: "Punjab", city: "Lahore", zip_code: "54350", visit_time: "10 min, 20 sec", },
        { ip_address: "192.168.1.58", state: "Punjab", city: "Lahore", zip_code: "54350", visit_time: "10 min, 20 sec", },
    ]

    const columns = [
        {
            name: "IP Address",
            selector: (row) => row.ip_address,
            sortable: true,
            wrap: true, // Allow text wrapping
            style: {
                minWidth: "150px", // Minimum width
                maxWidth: "300px", // Maximum width
            },
            headerStyle: { color: "#718EBF" },
        },
        {
            name: "State",
            selector: (row) => row.state,
            sortable: true,
            wrap: true, // Allow text wrapping
            style: {
                minWidth: "150px", // Minimum width
                maxWidth: "300px", // Maximum width
            },
            headerStyle: { color: "#718EBF" },
        },
        {
            name: "City",
            selector: (row) => row.city,
            sortable: true,
            wrap: true, // Allow text wrapping
            style: {
                minWidth: "150px", // Minimum width
                maxWidth: "300px", // Maximum width
            },
            headerStyle: { color: "#718EBF" },
        },
        {
            name: "Zip Code",
            selector: (row) => row.zip_code,
            sortable: true,
            wrap: true, // Allow text wrapping
            style: {
                minWidth: "150px", // Minimum width
                maxWidth: "300px", // Maximum width
            },
            headerStyle: { color: "#718EBF" },
        },
        {
            name: "Visit Duration",
            selector: (row) => row.visit_time,
            sortable: true,
            wrap: true, // Allow text wrapping
            style: {
                minWidth: "150px", // Minimum width
                maxWidth: "300px", // Maximum width
            },
            headerStyle: { color: "#718EBF" },
        },
    ]
    return (
        <div>
            {!loading ? <>
                <StatsSection />
                <div className="flex gap-4 my-5">
                    {tabs.map((t) => (
                        <h1 onClick={() => setActiveTab(t)} className={`px-3 py-1 w-fit font-medium border-b-[3px] cursor-pointer ${activeTab === t ? "text-cPrimary border-cPrimary" : "text-[#718EBF] border-transparent"} transition-all duration-300`}>{t}</h1>
                    ))}
                </div>

                <div className="rounded-3xl bg-white p-5">
                    <DataTable
                        columns={columns}
                        data={filteredData}
                        highlightOnHover
                        responsive
                        pagination
                    />
                </div>
            </> : <p>Loading...</p>}
        </div>
    )
}

export default VisitorDetail