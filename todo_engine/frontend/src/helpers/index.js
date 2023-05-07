
const backend_url = '/api/tasks/'

const isAuthenticated = () => {
    return ((localStorage.getItem('token', null) !== null) && (localStorage.getItem('token', null) !== undefined))
}

const deleteTask = async (taskId) => {
    if(isAuthenticated()) {
        const response = await fetch(`${backend_url}/${taskId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem('token', null)}`
            }
        })

        return await response.json()

    } else {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
        const updatedTasks = tasks.filter((task) => task.id !== taskId)
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    }
}

const updateTask = async (taskId, updatedTaskData) => {
    if(isAuthenticated()) {
        const response = await fetch(`${backend_url}/${taskId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${localStorage.getItem('token', null)}`
            },
            body: JSON.stringify(updatedTaskData),
        })

        return await response.json()

    } else {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
        const updatedTasks = tasks.map((task) => task.id === taskId ? updatedTaskData : task)
        localStorage.setItem('tasks', JSON.stringify(updatedTasks))
    }
}

const toggleTaskCompletion = async (taskId) => {
    const tasks = isAuthenticated() ? await fetchIncompleteTasks() : JSON.parse(localStorage.getItem('tasks') || '[]')
    const task = tasks.find(task => task.id == taskId)
    if(task) {
        const updateTaskData = {...task, completed: !task.completed}
        await updateTask(taskId, updateTaskData)
    }
}

const fetchFromLocalStorage = (completed) => {
    localStorage.getItem('tasks') == 'undefined' ? localStorage.setItem('tasks', '[]') : localStorage.getItem('tasks')
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    return tasks.filter(task => task.completed === completed)
}

const fetchCompletedTasks = async () => {
    try {

      if(isAuthenticated()) {
            const queryParams = new URLSearchParams([
                ['completed', 'True']
            ])
        
            const response = await fetch (`${backend_url}?${queryParams}`, {
                headers: {
                'Authorization': `Token ${localStorage.getItem('token', null)}`
                }
            })
            
            return await response.json()
      } else {
        return fetchFromLocalStorage(true)
      }

    } catch (error) {
      console.log(error)
    }
}

const fetchIncompleteTasks = async () => {

    try {
        if(isAuthenticated()) {
            const queryParams = new URLSearchParams([
                ['completed', 'False']
            ])
        
            const response = await fetch(`${backend_url}?${queryParams}`, {
                headers: {
                'Authorization': `Token ${localStorage.getItem('token', null)}`
                }
            })
        
            return await response.json()
        } else {
            return fetchFromLocalStorage(false)
        }
    } catch (error) {
        console.log(error)
    }
}

const saveToLocalStorage = (taskData) => {
    const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
    tasks.push({ ...taskData, id: Date.now() })
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

const saveToDatabase = async (taskData, token=null) => {
    try {
        if(isAuthenticated()) {
            const response = await fetch(backend_url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Token ${token}`,
                },
                body: JSON.stringify(taskData)
            })
        
            return await response.json()

        } else {
            saveToLocalStorage(taskData)
        }

    } catch (error) {
        console.log(error)
    }
}

export { fetchCompletedTasks, fetchIncompleteTasks, saveToDatabase, deleteTask, updateTask, toggleTaskCompletion };
