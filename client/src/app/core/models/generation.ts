// source: https://www.beresfordresearch.com/age-range-by-generation/

export const GenerationNames = [
    "Gen Z",
    "Millenial",
    "Gen X",
    "Boomer",
    "Post War",
    "WWII",
] as const;

export function toRange(genaration: Generation) {
    const mapping: { [K in Generation]: string } = {
        "Gen Z": "1997-2012",
        "Millenial": "1981-1996",
        "Gen X": "1965-1980",
        "Boomer": "1946-1964",
        "Post War": "1928-1945",
        "WWII": "1922-1927",
    };
    return mapping[genaration];
}

export type Generation = typeof GenerationNames[number];