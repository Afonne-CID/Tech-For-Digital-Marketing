import React, { useState } from 'react'
import { saveToDatabase } from '../helpers'
import Button from './Button'


const AddTask = ({ onAddTask }) => {

    const [clickedAddButton, setClickedAddButton] = useState(false)
    const [taskTitle, setTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [taskCategory, setTaskCategory] = useState('')

    const handleAddTask = async () => {

        if(!taskTitle) {
            alert('Task title is required')
        } else {
            const taskData = {
              title: taskTitle,
              description: taskDescription,
              category: taskCategory,
              completed: false,
            }
    
            const token = localStorage.getItem('token', null)
            await saveToDatabase(taskData, token)
    
            await onAddTask()
    
            setClickedAddButton(false)
            setTaskTitle('')
            setTaskDescription('')
            setTaskCategory('')
        }
      }

    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-row justify-center w-[100%]'>
                <input 
                    type="text" 
                    name="title" 
                    value={taskTitle}
                    placeholder='task title'
                    className='mt-6 mb-4 p-2 w-[60%] bg-transparent outline-none border-black border-b-[1px]'
                    onChange={(e) => setTaskTitle(e.target.value)}
                />
                {!clickedAddButton && <Button title='ADD' onClick={() => setClickedAddButton(true)} />}
            </div>
            {clickedAddButton && (
                <div className='flex flex-col items-center justify-center w-[100%]'>
                    <input 
                        type="text"
                        name="description" 
                        value={taskDescription}
                        placeholder='task description (optional)'
                        className='p-2 w-[60%] bg-transparent outline-none border-black border-b-[1px]'
                        onChange={(e) => setTaskDescription(e.target.value)}
                    />
                    <input 
                        type="text"
                        name="category" 
                        value={taskCategory}
                        placeholder='task category (optional)'
                        className='mt-4 p-2 w-[60%] bg-transparent outline-none border-black border-b-[1px]'
                        onChange={(e) => setTaskCategory(e.target.value)}
                    />
                    <div className='flex flex-row justify-center'>
                        <div className=''>
                            <Button title='CLOSE'
                                buttonColor='bg-red-500'
                                onClick={() => {
                                    setClickedAddButton(false); 
                                    setTaskTitle('');
                                    setTaskDescription('');
                                    setTaskCategory('');
                                }}
                            />
                        </div>
                        <div className='ml-4'>
                            <Button 
                                title='ADD'
                                buttonColor='bg-green-500'
                                onClick={handleAddTask}
                            />
                            </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AddTask
