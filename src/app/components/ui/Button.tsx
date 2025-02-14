import Link from 'next/link'

type ButtonProps = {
  children: React.ReactNode
  type?: 'submit' | 'button'
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'danger'
  className?: string
  disabled?: boolean
  href?: string
}

export function Button({ 
  children, 
  type = 'button', 
  onClick, 
  variant = 'primary',
  className = '',
  disabled = false,
  href
}: ButtonProps) {
  const baseStyles = "group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
  
  const variants = {
    primary: `text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    secondary: `text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500 
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`,
    danger: `text-white bg-red-600 hover:bg-red-700 focus:ring-red-500 
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`
  }

  const styles = `${baseStyles} ${variants[variant]} ${className}`

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={styles}
    >
      {children}
    </button>
  )
} 
