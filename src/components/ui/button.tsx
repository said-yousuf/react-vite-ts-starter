import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Badge } from './badge';
import { badgeVariants } from './badge.variants';
import { buttonVariants } from './button.variants';

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    badgeText?: string;
    badgeVariant?: VariantProps<typeof badgeVariants>['variant'];
    textColor?: string;
  };

function Button({
  className,
  textColor,
  variant = 'default',
  size,
  asChild = false,
  leftIcon,
  rightIcon,
  badgeText,
  badgeVariant = 'outline',
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }), textColor)}
      {...props}
    >
      {leftIcon && <span className="inline-flex items-center">{leftIcon}</span>}
      {children}
      {badgeText && (
        <Badge className={textColor} variant={badgeVariant}>
          {badgeText}
        </Badge>
      )}
      {rightIcon && <span className="inline-flex items-center">{rightIcon}</span>}
    </Comp>
  );
}

export { Button };
