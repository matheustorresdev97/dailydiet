import { Text, View } from "react-native"

type ListEmptyProps = {
  message: string
}
export function ListEmpty({ message }: ListEmptyProps) {
  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-gray-600 font-regular text-base leading-5">{message}</Text>
    </View>
  )
}