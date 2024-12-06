import clsx from 'clsx';
import { Pressable, Text, View } from 'react-native';

type ToggleVariant = 'primary' | 'secondary';

type ToggleProps = React.ComponentProps<'button'> & {
    variant?: ToggleVariant;
    isChecked?: boolean;
    title: string;
};

export function Toggle({
    variant = 'primary',
    isChecked = false,
    title,
    className,
    ...rest
}: ToggleProps) {
    const containerClasses = clsx(
        'flex max-h-[50px] min-h-[50px] px-4 flex-row items-center justify-center gap-2 rounded-md border',
        {
            'bg-green-100 border-green-500': variant === 'primary' && isChecked,
            'bg-red-100 border-red-600': variant === 'secondary' && isChecked,
            'bg-gray-100 border-gray-100': !isChecked,
        },
        className
    );

    const circleClasses = clsx(
        'w-2 h-2 rounded-full',
        {
            'bg-green-500': variant === 'primary',
            'bg-red-600': variant === 'secondary',
        }
    );

    const titleClasses = 'text-gray-950 font-bold text-sm leading-[18px]';

    return (
        <Pressable className={containerClasses} {...rest}>
            <View className={circleClasses} />
            <Text className={titleClasses}>{title}</Text>
        </Pressable>
    );
}
