import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import TotalCountCard from '../../components/ui/TotalCountCard'
import visitorIcon from '../../assets/svg/VisitorPerson.svg'
import EmailSentIcon from '../../assets/svg/EmailSent.svg'
import EmailOpenIcon from '../../assets/svg/EmailOpen.svg'
import { getDashboard } from '../../../redux/client-redux/dashboard/action'

const StatsSection = () => {
    const dispatch = useDispatch()
    const [stats, setStats] = useState([])
    const data = useSelector(state => state.dashboardReducer.getDashboard.data)

    useEffect(() => {
        if (!data) {
            console.log("getdat");
            dispatch(getDashboard())
        }
    }, [data])

    useEffect(() => {
        if (data) {
            setStats(() => ([
                { title: "Visitors", total: data?.visitor_data?.length, icon: visitorIcon },
                { title: "Emails Sent", total: data?.mail_data?.length, icon: EmailSentIcon },
                { title: "Emails Opened", total: data?.mail_data?.length, icon: EmailOpenIcon },
            ]))
        }
    }, [data])

    return (
        <>
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
                {stats?.map((d, index) => (<TotalCountCard d={d} key={index} />))}
            </div>
        </>
    )
}

export default StatsSection