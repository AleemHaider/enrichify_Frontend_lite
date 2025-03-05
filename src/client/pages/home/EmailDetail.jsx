import React, { useState } from 'react'
import StatsSection from './StatsSection'
import DataTable from 'react-data-table-component'
import { useSelector } from 'react-redux'
import ModalShowTemplate from '../../components/ui/ModalShowTemplate'

const EmailDetail = () => {
    const loading = useSelector(state => state.dashboardReducer.getDashboard.loading)
    const data = useSelector(state => state.dashboardReducer.getDashboard?.data?.mail_data)
    console.log("loading: ", loading);

    const columns = [
        {
            name: "From Email",
            selector: (row) => row.from_email,
            sortable: true,
            wrap: false, // Allow text wrapping
            style: {
                minWidth: "150px", // Minimum width
                maxWidth: "300px", // Maximum width
            },
        },
        {
            name: "To Email",
            selector: (row) => row.to_email,
            sortable: true,
            wrap: false, // Allow text wrapping
            style: {
                minWidth: "150px", // Minimum width
                maxWidth: "300px", // Maximum width
            },
        },
        {
            name: "Subject",
            selector: (row) => row.subject,
            sortable: true,
            wrap: false, // Allow text wrapping
            style: {
                minWidth: "150px", // Minimum width
                maxWidth: "300px", // Maximum width
            },
        },
        {
            name: "Template",
            selector: (row) => <ModalShowTemplate template={row.body} />,
            sortable: true,
            wrap: false, // Allow text wrapping
            style: {
                minWidth: "150px", // Minimum width
                maxWidth: "300px", // Maximum width
            },
        },
        {
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
            wrap: false, // Allow text wrapping
            style: {
                minWidth: "150px", // Minimum width
                maxWidth: "300px", // Maximum width
            },
        },
    ]
    return (
        <div>
            {!loading ? <>
                <StatsSection />
                <div className="rounded-3xl bg-white p-5 mt-7">
                    <DataTable
                        columns={columns}
                        data={data}
                        highlightOnHover
                        responsive
                        pagination
                    />
                </div>
            </> : <p>Loading...</p>}
        </div>
    )
}

export default EmailDetail