export type MealProps = {
    id: string
    name: string
    description: string
    datetime: string
    isInDiet: boolean
}

export type MealsByDateProps = {
    [date: string]: MealProps[]
}