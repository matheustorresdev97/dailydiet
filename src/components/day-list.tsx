import { Text, View } from "react-native"
import dayjs from 'dayjs'
import { MealProps } from "@/@types/meal"
import { MealItem } from "./meal-item"

type DayListProps = {
  data: {
    date: string
    meals: MealProps[]
  }
}
export function DayList({ data }: DayListProps) {
  return (
    <View className="w-full gap-2">
      <Text className="text-gray-950 font-bold text-lg leading-6">{dayjs(data.date).format('DD.MM.YYYY')}</Text>
      {data.meals.map(meal => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </View>
  )
}