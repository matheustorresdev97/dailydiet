import { useState, type RefObject } from 'react';
import { TextInput, TextInputProps, View, Text } from 'react-native';

type InputProps = TextInputProps & {
    label?: string;
    inputRef?: RefObject<TextInput>;
    className?: string;
    inputClassName?: string; 
};

export function Input({
    label,
    inputRef,
    className = '',
    inputClassName = '',
    onFocus,
    onBlur,
    ...rest
}: InputProps) {
    const [isFocused, setFocused] = useState(false);

    return (
        <View className={`w-fullflex flex-col gap-1 ${className}`}>
            {label && (
                <Text className="text-gray-900 font-bold text-sm leading-[18px]">
                    {label}
                </Text>
            )}
            <TextInput
                ref={inputRef}
                className={`min-h-[48px] px-4 py-[10px] rounded-md border text-gray-950 text-base leading-[20px] ${
                    isFocused ? 'border-gray-600' : 'border-gray-200'
                } ${inputClassName}`}
                onFocus={(e) => {
                    setFocused(true);
                    onFocus?.(e);
                }}
                onBlur={(e) => {
                    setFocused(false);
                    onBlur?.(e);
                }}
                {...rest}
            />
        </View>
    );
}
