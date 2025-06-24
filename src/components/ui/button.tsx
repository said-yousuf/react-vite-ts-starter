import { buttonVariants } from '@/lib/common';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Badge, badgeVariants } from './badge';

type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  } & {
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
  variant = 'primary',
  size,
  asChild = false,
  leftIcon,
  rightIcon,
  badgeText,
  badgeVariant = 'outline',
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  const badgeTextColor = variant === 'primary' ? 'text-white' : 'text-black';

  return (
    <Comp
      className={cn(
        'flex items-center gap-[6.5px]',
        cn(buttonVariants({ variant, size, className })),
        textColor && 'text-white'
      )}
      {...props}
    >
      <span className={cn(textColor)}>{leftIcon}</span>
      {props.children}
      {badgeText && (
        <Badge
          className={cn(textColor || badgeTextColor)}
          variant={badgeVariant}
        >
          {badgeText}
        </Badge>
      )}
      <span className={cn(textColor)}>{rightIcon}</span>
    </Comp>
  );
}

export { Button };
