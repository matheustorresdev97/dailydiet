import { Text, View } from "react-native";
import { CardStatistics } from "@/components/card-statistics";
import { CardContent } from "@/components/card-content";
import { useRouter } from "expo-router";
import { useMealsStore } from "@/store/meals";

export default function Statistics() {
    const router = useRouter();
    const { getMealsStatistics } = useMealsStore()

    const {
        bestSequenceInDiet,
        totalMeals,
        totalMealsInDiet,
        totalMealsOutDiet,
    } = getMealsStatistics()

    const mealsInDietPercent = (totalMealsInDiet / totalMeals) * 100

    function handleGoBack() {
        router.back()
    }

    return (
        <View className="flex-1">
            <CardStatistics
                variant={mealsInDietPercent > 50 ? 'primary' : 'secondary'}
                onPress={handleGoBack}
                mealsInDietPercent={mealsInDietPercent}
            />

            <View className=" bg-gray-50 gap-6 mt-[-32px] my-8 px-6 rounded-l-2xl rounded-r-2xl rounded-b-none">
                <Text className="text-center text-gray-950 font-bold text-sm leading-4 pt-8">Estatísticas gerais</Text>
                <View className="flex-col gap-3">
                    <CardContent color="gray" number={bestSequenceInDiet} description="melhor sequencia de pratos dentro da dieta" />
                    <CardContent color="gray" number={totalMeals} description="refeições registradas" />

                    <View className="flex-row gap-3">
                        <CardContent className="flex-1" color="green" number={totalMealsInDiet} description="refeições dentro da dieta" />
                        <CardContent className="flex-1" color="red" number={totalMealsOutDiet} description="refeições fora da dieta" />
                    </View>
                </View>
            </View>
        </View>
    )
}