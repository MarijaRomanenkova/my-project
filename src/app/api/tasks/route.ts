import { getServerSession } from "next-auth"
import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
import { authOptions } from '../auth/config'

export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(tasks)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions)
  
  if (!session?.user?.name) {
    return NextResponse.json(
      { error: 'Unauthorized - User must be logged in' },
      { status: 401 }
    )
  }

  try {
    const json = await request.json()
    
    if (!json.title || !json.description || !json.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const task = await prisma.task.create({
      data: {
        title: json.title,
        description: json.description,
        category: json.category,
        author: session.user.name,
      },
    })

    return NextResponse.json(task, { status: 201 })
  } catch (err) {
    console.error('Error creating task:', err)
    return NextResponse.json(
      { error: 'Error creating task' },
      { status: 500 }
    )
  }
} 
