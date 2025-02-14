'use client'

import { forwardRef, useEffect, useState, useImperativeHandle } from 'react'

type Task = {
  id: string
  title: string
  description: string
  category: string
  author: string
  createdAt: string
}

export const TasksList = forwardRef((_, ref) => {
  const [tasks, setTasks] = useState<Task[]>([])

  const fetchTasks = async () => {
    const response = await fetch('/api/tasks')
    if (response.ok) {
      const data = await response.json()
      setTasks(data)
    }
  }

  useImperativeHandle(ref, () => ({
    fetchTasks
  }))

  useEffect(() => {
    fetchTasks()
  }, [])

  return (
    <div className="grid gap-4 mt-6">
      {tasks.map((task) => (
        <div key={task.id} className="p-4 border rounded-lg">
          <h3 className="font-bold">{task.title}</h3>
          <p>{task.description}</p>
          <div className="mt-2 text-sm text-gray-500">
            <span className="mr-2">{task.category}</span>
            <span>by {task.author}</span>
          </div>
        </div>
      ))}
    </div>
  )
})

TasksList.displayName = 'TasksList'
