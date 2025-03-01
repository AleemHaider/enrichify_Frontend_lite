import React, { useState } from 'react'
import StatsSection from './StatsSection'
import DataTable from 'react-data-table-component'

const VisitorDetail = () => {
    const tabs = ["All Visitors", "Unique", "Repeated"]
    const [activeTab, setActiveTab] = useState("All Visitors")
    const data = [
        { ip: "192.168.1.58", state: "Punjab", city: "Lahore", zip: "54350", visit: "10 min, 20 sec", },
        { ip: "192.168.1.58", state: "Punjab", city: "Lahore", zip: "54350", visit: "10 min, 20 sec", },
        { ip: "192.168.1.58", state: "Punjab", city: "Lahore", zip: "54350", visit: "10 min, 20 sec", },
    ]

    const columns = [
        {
            name: "IP Address",
            selector: (row) => row.ip,
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
            selector: (row) => row.zip,
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
            selector: (row) => row.visit,
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
            <StatsSection />
            <div className="flex gap-4 my-5">
                {tabs.map((t) => (
                    <h1 onClick={() => setActiveTab(t)} className={`px-3 py-1 w-fit font-medium border-b-[3px] cursor-pointer ${activeTab === t ? "text-cPrimary border-cPrimary" : "text-[#718EBF] border-transparent"} transition-all duration-300`}>{t}</h1>
                ))}
            </div>

            <div className="rounded-3xl bg-white p-5">
                <DataTable
                    columns={columns}
                    data={data}
                    highlightOnHover
                    responsive
                    pagination
                />
            </div>
        </div>
    )
}

export default VisitorDetail