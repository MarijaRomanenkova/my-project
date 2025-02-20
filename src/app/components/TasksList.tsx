'use client'

import { forwardRef, useEffect, useState, useImperativeHandle } from 'react'
import { TaskCard } from '@/app/components/TaskCard'

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
        <TaskCard
          key={task.id}
          title={task.title}
          description={task.description}
          category={task.category}
          author={task.author}
          createdAt={task.createdAt}
        />
      ))}
    </div>
  )
})

TasksList.displayName = 'TasksList'
