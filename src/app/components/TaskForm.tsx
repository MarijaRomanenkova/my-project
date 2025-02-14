'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as Dialog from '@radix-ui/react-dialog'
import * as Select from '@radix-ui/react-select'
import { Button } from './ui/Button'
import { Input } from './ui/Input'

type TaskFormData = {
  title: string
  description: string
  category: string
}

export function TaskForm({ onTaskCreated }: { onTaskCreated: () => void }) {
  const [open, setOpen] = useState(false)
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm<TaskFormData>()

  const onSubmit = async (data: TaskFormData) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        reset()
        setOpen(false)
        onTaskCreated()
      }
    } catch (error) {
      console.error('Error creating task:', error)
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button variant="primary">Add New Task</Button>
      </Dialog.Trigger>
      
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg w-full max-w-md">
          <Dialog.Title className="text-xl font-bold mb-4">Create New Task</Dialog.Title>
          <Dialog.Description className="text-sm text-gray-500 mb-4">
            Fill in the details below to create a new task.
          </Dialog.Description>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              id="title"
              label="Title"
              register={register}
              validation={{ required: 'Title is required' }}
              error={errors.title?.message}
            />

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                {...register('description', { required: 'Description is required' })}
                className="w-full p-2 border rounded focus:ring-indigo-500 focus:border-indigo-500"
                rows={3}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <Select.Root
                onValueChange={(value) => setValue('category', value, { shouldValidate: true })}
              >
                <Select.Trigger className="w-full p-2 border rounded">
                  <Select.Value placeholder="Select a category" />
                </Select.Trigger>
                <Select.Portal>
                  <Select.Content className="bg-white border rounded shadow-lg">
                    <Select.Viewport>
                      {['Work', 'Personal', 'Shopping'].map((category) => (
                        <Select.Item 
                          key={category.toLowerCase()} 
                          value={category.toLowerCase()}
                          className="p-2 hover:bg-gray-100 cursor-pointer"
                        >
                          <Select.ItemText>{category}</Select.ItemText>
                        </Select.Item>
                      ))}
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>
              )}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Dialog.Close asChild>
                <Button variant="secondary">Cancel</Button>
              </Dialog.Close>
              <Button type="submit" variant="primary">Create Task</Button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
