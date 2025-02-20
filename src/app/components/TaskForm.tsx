'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSession } from 'next-auth/react'; 

import { Button } from './ui/Button'
import { Input } from './ui/Input'


type FormData = {
  title: string;
  category: string;
  description: string;
};

export function TaskForm() {
  const [error, setError] = useState<string>('')
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const { data: session } = useSession(); 
  
 

  const onSubmit = async (formData: FormData) => {
    // Include user information in the task data
    const taskData = {
      ...formData,
      author: session?.user?.name || 'Unknown User', // Use the user's name or a default value
    
    };

    console.log(session, 'Current session before POST'); // Log the session

    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });

    if (response.ok) {
      // Handle successful task creation (e.g., reset form, show success message)
      console.log('Task created successfully:', taskData);
    } else {
      // Handle error
      const errorMessage = await response.text(); // Get the error message from the response
      console.error('Failed to create task:', errorMessage);
      setError('Failed to create task. Please try again.'); // Set error state to display
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        {error && (
          <div className="text-red-500 text-center">{error}</div>
        )}
      <Input
          id="title"
          label="Task Title"
          placeholder="Title"
          register={register}
          validation={{ required: 'Title is required' }}
          error={errors.title?.message}
        />

       

     <Input
          id="description"
          label="Description"
          placeholder="Description"
          register={register}
          validation={{ required: 'Description is required' }}
          error={errors.description?.message}
        />

      <Input
        id="category"
        label="Category"
        placeholder="Category"
        register={register}
        validation={{ required: 'Category is required' }}
        error={errors.category?.message}
      />

      <Button 
            type="submit" 
            variant="primary" 
            className="w-full"
          >
            Create Task
          </Button>
    </form>
  );
}
