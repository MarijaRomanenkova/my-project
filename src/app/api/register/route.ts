import { prisma } from '../../../../lib/prisma'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  try {
    const json = await request.json()

    // Validate required fields
    if (!json.name || !json.email || !json.password || !json.age || !json.district) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate username format
    const nameRegex = /^[a-zA-Z0-9_-]+$/
    if (!nameRegex.test(json.name)) {
      return NextResponse.json(
        { error: 'Invalid username format' },
        { status: 400 }
      )
    }

    // Check if username or email already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { name: json.name },
          { email: json.email }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Username or email already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(json.password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name: json.name,
        email: json.email.toLowerCase(),
        password: hashedPassword,
        age: parseInt(json.age),
        district: json.district,
      },
      select: {
        id: true,
        name: true,
        email: true,
        age: true,
        district: true,
        createdAt: true,
      }
    })

    return NextResponse.json(user, { status: 201 })
  } catch (err) {
    console.error('Error creating user:', err)
    return NextResponse.json(
      { error: 'Error creating user' },
      { status: 500 }
    )
  }
} 
