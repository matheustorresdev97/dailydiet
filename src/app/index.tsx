import { Text, View } from "react-native";
import { CardStatistics } from "@/components/card-statistics";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Statistics() {
    return (
        <SafeAreaView className="flex-1">
            <CardStatistics />

            <View className="flex-1 bg-gray-50 gap-6 mt-[-32px] my-8 mx-6 rounded-l-2xl rounded-r-2xl rounded-b-none">
                <Text className="text-center text-gray-950 font-bold text-sm leading-4">Estatísticas gerais</Text>
                <View className="gap-3">
                    <Text>Dado 1</Text>
                    <Text>Dado 2</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}