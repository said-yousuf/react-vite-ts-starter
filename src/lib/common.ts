import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  "inline-flex items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none",
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-primary-foreground shadow-xs hover:bg-blue-600 focus-visible:border-blue-400 focus-visible:ring-blue-400/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        secondary:
          'bg-background border-1 border-gray-200 text-secondary-foreground shadow-xs hover:bg-gray-200 focus-visible:border-blue-400 focus-visible:ring-blue-500 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        titiary:
          'bg-white border-1 border-gray-200 text-secondary-foreground shadow-xs hover:bg-gray-100 focus-visible:border-blue-400 focus-visible:ring-blue-500 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        ghost:
          'hover:bg-white hover:text-accent-foreground dark:hover:bg-gray-50 focus-visible:border-accent focus-visible:ring-accent/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        link: 'text-gray-500 underline hover:text-gray-700 focus-visible:border-primary focus-visible:ring-primary/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
      },
      size: {
        primary: 'h-10 py-2.5 px-3 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 px-3 has-[>svg]:px-2.5',
        lg: 'h-12 px-6 has-[>svg]:px-4',
        icon: 'size-9 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'primary',
    },
  }
);
