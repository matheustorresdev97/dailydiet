import { useCallback, useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from "react-native";
import dayjs from "dayjs";
import { MealProps } from "@/@types/meal";
import { colors } from "@/styles/colors";
import { Feather } from "@expo/vector-icons";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Button } from "@/components/ui/button";
import { ReusableModal } from '@/components/modal';
import { useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router';
import { useMealsStore } from '@/store/meals'


export default function MealDetails() {
    const { getMealById, removeMeal } = useMealsStore()
    const router = useRouter();

    const { mealId } = useLocalSearchParams<{ mealId: string }>();

    const [mealData, setMealData] = useState<MealProps>({} as MealProps)
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false)

    function openDeleteModal() {
        setIsDeleteModalVisible(true)
    }
    function closeDeleteModal() {
        setIsDeleteModalVisible(false)
    }

    function handleGoBack() {
        router.back()
    }

    function handleEditMeal() {
        router.push(`/edit-meal/${mealId}`)
    }

    function handleRemoveMeal() {
        const mealDate = dayjs(mealData.datetime).format('YYYY-MM-DD')
        removeMeal(mealDate, mealId)
        router.navigate('/')
    }

    useFocusEffect(
        useCallback(() => {
            const meal = getMealById(mealId)
            if (!meal) {
                return router.navigate('/')
            }
            setMealData(meal)
        }, [])
    )

    return (
        <View className="flex-1">
            <View className={`relative w-full h-[132px] items-center justify-center ${mealData.isInDiet ? "bg-green-100" : "bg-red-100"}`}>
                <TouchableOpacity className="absolute top-14 left-6" activeOpacity={0.7} onPress={handleGoBack}>
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
                    <Button onPress={handleEditMeal}>
                        <Ionicons name="pencil" size={18} color="white" />
                        <Button.Title>Editar refeição</Button.Title>
                    </Button>
                    <Button variant="secondary" onPress={openDeleteModal}>
                        <Feather name="trash" size={18} color={colors.gray[950]} />
                        <Button.Title variant="secondary">Excluir refeição</Button.Title>
                    </Button>
                </View>
            </View>

            <ReusableModal
                isVisible={isDeleteModalVisible}
                onClose={closeDeleteModal}
            >
                <Text className='text-center mb-8 text-gray-900 font-bold text-lg leading-6'>
                    Deseja realmente excluir o registro da refeição?
                </Text>
                <View className='flex-row gap3'>
                    <Button
                        variant="secondary"
                        onPress={closeDeleteModal}
                        className='flex-1'
                    >
                        <Button.Title variant="secondary">Cancelar</Button.Title>
                    </Button>
                    <Button
                        onPress={handleRemoveMeal}
                        className='flex-1'
                    >
                        <Button.Title>Sim, excluir</Button.Title>
                    </Button>
                </View>
            </ReusableModal>
        </View>
    )
}