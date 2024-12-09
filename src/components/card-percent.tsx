import { Text, TouchableOpacity, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import clsx from "clsx";


type PercentStyleProps = {
    variant?: "primary" | "secondary";
    onPress: () => void;
};

export default function CardPercent({ variant = "primary", onPress }: PercentStyleProps) {


    return (
        <View
            className={clsx(
                "flex-1 relative min-h-[102px] max-h-[102px] items-center justify-center gap-0.5 mb-10 rounded-lg",
                {
                    "bg-green-100": variant === "primary",
                    "bg-red-100": variant === "secondary",
                }
            )}

        >
            <TouchableOpacity activeOpacity={0.7}
                className="absolute top-2 right-2"
                onPress={onPress}
            >
                <Feather
                    name="arrow-up-right"
                    size={24}
                    className={clsx({
                        "text-green-500": variant === "primary",
                        "text-red-500": variant === "secondary",
                    })}
                />
            </TouchableOpacity>
            <Text className="font-bold text-2xl text-gray-950 leading-10">
                90,86%
            </Text>
            <Text className="font-regular text-sm text-gray-900 leading-4">
                das refeições dentro da dieta
            </Text>
        </View>
    );
}
