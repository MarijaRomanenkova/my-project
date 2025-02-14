'use client'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Input } from './ui/Input'
import { Button } from './ui/Button'

type LoginFormInputs = {
  email: string
  password: string
}

export function LoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>()

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (response?.error) {
        setError('Invalid credentials')
      } else {
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An error occurred')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      {error && (
        <div className="text-red-500 text-center">{error}</div>
      )}
      <Input
        id="email"
        label="Email address"
        type="email"
        placeholder="Email address"
        register={register}
        validation={{
          required: 'Email is required',
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address'
          }
        }}
        error={errors.email?.message}
      />
      <Input
        id="password"
        label="Password"
        type="password"
        placeholder="Password"
        register={register}
        validation={{
          required: 'Password is required',
          minLength: {
            value: 6,
            message: 'Password must be at least 6 characters'
          }
        }}
        error={errors.password?.message}
      />
      <Button type="submit" variant="primary">
        Log In
      </Button>
    </form>
  )
} 
