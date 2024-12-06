import "@/styles/global.css"
import { Slot } from "expo-router"
import {
    useFonts,
    NunitoSans_400Regular,
    NunitoSans_700Bold,
} from '@expo-google-fonts/nunito-sans'

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
            <Slot />
        </>
    )
}