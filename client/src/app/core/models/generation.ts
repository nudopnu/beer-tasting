// source: https://www.beresfordresearch.com/age-range-by-generation/

export const GenerationNames = [
    "Gen Z",
    "Millenial",
    "Gen X",
    "Boomers II (aka Generation Jones)",
    "Boomers I",
    "Post War",
    "WWII",
] as const;

type Generations = {
    "Gen Z": { range: "1997-2012" },
    "Millenial": { range: "1981-1996" },
    "Gen X": { range: "1965-1980" },
    "Boomers II (aka Generation Jones)": { range: "1955-1964" },
    "Boomers I": { range: "1946-1954" },
    "Post War": { range: "1928-1945" },
    "WWII": { range: "1922-1927" },
};

export type Generation = keyof Generations;