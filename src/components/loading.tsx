import { colors } from "@/styles/colors";
import { ActivityIndicator, View } from "react-native";

export function Loading() {
    return (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator color={colors.gray[600]} size={24} />
        </View>
    )
}