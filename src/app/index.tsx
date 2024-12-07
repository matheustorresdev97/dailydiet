import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import DailyDietLogo from '@/assets/daily-diet-logo.svg'
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from "@/styles/colors";

import { Profile } from "@/components/ui/profile";
import CardPercent from "@/components/card-percent";
import { Button } from "@/components/ui/button";
import { DayList } from "@/components/day-list";
import { ListEmpty } from "@/components/list-empty";
import { MealProps } from "@/@types/meal";


const MEALS_BY_DATE: Record<string, MealProps[]> = {
    '2025-02-08': [
      {
        id: '1',
        name: 'Refeição 1',
        description: 'Descrição da refeição 1',
        datetime: '2025-02-08T10:00:00',
        isInDiet: true,
      },
      {
        id: '2',
        name: 'Refeição 2',
        description: 'Descrição da refeição 2',
        datetime: '2025-02-08T11:00:00',
        isInDiet: false,
      },
      {
        id: '3',
        name: 'Refeição 3',
        description: 'Descrição da refeição 3',
        datetime: '2025-02-08T12:00:00',
        isInDiet: true,
      },
    ],
    '2025-02-09': [
      {
        id: '4',
        name: 'Refeição 4',
        description: 'Descrição da refeição 4',
        datetime: '2025-02-09T10:00:00',
        isInDiet: true,
      },
      {
        id: '5',
        name: 'Refeição 5',
        description: 'Descrição da refeição 5',
        datetime: '2025-02-09T11:00:00',
        isInDiet: false,
      },
      {
        id: '6',
        name: 'Refeição 6',
        description: 'Descrição da refeição 6',
        datetime: '2025-02-09T12:00:00',
        isInDiet: true,
      },
      {
        id: '7',
        name: 'Refeição 7',
        description: 'Descrição da refeição 7',
        datetime: '2025-02-09T13:00:00',
        isInDiet: false,
      },
      {
        id: '8',
        name: 'Refeição 8',
        description: 'Descrição da refeição 8',
        datetime: '2025-02-09T14:00:00',
        isInDiet: true,
      },
    ],
  }

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
            <LinearGradient
                colors={['transparent', colors.gray[50]]}
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 160,
                }}
            />
        </SafeAreaView>
    )
}