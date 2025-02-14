import { useState } from 'react';

const Checkbox = ({ isChecked, onChange }: { isChecked: boolean, onChange: (checked: boolean) => void }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="hidden" // Hide the default checkbox
      />
      <div
        className={`w-5 h-5 border-2 rounded-md flex items-center justify-center transition-colors duration-200 ${
          isChecked ? 'bg-indigo-600 border-indigo-600' : 'bg-white border-gray-300'
        }`}
      >
        {isChecked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-3 h-3 text-white"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
    </label>
  );
};
export default Checkbox;
