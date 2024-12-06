import "@/styles/global.css"
import { Slot } from "expo-router"
import {
    useFonts,
    NunitoSans_400Regular,
    NunitoSans_700Bold,
} from '@expo-google-fonts/nunito-sans'
import { ActivityIndicator } from "react-native"

export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        NunitoSans_400Regular,
        NunitoSans_700Bold,
    })

    if (!fontsLoaded) {
        return <ActivityIndicator />
    }

    return (
        <>
            <Slot />
        </>
    )
}