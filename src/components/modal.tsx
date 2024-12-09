
import type { ReactNode } from 'react'
import { View } from 'react-native'
import Modal from 'react-native-modal'

type ReusableModalProps = {
  children: ReactNode
  isVisible: boolean
  onClose: () => void
}

export function ReusableModal({ children,
  isVisible,
  onClose }: ReusableModalProps) {

  return (
    <Modal
      animationIn="fadeIn"
      animationOut="fadeOut"
      useNativeDriver
      isVisible={isVisible}
      onBackdropPress={onClose}>

      <View className='flex-1 bg-modal justify-center items-center'>

        <View className='z-10 mx-auto my-0 w-[90%] p-6 bg-gray-50 rounded-lg'>{children}</View>

      </View>
    </Modal>
  )
}