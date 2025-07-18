import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

const cardVariants = cva(
  'rounded-lg border bg-card text-card-foreground shadow-sm',
  {
    variants: {
      variant: {
        default: 'border-gray-200',
        primary: 'border-primary-200 bg-primary-50',
        secondary: 'border-secondary-200 bg-secondary-50',
        accent: 'border-accent-200 bg-accent-50',
      },
      size: {
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
)

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cardVariants({ variant, size, className })}
        {...props}
      />
    )
  }
)

Card.displayName = 'Card'

export { Card, cardVariants }
