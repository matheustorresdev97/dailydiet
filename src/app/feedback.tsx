import { Text, View } from "react-native"
import FeedbackPositive from '@/assets/img-feedback-positive.svg'
import FeedbackNegative from '@/assets/img-feedback-negative.svg'
import { Button } from "@/components/ui/button"
import { useRouter } from "expo-router";
import { useSearchParams } from "expo-router/build/hooks";

interface FeedbackParams {
    isInDiet?: boolean;
}

export default function Feedback() {
    const { isInDiet } = useSearchParams() as FeedbackParams;


    const router = useRouter();

    function handleGoHome() {
        router.navigate('/')
    }

    return (
        <View className="flex-1 justify-center items-center gap-10 bg-gray-50">
            <View className="items-center justify-center max-w-[350px] gap-2">
                <Text className={`text-center font-bold textxl leading-8  ${isInDiet ? 'text-green-500' : 'text-red-600'}`}>
                    {isInDiet ? 'Continue assim!' : 'Que pena!'}
                </Text>
                <Text className="text-center text-gray-900 font-regular text-base leading-5">
                    {isInDiet ? (
                        <>
                            Você continua <Text className="text-center text-gray-900 font-bold font-base leading-5">dentro da dieta</Text>.
                            Muito bem!
                        </>
                    ) : (
                        <>
                            Você <Text className="text-center text-gray-900 font-bold font-base leading-5">saiu da dieta</Text> dessa vez,
                            mas continue se esforçando e não desista!
                        </>
                    )}
                </Text>
            </View>
            {isInDiet ? <FeedbackPositive /> : <FeedbackNegative />}
            <Button onPress={handleGoHome} className="w-auto">
                <Button.Title>Ir para a página inicial</Button.Title>
            </Button>
        </View>
    )
}