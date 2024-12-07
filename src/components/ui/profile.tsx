import { Image, type ImageProps } from 'react-native'

type ProfileProps = ImageProps

export function Profile({ ...rest }: ProfileProps) {
    return <Image className="w-10 h-10 rounded-full border-2 border-solid border-gray-900" {...rest} />
}