import React from 'react'
import TotalCountCard from '../../components/ui/TotalCountCard'
import visitorIcon from '../../assets/svg/VisitorPerson.svg'
import EmailSentIcon from '../../assets/svg/EmailSent.svg'
import EmailOpenIcon from '../../assets/svg/EmailOpen.svg'
import SpentInvoice from '../../assets/svg/SpentInvoice.svg'
import EmailChart from '../../components/ui/EmailChart'

const ClientHome = () => {
    const data = [
        { title: "Visitors", total: "12,750", icon: visitorIcon },
        { title: "Emails Sent", total: "5,460", icon: EmailSentIcon },
        { title: "Emails Opened", total: "3,460", icon: EmailOpenIcon },
        { title: "Total Spend", total: "$7,920", icon: SpentInvoice },
    ]
    return (
        <>
            <div className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4'>
                {data.map((d, index) => (<TotalCountCard d={d} key={index} />))}
            </div>
            <div className='w-[250px] h-[500px]'>
                <EmailChart />
            </div>
        </>
    )
}

export default ClientHome