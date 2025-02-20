'use client'
import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from './ui/Button'
import { Input } from './ui/Input'
import { Checkbox } from './ui/Checkbox'

type RegisterFormData = {
  name: string
  age: number
  district: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export function RegisterForm() {
  const router = useRouter()
  const [error, setError] = useState<string>('')
  const { control, register, handleSubmit, watch, formState: { errors } } = useForm<RegisterFormData>({
    defaultValues: {
      acceptTerms: false, // Set default value for the checkbox
    },
  });
  
  const password = watch('password')
  const acceptTerms = watch('acceptTerms')

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/login') // Redirect to login after successful registration
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Registration failed')
      }
    } catch (error) {
      console.error('Error creating user:', error)
      setError('An error occurred during registration')
    }
  }

  return (
    <div className="max-w-md w-full space-y-8">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Create Account
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        {error && (
          <div className="text-red-500 text-center">{error}</div>
        )}
        
        <Input
          id="name"
          label="Username"
          placeholder="Username"
          register={register}
          validation={{
            required: 'Username is required',
            pattern: {
              value: /^[a-zA-Z0-9_-]+$/,
              message: 'Username can only contain letters, numbers, underscores and dashes'
            }
          }}
          error={errors.name?.message}
        />

        <Input
          id="age"
          label="Age"
          type="number"
          placeholder="Age"
          register={register}
          validation={{
            required: 'Age is required',
            min: { value: 13, message: 'Must be at least 13 years old' }
          }}
          error={errors.age?.message}
        />

        <Input
          id="district"
          label="District"
          placeholder="District"
          register={register}
          validation={{ required: 'District is required' }}
          error={errors.district?.message}
        />

        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="Email"
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
            minLength: { value: 8, message: 'Password must be at least 8 characters' }
          }}
          error={errors.password?.message}
        />

        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          register={register}
          validation={{
            required: 'Please confirm your password',
            validate: (value: string) => 
              value === password || 'Passwords do not match'
          }}
          error={errors.confirmPassword?.message}
        />
        <div className="flex items-center">
          <Controller
            name="acceptTerms"
            control={control}
            rules={{ required: 'You must accept the Terms and Conditions' }}
            render={({ field: { onChange, value } }) => (
              <Checkbox
                isChecked={value}
                onChange={onChange}
              />
            )}
          />
          <label 
            htmlFor="acceptTerms" 
            className="ml-2 block text-sm text-gray-900 select-none"
          >
            I agree to the{' '}
            <Link 
              href="/terms" 
              className="text-indigo-600 hover:text-indigo-500 underline"
            >
              Terms and Conditions
            </Link>
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="mt-1 text-sm text-red-500">{errors.acceptTerms.message}</p>
        )}

        <div>
          <Button 
            type="submit" 
            variant="primary" 
            className="w-full"
            disabled={!acceptTerms}
          >
            Create Account
          </Button>
        </div>
      </form>
    </div>
  )
} 
