import React, { useState } from 'react'
import { FaCheck, FaTrash, FaEdit } from 'react-icons/fa'
import { deleteTask, toggleTaskCompletion } from '../helpers'
import UpdateTaskComponent from './UpdateTask'


const Task = ({ task, sn, bgColor, onAction }) => {

    const [showFullDescription, setShowFullDescription] = useState(false);
    const [showUpdateForm, setShowUpdateForm] = useState(false)
    const truncateDescription = (description, length) => {
        return showFullDescription || description.length <= length
          ? description
          : description.substring(0, length) + " ...";
      };
      
    const handleDelete = async () => {
        await deleteTask(task.id);
        onAction();
    }
    
    const handleUpdate = async () => {
        if(showUpdateForm) {
            onAction();
        }
        setShowUpdateForm(!showUpdateForm)
    }
    
    const handleToggleCompletion = async () => {
        await toggleTaskCompletion(task.id);
        onAction();
    }

    const categoryName = task.category ? task.category.name : '';

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className={`${bgColor} flex flex-col sm:flex-row items-center justify-between m-2 w-full sm:w-[70%]`}>
                <div className='flex flex-col sm:flex-row items-center'>
                    <div className='bg-indigo-900 rounded-full w-[30px] h-[30px] mx-2 mt-4 sm:mt-0'>
                        <p className='text-white font-bold text-center'>{sn+1}</p>
                    </div>
                    <div>
                        <p className='p-2'>{task.title}</p>
                    </div>
                    <div className='flex items-center rounded-md bg-red-400 shadow-sm shadow-black'>
                        <p className='p-[2px]'>{categoryName}</p>
                    </div>
                    <div>
                        <p className="p-2">
                            {truncateDescription(task.description, 30)}
                            {task.description.length > 30 && (
                            <span
                                className="cursor-pointer"
                                onClick={() => setShowFullDescription(!showFullDescription)}
                            >
                                {!showFullDescription ? '▼' : '▲'}
                            </span>
                            )}
                        </p>
                    </div>
                </div>
                <div className='items-center p-3'>
                    {!task.completed && <button className='mx-2 text-indigo-900' onClick={handleUpdate}><FaEdit /></button>}
                    <button className='mx-2 text-indigo-900' onClick={handleDelete}><FaTrash /></button>
                    {!task.completed && <button className='mx-2 text-indigo-900' onClick={handleToggleCompletion}><FaCheck /></button>}
                </div>
            </div>
            <div className='flex w-full sm:w-[70%] justify-center'>
                {showUpdateForm && <UpdateTaskComponent task={task} onAction={() => { onAction(); setShowUpdateForm(false) }} />}
            </div>
        </div>
    )
}

export default Task