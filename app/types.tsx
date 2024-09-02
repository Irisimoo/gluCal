export type Ingredient = {
    date: Date,
    foodName: string,
    portionSize: number, // choose a standardized unit and convert all inputs to it (i.e. g)
    carbs: number, // whaat unit??
    notes: string
  };