import { cva } from 'class-variance-authority';

export const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 [&>svg]:size-3 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow]',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90',
        outline: 'text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        ghost:
          'border-transparent bg-background [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        success: 'border-transparent bg-green-light text-green-inverted',
        warning: 'border-transparent bg-yellow-light text-yellow-dark',
        error: 'border-transparent bg-red-lighter text-red-inverted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);
