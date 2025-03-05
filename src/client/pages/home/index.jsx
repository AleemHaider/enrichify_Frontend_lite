import React from 'react'
import EmailChart from '../../components/ui/EmailChart'
import VisitorsBarChart from '../../components/ui/VisitorsBarChart'
import StatsSection from './StatsSection'
import { useSelector } from 'react-redux'

const ClientHome = () => {
    const loading = useSelector(state => state.dashboardReducer.getDashboard.loading)
    console.log("loading: ", loading);

    return (
        <>
            {!loading ? <>
                <StatsSection />
                <div className='w-[250px h-[500px my-5 flex gap-6'>
                    <EmailChart heading="Email Sent" color="#396AFF" />
                    <EmailChart heading="Email Opened" color="#16DBCC" />
                </div>
                <VisitorsBarChart />
            </> : <p>Loading...</p>}
        </>
    )
}

export default ClientHome