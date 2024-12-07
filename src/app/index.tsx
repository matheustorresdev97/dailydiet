import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import DailyDietLogo from '@/assets/daily-diet-logo.svg'

import { Profile } from "@/components/ui/profile";
import CardPercent from "@/components/card-percent";


export default function Index() {
    return (
        <SafeAreaView className="flex-1 pt-9 px-6 pb-0">
            <View className="flex-row items-center justify-between mb-8">
                <DailyDietLogo />
                <Profile source={{ uri: 'https://github.com/matheustorresdev97.png' }} />
            </View>

            <CardPercent />
        </SafeAreaView>
    )
}