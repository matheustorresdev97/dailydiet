import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import DailyDietLogo from '@/assets/daily-diet-logo.svg'
import AntDesign from '@expo/vector-icons/AntDesign';

import { Profile } from "@/components/ui/profile";
import CardPercent from "@/components/card-percent";
import { Button } from "@/components/ui/button";
import { DayList } from "@/components/day-list";
import { ListEmpty } from "@/components/list-empty";
import { MealProps } from "@/@types/meal";

const MEALS_BY_DATE: Record<string, MealProps[]> = {}

export default function Index() {
    return (
        <SafeAreaView className="flex-1 pt-9 px-6 pb-0">
            <View className="flex-row items-center justify-between mb-8">
                <DailyDietLogo />
                <Profile source={{ uri: 'https://github.com/matheustorresdev97.png' }} />
            </View>

            <CardPercent />

            <View className="flex-1 gap-8">
                <View className="w-full justify-center gap-2">
                    <Text className="text-gray-950 font-regular text-base leading-5">Refeições</Text>
                    <Button>
                        <AntDesign name="plus" size={18} color="white" />
                        <Button.Title>Nova refeição</Button.Title>
                    </Button>
                </View>


                <FlatList
                    data={Object.entries(MEALS_BY_DATE)}
                    keyExtractor={([date, meals]) => date}
                    renderItem={({ item: [date, meals] }) => (
                        <DayList data={{ date, meals }} />
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={
                        Object.keys(MEALS_BY_DATE).length === 0
                          ? { flex: 1 }
                          : {
                              gap: 32,
                              paddingBottom: 100,
                            }
                      }
                      ListEmptyComponent={() => (
                        <ListEmpty message="Não há refeições registradas" />
                      )}
                />
            </View>
        </SafeAreaView>
    )
}