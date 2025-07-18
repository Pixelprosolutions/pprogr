import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        primary: 'bg-primary-600 text-white hover:bg-primary-700 focus-visible:ring-primary-500',
        secondary: 'bg-secondary-600 text-white hover:bg-secondary-700 focus-visible:ring-secondary-500',
        accent: 'bg-accent-600 text-white hover:bg-accent-700 focus-visible:ring-accent-500',
        outline: 'border border-gray-300 bg-transparent hover:bg-gray-50 text-gray-700',
        ghost: 'bg-transparent hover:bg-gray-100 text-gray-700',
        link: 'text-primary-600 hover:text-primary-800 underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Show loading spinner */
  isLoading?: boolean
  /** Button should take full width of container */
  fullWidth?: boolean
}

/**
 * A customizable button component with multiple variants and sizes.
 * 
 * @example
 * <Button variant="primary" size="md">Click me</Button>
 */
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, fullWidth, children, ...props }, ref) => {
    return (
      <button
        className={buttonVariants({
          variant,
          size,
          className: [
            className,
            fullWidth && 'w-full',
            isLoading && 'pointer-events-none',
          ].filter(Boolean).join(' '),
        })}
        ref={ref}
        disabled={isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            <span className="opacity-70">{children}</span>
          </span>
        ) : (
          children
        )}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
