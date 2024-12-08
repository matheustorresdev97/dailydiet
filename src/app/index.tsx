import { colors } from "@/styles/colors";
import { Feather } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function NewMeal() {
    return (
        <View className="flex-1">
            <View className="relative w-full h-32 items-center justify-center bg-gray-200">
                <TouchableOpacity className="absolute top-14 left-6" activeOpacity={0.7}>
                    <Feather
                        name="arrow-left"
                        size={24}
                        color={colors.gray[900]}
                    />
                </TouchableOpacity>
                <Text className="text-gray-950 font-bold text-lg leading-6">Nova refeição</Text>
            </View>
            <View className="flex-1 bg-gray-50 justify-between mt-[-32px] py-10 px-6 rounded-l-2xl rounded-r-2xl rounded-b-none">

            </View>
        </View>
    )
}