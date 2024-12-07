import clsx from "clsx";
import { Text, View } from "react-native";
import { MealProps } from "@/@types/meal";

type MealItemProps = {
    meal: MealProps;
};

export function MealItem({ meal }: MealItemProps) {
    return (
        <View className="flex-row items-center gap-3 px-4 py-[14px] rounded-md border border-gray-200">
            <Text className="text-gray-950 font-regular text-xs leading-[16px]">
                {new Date(meal.datetime).toLocaleTimeString("pt-BR")}
            </Text>


            <View className="w-px h-full bg-gray-300" />


            <Text className="flex-1 text-gray-900 font-regular text-base leading-[20px]">
                {meal.name}
            </Text>

            <View
                className={clsx(
                    "w-[14px] h-[14px] rounded-full",
                    meal.isInDiet ? "bg-green-200" : "bg-red-300"
                )}
            />
        </View>
    );
}
