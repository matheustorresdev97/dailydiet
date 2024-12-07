import clsx from "clsx";
import { Text, View } from "react-native";

type CardContentProps = {
    color: 'green' | 'red' | 'gray'
    number: number
    description: string
    className?: string
}

export function CardContent({ color, number, description, className }: CardContentProps) {
    return (
        <View 
        className={clsx(
            "items-center justify-center p-4 gap-2 rounded-lg", {
            "bg-green-100": color === "green",
            "bg-red-100": color === "red",
            "bg-gray-100": color === "gray"
        },
        className
        )}>
            <Text className="text-gray-950 font-bold text-xl leading-8">
                {number}
            </Text>
            <Text className="text-center text-gray-900 font-regular text-sm leading-5">
                {description}
            </Text>
        </View>
    )
}