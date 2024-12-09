import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import { dateApplyMask } from "@/utils/date-apply-mask";
import { hourApplyMask } from "@/utils/hour-apply-mask";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toogle";
import { colors } from "@/styles/colors";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";


const keyboardAvoidingBehavior =
    Platform.OS === 'android' ? 'height' : 'position'

export default function NewMeal() {
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [isInDiet, setIsInDiet] = useState<boolean | null>(null)

    const router = useRouter();

    function handleGoBack() {
        router.back()
    }

    function handleFeedback() {
        if (isInDiet === null) return;
        router.push(`/feedback?isInDiet=${isInDiet}`);
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

    function handleCreateMeal() {
        // TODO: logica para criar refeição
        handleFeedback()
    }

    return (
        <View className="flex-1">
            <View className="relative w-full h-32 items-center justify-center bg-gray-200">
                <TouchableOpacity className="absolute top-14 left-6" activeOpacity={0.7} onPress={handleGoBack}>
                    <Feather
                        name="arrow-left"
                        size={24}
                        color={colors.gray[900]}
                    />
                </TouchableOpacity>
                <Text className="text-gray-950 font-bold text-lg leading-6">Nova refeição</Text>
            </View>
            <View className="flex-1 bg-gray-50 justify-between mt-[-32px] py-10 px-6 rounded-l-2xl rounded-r-2xl rounded-b-none">

                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={keyboardAvoidingBehavior}
                >
                    <View className="gap-6">
                        <Input label="Nome" />
                        <Input
                            label="Descrição"
                            style={{ height: 142 }}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                        <View className="flex-row w-full items-center gap-5">
                            <Input label="Data" className="flex-1" value={date} onChangeText={applyDateMask} />
                            <Input label="Hora" className="flex-1" value={time} onChangeText={applyHourMask} />
                        </View>
                        <View className="gap-2">
                            <Text className="text-gray-900 font-bold text-sm leading-4">Esta dentro da dieta?</Text>
                            <View style={{ flexDirection: 'row', gap: 8 }}>
                                <Toggle
                                    title="Sim"
                                    isChecked={isInDiet === false}
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
                <Button onPress={handleCreateMeal}>
                    <Button.Title>Cadastrar refeição</Button.Title>
                </Button>
            </View>
        </View>
    )
}