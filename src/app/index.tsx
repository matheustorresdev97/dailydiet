import { FlatList, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import DailyDietLogo from '@/assets/daily-diet-logo.svg'
import AntDesign from '@expo/vector-icons/AntDesign';
import { LinearGradient } from 'expo-linear-gradient'
import { colors } from "@/styles/colors";

import { Profile } from "@/components/ui/profile";
import CardPercent from "@/components/card-percent";
import { Button } from "@/components/ui/button";
import { DayList } from "@/components/day-list";
import { ListEmpty } from "@/components/list-empty";

import { useMealsStore } from '@/store/meals'



export default function Index() {
  const { mealsByDate } = useMealsStore()
  const router = useRouter();

  function handleMealsStatistics() {
    router.push('/statistics')
  }

  function handleNewMeal() {
    router.push('/new-meal')
  }

  return (
    <SafeAreaView className="flex-1 pt-9 px-6 pb-0">
      <View className="flex-row items-center justify-between mb-8">
        <DailyDietLogo />
        <Profile source={{ uri: 'https://github.com/matheustorresdev97.png' }} />
      </View>

      <CardPercent onPress={handleMealsStatistics} />

      <View className="flex-1 gap-8">
        <View className="w-full justify-center gap-2">
          <Text className="text-gray-950 font-regular text-base leading-5">Refeições</Text>
          <Button onPress={handleNewMeal}>
            <AntDesign name="plus" size={18} color="white" />
            <Button.Title>Nova refeição</Button.Title>
          </Button>
        </View>


        <FlatList
          data={Object.entries(mealsByDate)}
          keyExtractor={([date, meals]) => date}
          renderItem={({ item: [date, meals] }) => (
            <DayList data={{ date, meals }} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={
            Object.keys(mealsByDate).length === 0
              ? { flex: 1 }
              : {
                gap: 32,
                paddingBottom: 160,
              }
          }
          ListEmptyComponent={() => (
            <ListEmpty message="Não há refeições registradas" />
          )}
        />
      </View>
      <LinearGradient
        colors={['transparent', colors.gray[50]]}
        pointerEvents="none"
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