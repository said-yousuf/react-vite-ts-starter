import * as React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { Info } from 'lucide-react';

import { Label } from '@/components/ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { inputVariants } from './input.variants';


export interface InputProps
  extends Omit<React.ComponentProps<'input'>, 'size' | 'value'>,
    VariantProps<typeof inputVariants> {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  label?: string;
  hasLabelInfo?: boolean;
  labelInfo?: string;
  value?: string | number | File | Record<string, unknown> | null | undefined;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
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
    },
    ref
  ) => {
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
            ref={ref}
            data-slot="input"
            type={type}
            className={cn(
              inputVariants({ variant, inputSize }),
              leftIcon && 'pl-10',
              rightIcon && 'pr-10',
              className
            )}
            placeholder={props.placeholder ?? ''}
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
);

Input.displayName = 'Input';

export { Input };
