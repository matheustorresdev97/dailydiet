import AsyncStorage from '@react-native-async-storage/async-storage'
import type { StateStorage } from 'zustand/middleware'

export const mealsStorage: StateStorage = {
    getItem: async (key: string): Promise<string | null> => {
        return AsyncStorage.getItem(key)
    },
    setItem: async (key: string, value: string): Promise<void> => {
        await AsyncStorage.setItem(key, value)
    },
    removeItem: async (key: string): Promise<void> => {
        await AsyncStorage.removeItem(key)
    },
}