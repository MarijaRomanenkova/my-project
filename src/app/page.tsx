'use client'
import { useRef } from 'react'
import { TasksList } from '@/app/components/TasksList'


export default function Home() {
  const listRef = useRef<{ fetchTasks: () => void }>({ fetchTasks: () => {} })
  
  return (
    <main className="container mx-auto p-4">
      <TasksList ref={listRef}/>
    </main>
  )
} 

