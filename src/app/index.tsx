import { Text, TouchableOpacity, View } from "react-native";
import dayjs from "dayjs";
import { MealProps } from "@/@types/meal";
import { colors } from "@/styles/colors";
import { Feather } from "@expo/vector-icons";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from "@/components/ui/button";



export default function MealDetails() {
    const mealData: MealProps = {
        id: '1',
        name: 'Sanduíche',
        description:
            'Sanduíche de pão integral com atum e salada de alface e tomate',
        datetime: '2023-02-08T10:00:00',
        isInDiet: true,
    }

    return (
        <View className="flex-1">
            <View className={`relative w-full h-[132px] items-center justify-center ${mealData.isInDiet ? "bg-green-100" : "bg-red-100"}`}>
                <TouchableOpacity className="absolute top-14 left-6" activeOpacity={0.7}>
                    <Feather
                        name="arrow-left"
                        size={24}
                        color={colors.gray[900]}
                    />
                </TouchableOpacity>
                <Text className="text-gray-950 font-bold text-lg leading-6">Refeição</Text>
            </View>
            <View className="flex-1 bg-gray-50 justify-between mt-[-32px] py-10 px-6 rounded-l-2xl rounded-r-2xl rounded-b-none">
                <View className="gap-6">
                    <View className="gap-2">
                        <Text className="text-gray-950 font-bold text-xl leading-6">{mealData.name}</Text>
                        <Text className="text-gray-900 font-regular text-base leading-5">{mealData.description}</Text>
                    </View>
                    <View className="gap-2">
                        <Text className="text-gray950 font-bold text-sm leading-4">Data e hora</Text>
                        <Text className="text-gray-900 font-regular text-base leading-5">
                            {dayjs(mealData.datetime).format('DD/MM/YYYY[ às ]HH:mm')}
                        </Text>
                    </View>
                    <View className="flex-row mr-auto items-center justify-center gap-2 py-2 px-4 rounded-full bg-gray-100">
                        <View className={`w-2 h-2 rounded-full  ${mealData.isInDiet ? "bg-green-500" : "bg-red-600"}`} />
                        <Text className="text-gray-950 font-regular text-sm leading-4">
                            {mealData.isInDiet ? 'dentro da dieta' : 'fora da dieta'}
                        </Text>
                    </View>
                </View>
                <View className="gap-3">
                    <Button>
                        <Ionicons name="pencil" size={18} color="white" />
                        <Button.Title>Editar refeição</Button.Title>
                    </Button>
                    <Button variant="secondary">
                        <Feather name="trash" size={18} color={colors.gray[950]} />
                        <Button.Title variant="secondary">Excluir refeição</Button.Title>
                    </Button>
                </View>
            </View>
        </View>
    )
}