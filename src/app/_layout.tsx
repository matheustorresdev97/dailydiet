import "@/styles/global.css"
import { StatusBar } from "expo-status-bar"
import { Slot } from "expo-router"
import {
    useFonts,
    NunitoSans_400Regular,
    NunitoSans_700Bold,
} from '@expo-google-fonts/nunito-sans'
import Toast from 'react-native-toast-message'
import { Loading } from "@/components/loading"


export default function RootLayout() {
    const [fontsLoaded] = useFonts({
        NunitoSans_400Regular,
        NunitoSans_700Bold,
    })

    if (!fontsLoaded) {
        return <Loading />
    }

    return (
        <>
            <StatusBar style="dark" backgroundColor="transparent" translucent />
            <Slot />
            <Toast />
        </>
    )
}