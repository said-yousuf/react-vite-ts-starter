import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { Info } from 'lucide-react';
import * as React from 'react';

const inputVariants = cva(
  'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input inline-flex h-9 w-full min-w-0 rounded-lg border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:ring-[2px] [&:not(:invalid)]:focus-visible:border-primary [&:not(:invalid)]:focus-visible:border-2 [&:not(:invalid)]:focus-visible:ring-blue-500/30 [&:invalid]:border-red-500 [&:invalid]:focus-visible:border-red-500 [&:invalid]:focus-visible:ring-red-400/50 [&:not(:placeholder-shown)]:bg-white',
  {
    variants: {
      variant: {
        default: '',
        outline: 'border-2',
        ghost: 'border-0 bg-transparent shadow-none',
      },
      inputSize: {
        default: 'h-9 px-3 py-1',
        sm: 'h-8 px-2 py-0.5 text-sm',
        lg: 'h-10 px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default',
    },
  }
);

export interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size' | 'value'>,
    VariantProps<typeof inputVariants> {
  inputSize?: 'default' | 'sm' | 'lg';
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  hasLabelInfo?: boolean;
  labelInfo?: string;
  value?: string | number | File | Record<string, unknown> | null | undefined;
}

function Input({
  className,
  type,
  variant,
  inputSize,
  leftIcon,
  rightIcon,
  label,
  hasLabelInfo,
  labelInfo,
  value,
  ...props
}: InputProps) {
  const safeValue = React.useMemo(() => {
    if (value === undefined || value === null) {
      return '';
    }

    if (typeof value === 'string' || typeof value === 'number') {
      return value.toString();
    }

    return '';
  }, [value]);

  return (
    <div className="flex flex-col">
      <div className="flex mb-1 items-center gap-1">
        {label && <Label>{label}</Label>}
        {hasLabelInfo && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Info className="size-4 text-gray-500" />
              </TooltipTrigger>
              <TooltipContent>
                <p>{labelInfo}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      <div className="relative group">
        {leftIcon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground [&>svg]:size-4">
            {leftIcon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            inputVariants({ variant, inputSize, className }),
            'z-0',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10'
          )}
          placeholder={props.placeholder || ''}
          value={safeValue}
          onChange={(e) => {
            props.onChange?.(e);
          }}
          {...props}
        />
        {rightIcon && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground [&>svg]:size-4">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export { Input, inputVariants };
