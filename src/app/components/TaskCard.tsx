'use client';

import { useState } from 'react';

type TaskCardProps = {
  title: string
  description: string
  category: string
  author: string
  createdAt: string
 
}

export function TaskCard({ title, description, category, author, createdAt }: TaskCardProps) {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow relative">
      <div className="flex justify-between items-start">
        <div>
          <span className="inline-block px-2 py-1 text-sm bg-blue-100 text-blue-800 rounded">
            {category}
          </span>
          <h3 className="mt-2 text-lg font-semibold">{title}</h3>
        </div>
        
        <button onClick={toggleDropdown} className="p-1 hover:bg-gray-100 rounded">
          ⋮
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white p-2 rounded-md shadow-lg z-10">
            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer">
              Save
            </button>
            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 rounded cursor-pointer">
              Report
            </button>
          </div>
        )}
      </div>

      <p className="mt-2 text-gray-600">{description}</p>
      
      <div className="mt-4 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          <span>{author}</span>
          <span className="mx-2">•</span>
          <span>{createdAt}</span>
        </div>
        
      </div>
    </div>
  );
} 
