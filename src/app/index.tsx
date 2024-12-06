import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/styles/colors";
import DailyDietLogo from '@/assets/daily-diet-logo.svg'
import Feather from '@expo/vector-icons/Feather';

import { Profile } from "@/components/profile";


export default function Index() {
    return (
        <SafeAreaView className="flex-1 pt-9 px-6 pb-0">
            <View className="flex-row items-center justify-between mb-8">
                <DailyDietLogo />
                <Profile source={{ uri: 'https://github.com/matheustorresdev97.png' }} />
            </View>

            <TouchableOpacity className="flex-1 relative min-h-[102px] max-h-[102px] 
            items-center justify-center gap-0.5 mb-10 rounded-lg bg-green-100" activeOpacity={0.7}>
                <Feather className="absolute top-2 right-2" name="arrow-up-right" size={24} color={colors.green[500]} />
                <Text className="font-bold text-2xl text-gray-950 leading-10">90,86%</Text>
                <Text className="font-regular text-sm text-gray-900 leading-4">das refeições dentro da dieta</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}