import { create } from 'zustand'
import { createId } from '@paralleldrive/cuid2'
import dayjs from 'dayjs'

import type { MealProps, MealsByDateProps, MealsStatisticsProps } from '@/@types/meal'

type MealsStore = {
  mealsByDate: MealsByDateProps
  addMeal: (meal: Omit<MealProps, 'id'>) => void
  getMealById: (mealId: string) => MealProps | undefined
  getMealsStatistics: () => MealsStatisticsProps
  // updateMeal: (meal: MealProps) => void
  removeMeal: (date: string, mealId: string) => void
}

const MEALS_BY_DATE: Record<string, MealProps[]> = {
  '2023-02-09': [
    {
      id: '8',
      name: 'Refeição 8',
      description: 'Descrição da refeição 8',
      datetime: '2023-02-09T14:00:00',
      isInDiet: true,
    },
    {
      id: '7',
      name: 'Refeição 7',
      description: 'Descrição da refeição 7',
      datetime: '2023-02-09T13:00:00',
      isInDiet: false,
    },
    {
      id: '6',
      name: 'Refeição 6',
      description: 'Descrição da refeição 6',
      datetime: '2023-02-09T12:00:00',
      isInDiet: true,
    },
    {
      id: '5',
      name: 'Refeição 5',
      description: 'Descrição da refeição 5',
      datetime: '2023-02-09T11:00:00',
      isInDiet: false,
    },
    {
      id: '4',
      name: 'Refeição 4',
      description: 'Descrição da refeição 4',
      datetime: '2023-02-09T10:00:00',
      isInDiet: true,
    },
  ],
  '2023-02-08': [
    {
      id: '3',
      name: 'Refeição 3',
      description: 'Descrição da refeição 3',
      datetime: '2023-02-08T12:00:00',
      isInDiet: true,
    },
    {
      id: '2',
      name: 'Refeição 2',
      description: 'Descrição da refeição 2',
      datetime: '2023-02-08T11:00:00',
      isInDiet: false,
    },
    {
      id: '1',
      name: 'Refeição 1',
      description: 'Descrição da refeição 1',
      datetime: '2023-02-08T10:00:00',
      isInDiet: true,
    },
  ],
}

// const MEALS_BY_DATE: MealsByDateDTO = {}

export const useMealsStore = create<MealsStore>((set, get) => ({
  mealsByDate: MEALS_BY_DATE,
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

      return {
        mealsByDate: {
          ...state.mealsByDate,
          [date]: mealsByDateFiltered,
        },
      }
    }),
}))