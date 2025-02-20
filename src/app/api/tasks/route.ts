import { getServerSession } from "next-auth"
import { authOptions } from '../auth/config'
import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'


export async function GET() {
  try {
    const tasks = await prisma.task.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(tasks)
  } catch (error) {
    console.error('Error in API route:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  console.log('POST /api/tasks - Starting request')
  const session = await getServerSession(authOptions)
  console.log('Session: in the rout', session)

  if (!session || !session.user || !session.user.name) {
    return NextResponse.json(
      { error: 'Unauthorized - User must be logged in' },
      { status: 401 }
    )
  }

  try {
    const json = await request.json()
    console.log('Request body:', json)
    
    if (!json.title || !json.description || !json.category) {
      console.log('Missing fields:', { title: json.title, description: json.description, category: json.category })
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Task creation logic
    const task = await prisma.task.create({
      data: {
        title: json.title,
        description: json.description,
        category: json.category,
        author: session.user.name,
      },
    });

    // Log the created task only if the creation was successful
    console.log('Created task:', task);
    return NextResponse.json(task, { status: 201 }); // Return the created task
  } catch (error) {
    console.error('Error in POST /api/tasks:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 
