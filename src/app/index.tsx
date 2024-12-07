import { Text, View } from "react-native";
import { CardStatistics } from "@/components/card-statistics";
import { SafeAreaView } from "react-native-safe-area-context";
import { CardContent } from "@/components/card-content";

export default function Statistics() {
    return (
        <View className="flex-1">
            <CardStatistics />

            <View className=" bg-gray-50 gap-6 mt-[-32px] my-8 px-6 rounded-l-2xl rounded-r-2xl rounded-b-none">
                <Text className="text-center text-gray-950 font-bold text-sm leading-4 pt-8">Estatísticas gerais</Text>
                <View className="flex-col gap-3">
                    <CardContent color="gray" number={22} description="melhor sequencia de pratos dentro da dieta" />
                    <CardContent color="gray" number={109} description="refeições registradas" />

                    <View className="flex-row gap-3">
                        <CardContent className="flex-1" color="green" number={99} description="refeições dentro da dieta" />
                        <CardContent className="flex-1" color="red" number={10} description="refeições fora da dieta" />
                    </View>
                </View>
            </View>
        </View>
    )
}