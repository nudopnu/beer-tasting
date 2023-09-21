export const DrinkingStates = [
    "Choosing",
    "Preparing",
    "Drinking",
    "Rating",
] as const;

export type DrinkingState = typeof DrinkingStates[number];