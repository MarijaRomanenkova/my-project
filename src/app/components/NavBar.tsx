'use client'
import { useSession } from 'next-auth/react'
import { Button } from './ui/Button'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

export function NavBar() {
  const { status } = useSession()

  return (
    <nav className="p-4 bg-gray-100">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-6">
          <h1 className="text-xl font-bold">Neighbour-help</h1>
          
          {status === 'authenticated' && (
            <div className="flex space-x-4">
              <Link 
                href="/"
                className="px-3 py-2 text-gray-700 hover:text-gray-900"
              >
                Find
              </Link>
              
              <DropdownMenu.Root>
                <DropdownMenu.Trigger className="px-3 py-2 text-gray-700 hover:text-gray-900">
                  Tasks
                </DropdownMenu.Trigger>
                
                <DropdownMenu.Portal>
                  <DropdownMenu.Content className="min-w-[200px] bg-white rounded-md shadow-lg p-2">
                    <DropdownMenu.Item className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                      <Link href="/tasks">All Tasks</Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded cursor-pointer">
                      <Link href="/tasks/create">Create Task</Link>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          )}
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
