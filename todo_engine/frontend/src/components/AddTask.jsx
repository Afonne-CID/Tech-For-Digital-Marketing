import React from 'react'
import AddButton from './AddButton'


const AddTask = () => (
    <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-row justify-center w-[100%]'>
            <input type="text" name="title" className='mt-6 mb-4 p-2 w-[60%] bg-transparent outline-none border-black border-b-[1px]'/>
            <AddButton />
        </div>
        <input type="text" name="description" className='p-2 w-[60%] bg-transparent outline-none border-black border-b-[1px]'/>
        <input type="text" name="category" className='mt-4 p-2 w-[60%] bg-transparent outline-none border-black border-b-[1px]'/>
        <AddButton />
    </div>
)

export default AddTask
