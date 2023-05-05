import React, { useEffect, useState } from 'react'
import AuthButtons from './components/AuthButtons'
import AddTask from './components/AddTask'
import Task from './components/Task'


const App = () => {

  const [completedTasks, setCompletedTasks] = useState(null)
  const [incompleteTasks, setIncompleteTasks] = useState(null)
  const [taskTitle, setTaskTitle] = useState(null)
  const [taskDescription, setTaskDescription] = useState(null)
  const [taskCategory, setTaskCategory] = useState(null)

  const fetchCompletedTasks = async () => {
    try {

      const queryParams = new URLSearchParams([
        ['completed', 'True']
      ])

      const response = await fetch (`/api/tasks?${queryParams}`, {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token', null)}`
        }
      })
      const data = await response.json()
      setCompletedTasks(data)

    } catch (error) {
      console.log(error)
    }
  }

  const fetchIncompleteTasks = async () => {

    const queryParams = new URLSearchParams([
      ['completed', 'False']
    ])

    const response = await fetch(`/api/tasks?${queryParams}`, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token', null)}`
      }
    })
    const data = await response.json()
    setIncompleteTasks(data)

  }


  useEffect(() => {

    fetchCompletedTasks()
    fetchIncompleteTasks()

  }, [])


  {/* <small className='font-italize'>You need to have an account and logged-in to see your tasks after a reload and on your next visit</small> */}
  return (
    <div className='h-screen w-screen bg-gradient-to-br from-[#44D9F9] via-pink-500 to-red-500 flex flex-col justify-center items-center'>

      <div className='flex flex-col items-center w-[100%] h-[100%]'>

        <div className='flex justify-end self-end mt-6 mr-6'>
            <AuthButtons />
        </div>
        
        <div className='flex justify-center mb-2'>
            <h1 className='font-bold text-[32px] text-bl font-poppins text-white'>TodoEngine - TASK MANAGEMENT APP</h1>
        </div>

        <div className='shadow bg-gradient-to-br from-[#44D9F9] via-pink-400 to-red-400 w-[80%] h-[75%] flex flex-col justify-center items-center'>
          
          <div className='items-center justify-center h-[100%] w-[100%]'>
              <div className='text-center'>
                  <AddTask />
              </div>
              <div className='text-center mt-6 mb-2'>
                  <p className='font-bold text-[22px] text-bl font-poppins text-white'>NOT COMPLETED</p>
                  {incompleteTasks && incompleteTasks.results && incompleteTasks.results.map((task, index) => {
                      return (
                        <Task {...task} key={index} />
                      )
                    })
                  }
                 {(incompleteTasks == null || incompleteTasks.results.length <= 0) && (
                    <small>All tasks have been completed, contratulations :)...</small>
                  )
                 }
              </div>
              <div className='text-center'>
                  <p className='font-bold text-[22px] text-bl font-poppins text-white'>COMPLETED</p>
                  {completedTasks && completedTasks.results && completedTasks.results.map((task, index) => {
                      return (
                        <Task {...task} key={index} />
                      )
                    })
                  }
                  {(completedTasks == null || completedTasks.results.length <= 0) && (
                    <small>No completed tasks found, create new tasks...</small>
                  )
                 }
              </div>
          </div>
        </div>
      </div>

    </div>
  )
};

export default App
