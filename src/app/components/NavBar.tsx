'use client'
import { useSession } from 'next-auth/react'
import { Button } from './ui/Button'
import { signOut } from 'next-auth/react'

export function NavBar() {
  const { status } = useSession()

  return (
    <nav className="p-4 bg-gray-100">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold">Neighbour-help</h1>
          
       
        </div>

        <div className="flex items-center space-x-4">
          {status === 'unauthenticated'
            && <Button href="/register" variant="secondary">Register</Button>}
          {status === 'authenticated'
            ? <Button
                onClick={() => signOut({ callbackUrl: '/login' })}
                variant="secondary"
              >
              Log Out
              </Button>
            : <Button href="/login" variant="primary">Log In</Button>
          }
        </div>
      </div>
    </nav>
  )
}
