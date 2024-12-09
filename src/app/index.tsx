import { useState } from 'react'
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { colors } from '@/styles/colors'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { MealProps } from '@/@types/meal'
import dayjs from 'dayjs'
import { dateApplyMask } from '@/utils/date-apply-mask'
import { hourApplyMask } from '@/utils/hour-apply-mask'
import { Toggle } from '@/components/ui/toogle'

const keyboardAvoidingBehavior =
    Platform.OS === 'android' ? 'height' : 'position'

const FAKE_MEAL: MealProps = {
    id: '1',
    name: 'Macarrão com molho de tomate',
    description: 'Macarrão feito com molho de tomate e molho de tomate',
    datetime: '2023-02-08T10:00:00',
    isInDiet: false,
}

export default function EditMeal() {
    const [name, setName] = useState(FAKE_MEAL.name)
    const [description, setDescription] = useState(FAKE_MEAL.description)
    const [date, setDate] = useState(
        dayjs(FAKE_MEAL.datetime).format('DD/MM/YYYY')
    )
    const [time, setTime] = useState(dayjs(FAKE_MEAL.datetime).format('HH:mm'))
    const [isInDiet, setIsInDiet] = useState(FAKE_MEAL.isInDiet)
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
                                    isChecked={isInDiet}
                                    onPress={() => setIsInDiet(true)}
                                />
                                <Toggle
                                    title="Nao"
                                    variant="secondary"
                                    isChecked={!isInDiet}
                                    onPress={() => setIsInDiet(false)}
                                />
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
                <Button>
                    <Button.Title>Salvar alterações</Button.Title>
                </Button>
            </View>
        </View>
    )
}