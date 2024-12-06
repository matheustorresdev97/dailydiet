import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import clsx from 'clsx';
import { styled } from 'nativewind';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = {
  variant?: ButtonVariant;
} & React.ComponentProps<typeof Pressable>;

function Button({ variant = 'primary', className, ...rest }: ButtonProps) {
  const [isFocused, setIsFocused] = useState(false);

  const containerClasses = clsx(
    'flex-1 min-h-[50px] max-h-[50px] w-full px-6 flex items-center justify-center gap-3 rounded-lg',
    {
      'bg-gray-900': variant === 'primary' && !isFocused,
      'bg-gray-950': variant === 'primary' && isFocused,
      'bg-transparent border border-gray-950': variant === 'secondary' && !isFocused,
      'bg-gray-200 border border-gray-950': variant === 'secondary' && isFocused,
    },
    className
  );

  return (
    <Pressable
      className={containerClasses}
      onPressIn={() => setIsFocused(true)}
      onPressOut={() => setIsFocused(false)}
      {...rest}
    />
  );
}

type TitleProps = {
  variant?: ButtonVariant;
} & React.ComponentProps<typeof Text>;

function Title({ variant = 'primary', className, ...rest }: TitleProps) {
  const titleClasses = clsx(
    'font-bold text-sm',
    {
      'text-white': variant === 'primary',
      'text-gray-950': variant === 'secondary',
    },
    className
  );

  return <Text className={titleClasses} {...rest} />;
}

Button.Title = Title;

export { Button };
