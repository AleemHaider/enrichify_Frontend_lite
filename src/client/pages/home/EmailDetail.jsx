import React, { useState } from 'react'
import StatsSection from './StatsSection'
import DataTable from 'react-data-table-component'
import { useSelector } from 'react-redux'
import ModalShowTemplate from '../../components/ui/ModalShowTemplate'

const EmailDetail = () => {
    const loading = useSelector(state => state.dashboardReducer.getDashboard.loading)
    const data = useSelector(state => state.dashboardReducer.getDashboard?.data?.mail_data)

    const columns = [
        {
            name: "From Email",
            selector: (row) => row.from_email,
            sortable: true,
            wrap: false, // Allow text wrapping
        },
        {
            name: "To Email",
            selector: (row) => row.to_email,
            sortable: true,
            wrap: false, // Allow text wrapping
        },
        {
            name: "Subject",
            selector: (row) => row.subject,
            sortable: true,
            wrap: false, // Allow text wrapping
        },
        {
            name: "Template",
            selector: (row) => <ModalShowTemplate template={row.body} />,
            sortable: true,
            wrap: false, // Allow text wrapping
        },
        {
            name: "Status",
            selector: (row) => row.status === "send" ? <p className='bg-[#3994ff] p-1.5 rounded text-white'>Sent</p> : <p className='bg-[#16DBCC] p-1.5 rounded text-white'>Opened</p>,
            sortable: true,
            wrap: false, // Allow text wrapping
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