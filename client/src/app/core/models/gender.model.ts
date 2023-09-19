export const GenderTypes = [
    "m",
    "w",
    "d",
] as const

export type Gender = typeof GenderTypes[number];