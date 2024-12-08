import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toogle";
import { colors } from "@/styles/colors";
import { Feather } from "@expo/vector-icons";



const keyboardAvoidingBehavior =
    Platform.OS === 'android' ? 'height' : 'position'

export default function NewMeal() {
    const [isInDiet, setIsInDiet] = useState(true)

    return (
        <View className="flex-1">
            <View className="relative w-full h-32 items-center justify-center bg-gray-200">
                <TouchableOpacity className="absolute top-14 left-6" activeOpacity={0.7}>
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
                            style={{ height: 120 }}
                            multiline
                            numberOfLines={4}
                            textAlignVertical="top"
                        />
                         <View className="flex-row w-full items-center justify-center">
                         <Input label="Data" className="flex-1 mr-2" />
                         <Input label="Hora" className="flex-1 ml-2" />
                        </View>
                        <View className="gap-2">
                            <Text className="text-gray-900 font-bold text-sm leading-4">Esta dentro da dieta?</Text>
                            <View style={{ flexDirection: 'row', gap: 8 }}>
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
                    <Button.Title>Cadastrar refeição</Button.Title>
                </Button>
            </View>
        </View>
    )
}