import * as React from 'react';
import { Info } from 'lucide-react';

import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface InputProps extends Omit<React.ComponentProps<'input'>, 'value'> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  hasLabelInfo?: boolean;
  labelInfo?: string;
  inputSize?: 'default' | 'sm' | 'lg';
  value?: string | number | File | Record<string, unknown> | null | undefined;
}

function Input({
  className,
  type,
  leftIcon,
  rightIcon,
  label,
  hasLabelInfo,
  labelInfo,
  inputSize = 'default',
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
    <div className="flex flex-col gap-1.5">
      {(label || hasLabelInfo) && (
        <div className="flex items-center gap-1">
          {label && <Label>{label}</Label>}
          {hasLabelInfo && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center text-muted-foreground"
                  >
                    <Info className="size-4" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{labelInfo}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground [&>svg]:size-4">
            {leftIcon}
          </div>
        )}

        <input
          type={type}
          data-slot="input"
          className={cn(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
            inputSize === 'sm' && 'h-8 px-2 text-sm',
            inputSize === 'default' && 'h-9',
            inputSize === 'lg' && 'h-10 px-4',
            leftIcon && 'pl-10',
            rightIcon && 'pr-10',
            className
          )}
          value={safeValue}
          {...props}
        />

        {rightIcon && (
          <div className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground [&>svg]:size-4">
            {rightIcon}
          </div>
        )}
      </div>
    </div>
  );
}

export { Input };
