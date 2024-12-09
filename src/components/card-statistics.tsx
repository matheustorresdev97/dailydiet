import { Feather } from "@expo/vector-icons";
import clsx from "clsx";
import { Text, TouchableOpacity, View } from "react-native";

type CardStatisticsProps = {
    variant?: "primary" | "secondary";
    onPress: () => void;
};

export function CardStatistics({ variant = 'primary', onPress }: CardStatisticsProps) {
    return (
        <View className={clsx(
            "flex-1 relative items-center justify-center min-h-[200px] max-h-[200px] gap-0.5", {
            "bg-green-100": variant === "primary",
            "bg-red-100": variant === "secondary",
        }
        )}
        >
            <TouchableOpacity className="absolute top-14 left-6" onPress={onPress}>
                <Feather
                    name="arrow-left"
                    size={24}
                    className={clsx({
                        "text-green-500": variant === "primary",
                        "text-red-600": variant === "secondary",
                    })}
                />
            </TouchableOpacity>
            <Text className="font-regular text-2xl text-gray-950 leading-10">90,86%</Text>
            <Text className="font-regular text-sm text-gray-900 leading-5">das refeições dentro da dieta</Text>
        </View>
    )
}