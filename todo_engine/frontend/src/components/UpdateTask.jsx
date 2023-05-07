import React, { useState } from 'react'
import { updateTask } from '../helpers'
import Button from './Button'


const UpdateTaskComponent = ({ task, onAction }) => {

    const [taskTitle, setTaskTitle] = useState(task.title)
    const [taskDescription, setTaskDescription] = useState(task.description)
    const [taskCategory, setTaskCategory] = useState(task.category)
    const [completed, setCompleted] = useState(task.completed)

    const handleUpdateTask = async () => {

        if(!taskTitle) {
            alert('Task title is required')
        } else {
            const taskData = {
              title: taskTitle,
              description: taskDescription,
              category: taskCategory,
              completed: completed,
            }
    
            await updateTask(task.id, taskData)
            await onAction()
    
            setTaskTitle('')
            setTaskDescription('')
            setTaskCategory('')
            setCompleted(false)
        }
      }

    return (
        <div className='flex flex-col justify-center w-[80%]'>
            <input 
                type="text" 
                name="title" 
                value={taskTitle}
                placeholder='task title'
                className='mb-4 p-2 w-full bg-transparent outline-none border-black border-b-[1px]'
                onChange={(e) => setTaskTitle(e.target.value)}
            />
            <input 
                type="text"
                name="description" 
                value={taskDescription}
                placeholder='task description (optional)'
                className='p-2 w-full bg-transparent outline-none border-black border-b-[1px]'
                onChange={(e) => setTaskDescription(e.target.value)}
            />
            <input 
                type="text"
                name="category" 
                value={taskCategory}
                placeholder='task category (optional)'
                className='mt-4 p-2 w-full bg-transparent outline-none border-black border-b-[1px]'
                onChange={(e) => setTaskCategory(e.target.value)}
            />
            <div className='flex flex-row justify-center'>
                <div className=''>
                    <Button title='CLOSE'
                        buttonColor='bg-red-500'
                        onClick={() => {
                            setTaskTitle('');
                            setTaskDescription('');
                            setTaskCategory('');
                            setCompleted(false);
                        }}
                    />
                </div>
                <div className='ml-4'>
                    <Button 
                        title='UPDATE'
                        buttonColor='bg-green-500'
                        onClick={handleUpdateTask}
                    />
                    </div>
            </div>
        </div>
    )
}

export default UpdateTaskComponent
