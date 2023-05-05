import React from 'react'

const Task = ({ status, sn, title, description, category }) => {
    return (
        <div className={`flex ${status == 1 ? 'bg-green-400' : 'bg-red-400'}`}>
            <div className=''>
                <div className='flex-row'>
                    <p className='p-2'>{sn}</p>
                    <p className='p-2'>{title}</p>
                    <p className='p-2'>{category}</p>
                </div>
                <div className=''>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    )
}

export default Task