import { useEffect, useState } from 'react'
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { colors } from '@/styles/colors'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import toast from 'react-native-toast-message'
import dayjs from 'dayjs'
import { dateApplyMask } from '@/utils/date-apply-mask'
import { hourApplyMask } from '@/utils/hour-apply-mask'
import { Toggle } from '@/components/ui/toogle'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { useMealsStore } from '@/store/meals'
import { MealProps } from '@/@types/meal'

const keyboardAvoidingBehavior =
    Platform.OS === 'android' ? 'height' : 'position'



export default function EditMeal() {
    const { getMealById, updateMeal } = useMealsStore()
    const { mealId } = useLocalSearchParams<{ mealId: string }>();
    const router = useRouter();

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [isInDiet, setIsInDiet] = useState<boolean | null>(null)

    function handleGoBack() {
        router.canGoBack()
    }

    function applyDateMask(value: string) {
        const onlyNumbers = value.replace(/\D/g, '')
    
        if (onlyNumbers.length === 8) {
          const parsedDate = dateApplyMask(onlyNumbers)
    
          return setDate(parsedDate)
        }
    
        if (onlyNumbers.length < 8) {
          return setDate(onlyNumbers)
        }
      }

      function applyHourMask(value: string) {
        const onlyNumbers = value.replace(/\D/g, '')
    
        if (onlyNumbers.length === 4) {
          const parsedHour = hourApplyMask(onlyNumbers)
    
          setTime(parsedHour)
        }
    
        if (onlyNumbers.length < 4) {
          setTime(onlyNumbers)
        }
      }


 function handleSaveMeal() {
    if (!name || !description || !date || !time || isInDiet === null) {
      return toast.show({
        type: 'error',
        text1: 'Preencha todos os campos',
      })
    }

    try {
      const [day, month, year] = date.split('/')
      const formattedDate = `${year}-${month}-${day}`

      const dateHourString = `${formattedDate}T${time}`

      const isValidDate = dayjs(
        dateHourString,
        'YYYY-MM-DDTHH:mm',
        true
      ).isValid()

      if (!isValidDate) {
        return toast.show({
          type: 'error',
          text1: 'Data ou hora inválida',
        })
      }

      const datetime = dayjs(dateHourString).format('YYYY-MM-DDTHH:mm:ss')

      const updatedMeal: MealProps = {
        id: mealId,
        name,
        description,
        datetime,
        isInDiet,
      }

      updateMeal(updatedMeal)

      handleGoBack()
    } catch (error) {
      console.log(error)

      return toast.show({
        type: 'error',
        text1: 'Erro ao atualizar refeição',
        text2: 'verifique os dados e tente novamente',
      })
    }
  }

  useEffect(() => {
    const meal = getMealById(mealId)

    if (!meal) {
      return handleGoBack()
    }

    setName(meal.name)
    setDescription(meal.description)
    setDate(dayjs(meal.datetime).format('DD/MM/YYYY'))
    setTime(dayjs(meal.datetime).format('HH:mm'))
    setIsInDiet(meal.isInDiet)
  }, [mealId])

    return (
        <View className='flex-1'>
            <View className='relative w-full h-[132px] items-center justify-center bg-gray-200'>
                <TouchableOpacity className='absolute top-14 left-6' activeOpacity={0.7}>
                    <Feather
                        name="arrow-left"
                        size={24}
                        color={colors.gray[900]}
                    />
                </TouchableOpacity>
                <Text className='text-gray-950 font-bold text-lg leading-6'>Editar refeição</Text>
            </View>
            <View className='flex-1 bg-gray-50 justify-between mt-[-32px] py-10 px-6 rounded-l-2xl rounded-r-2xl rounded-b-none'>
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={keyboardAvoidingBehavior}
                >
                    <View className='gap-6'>
                        <Input label='Nome' value={name} onChangeText={setName} />

                        <Input label='Descrição' value={description}
                            onChangeText={setDescription}
                            style={{ minHeight: 142 }}
                            multiline
                            numberOfLines={5}
                            textAlignVertical="top" />

                        <View className='w-full flex-row items-center gap-5'>
                            <Input className='flex-1' label='Data' value={date} onChangeText={applyDateMask} />

                            <Input className='flex-1' label='Hora' value={time} onChangeText={applyHourMask} />

                        </View>
                        <View className='gap-2'>
                            <Text className='text-gray-900 font-bold text-sm leading-4'>Esta dentro da dieta?</Text>
                            <View className='flex-row gap-2'>
                                <Toggle
                                    title="Sim"
                                    isChecked={isInDiet === true}
                                    onPress={() => setIsInDiet(true)}
                                />
                                <Toggle
                                    title="Nao"
                                    variant="secondary"
                                    isChecked={isInDiet === false}
                                    onPress={() => setIsInDiet(false)}
                                />
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
                <Button onPress={handleSaveMeal}>
                    <Button.Title>Salvar alterações</Button.Title>
                </Button>
            </View>
        </View>
    )
}