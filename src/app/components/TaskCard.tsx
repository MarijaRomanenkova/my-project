'use client';

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';

type TaskCardProps = {
  title: string;
  description: string;
  category: string;
  author: string;
  date: string;
  onRespond: () => void;
}

export function TaskCard({ title, description, category, author, date, onRespond }: TaskCardProps) {
  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <span className="inline-block px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded">
            {category}
          </span>
          <h3 className="mt-2 text-lg font-semibold">{title}</h3>
        </div>
        
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="p-1 hover:bg-gray-100 rounded">
            ⋮
          </DropdownMenu.Trigger>
          
          <DropdownMenu.Portal>
            <DropdownMenu.Content className="bg-white p-2 rounded-md shadow-lg">
              <DropdownMenu.Item className="px-4 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer">
                Save
              </DropdownMenu.Item>
              <DropdownMenu.Item className="px-4 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer">
                Report
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      <p className="mt-2 text-gray-600">{description}</p>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <span>{author}</span>
          <span className="mx-2">•</span>
          <span>{date}</span>
        </div>
        <button 
          onClick={onRespond}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          Respond
        </button>
      </div>
    </div>
  );
} 
