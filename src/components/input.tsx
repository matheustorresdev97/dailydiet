import { useState, type RefObject } from 'react';
import clsx from 'clsx';
import { View } from 'react-native';

type InputProps = React.ComponentProps<'input'> & {
    label?: string;
    inputRef?: RefObject<HTMLInputElement>;
};

export function Input({ label, inputRef, className, ...rest }: InputProps) {
    const [isFocused, setFocused] = useState(false);

    const inputContainerClasses = clsx(
        'h-12 px-4 flex items-center gap-2 rounded-lg border text-gray-950 text-base leading-5',
        {
            'border-gray-600': isFocused,
            'border-gray-200': !isFocused,
        },
        className
    );

    const labelClasses = 'text-gray-900 font-bold text-sm leading-[18px]';

    return (
        <View className='flex-1 max-h-[70px] flex-col gap-1'>
            {label && <label className={labelClasses}>{label}</label>}
            <input
                ref={inputRef}
                className={inputContainerClasses}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                {...rest}
            />
        </View>
    );
}
