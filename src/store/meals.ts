import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { createId } from '@paralleldrive/cuid2'
import dayjs from 'dayjs'

import type { MealProps, MealsByDateProps, MealsStatisticsProps } from '@/@types/meal'
import { mealsStorage } from '@/storage/meals'

type MealsStore = {
  mealsByDate: MealsByDateProps
  addMeal: (meal: Omit<MealProps, 'id'>) => void
  getMealById: (mealId: string) => MealProps | undefined
  getMealsStatistics: () => MealsStatisticsProps
  removeMeal: (date: string, mealId: string) => void
  updateMeal: (updatedMeal: MealProps) => void
}

export const useMealsStore = create<MealsStore>()(
  persist(
    (set, get) => ({
      mealsByDate: {},
      addMeal: meal =>
        set(state => {
          const date = dayjs(meal.datetime).format('YYYY-MM-DD')

          // Adiciona a refeição ao array do dia correspondente
          const updatedMeals = [
            ...(state.mealsByDate[date] || []),
            {
              id: createId(),
              ...meal,
            },
          ]

          // Ordena as refeições dentro da data pelo datetime
          const sortedMeals = updatedMeals.sort((a, b) => {
            const dateTimeA = dayjs(a.datetime)
            const dateTimeB = dayjs(b.datetime)

            return dateTimeB.isBefore(dateTimeA)
              ? -1
              : dateTimeB.isAfter(dateTimeA)
                ? 1
                : 0
          })

          // Atualiza o objeto mealsByDate com as refeições ordenadas
          const updatedMealsByDate = {
            ...state.mealsByDate,
            [date]: sortedMeals,
          }

          // Ordena as chaves (datas) do objeto mealsByDate
          const sortedMealsByDate = Object.keys(updatedMealsByDate)
            .sort((a, b) => {
              const dateA = dayjs(a)
              const dateB = dayjs(b)

              return dateB.isBefore(dateA) ? -1 : 1
            })
            .reduce((acc, date) => {
              acc[date] = updatedMealsByDate[date]
              return acc
            }, {} as MealsByDateProps)

          return {
            mealsByDate: sortedMealsByDate,
          }
        }),
      getMealById: mealId => {
        const meal = Object.values(get().mealsByDate)
          .flat()
          .find(meal => meal.id === mealId)

        return meal
      },
      getMealsStatistics: () => {
        const meals = Object.values(get().mealsByDate).flat()

        const totalMeals = meals.length

        const totalMealsInDiet = meals.filter(meal => meal.isInDiet).length

        const totalMealsOutDiet = meals.filter(meal => !meal.isInDiet).length

        let bestSequenceInDiet = 0
        let currentSequenceInDiet = 0

        meals.map(meal => {
          if (meal.isInDiet) {
            currentSequenceInDiet++
          } else {
            currentSequenceInDiet = 0
          }

          if (currentSequenceInDiet > bestSequenceInDiet) {
            bestSequenceInDiet = currentSequenceInDiet
          }
        })

        return {
          totalMeals,
          totalMealsInDiet,
          totalMealsOutDiet,
          bestSequenceInDiet,
        }
      },
      removeMeal: (date, mealId) =>
        set(state => {
          const mealsByDateFiltered = state.mealsByDate[date].filter(
            meal => meal.id !== mealId
          )

          if (mealsByDateFiltered.length === 0) {
            delete state.mealsByDate[date]

            return {
              mealsByDate: state.mealsByDate,
            }
          }

          return {
            mealsByDate: {
              ...state.mealsByDate,
              [date]: mealsByDateFiltered,
            },
          }
        }),
      updateMeal: updatedMeal => {
        const { getMealById, removeMeal, addMeal } = get()

        const oldMeal = getMealById(updatedMeal.id)

        const date = dayjs(oldMeal?.datetime).format('YYYY-MM-DD')

        removeMeal(date, updatedMeal.id)

        addMeal(updatedMeal)
      },
    }),
    {
      name: '@daily-diet:meals-by-date', // Nome da chave no AsyncStorage
      storage: createJSONStorage(() => mealsStorage),
      partialize: state => ({
        mealsByDate: state.mealsByDate,
      }), 
    }
  )
)