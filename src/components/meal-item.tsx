import clsx from "clsx";
import { Text, TouchableOpacity, View } from "react-native";
import { MealProps } from "@/@types/meal";
import dayjs from "dayjs";
import { useRouter } from "expo-router";

type MealItemProps = {
    meal: MealProps;
};

export function MealItem({ meal }: MealItemProps) {

    const router = useRouter()

    function handleMealDetails(mealId: string) {
        router.push(`/meals-details/${mealId}`)
      }

    return (
        <TouchableOpacity className="flex-row items-center gap-3 px-4 py-[14px] rounded-md border border-gray-200"  onPress={() => handleMealDetails(meal.id)}>
            <Text className="text-gray-950 font-bold text-xs leading-[16px]">
                {dayjs(meal.datetime).format('HH:mm')}
            </Text>


            <View className="w-px h-full bg-gray-300" />


            <Text numberOfLines={1} className="flex-1 text-gray-900 font-regular text-base leading-[20px]">
                {meal.name}
            </Text>

            <View
                className={clsx(
                    "w-[14px] h-[14px] rounded-full",
                    meal.isInDiet ? "bg-green-200" : "bg-red-300"
                )}
            />
        </TouchableOpacity>
    );
}
