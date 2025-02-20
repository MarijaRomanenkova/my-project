'use client'

import { useSession } from 'next-auth/react';
import { TaskForm } from '@/app/components/TaskForm'

export default function Test() {
  const { data: session } = useSession();

  return (
    <>
    {session ? (
      <>
      <div>Here is a test page</div>
      <TaskForm />
      </>
    ) : (
      <div>Please log in to create a task.</div>
    )}
     {session && (
      <p>Signed in as {session.user?.email}</p>
     )}


    </>
  )
}

