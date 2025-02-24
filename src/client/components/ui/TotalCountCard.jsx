import React from 'react'

const TotalCountCard = ({ d }) => {
    const { title, total, icon } = d
    return (
        <div className='bg-white rounded-3xl p-5 flex items-center'>
            <div className='flex items-center gap-4'>
                <img src={icon} alt='icon' className='w-12 h-12' />
                <div className='flex-1'>
                    <p className='text-sm text-[#718EBF]'>{title}</p>
                    <h3 className='text-xl font-semibold'>{total}</h3>
                </div>
            </div>
        </div>
    )
}

export default TotalCountCard