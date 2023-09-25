export interface Settings {
    videoInputDevice: MediaDeviceInfo | undefined;
    numberOfSamples: number;
    secondsPerSample: number;
    beers: Array<{ beer: number, name: string, isAvailable: boolean }>;
}

export const DEFAULT_SETTINGS: Settings = {
    videoInputDevice: undefined,
    numberOfSamples: 3,
    secondsPerSample: 10,
    beers: [
        { beer: 0, isAvailable: true, name: "Indian Summer IPA" },
        { beer: 1, isAvailable: true, name: "Hell" },
        { beer: 2, isAvailable: true, name: "Dunkel" },
        { beer: 3, isAvailable: true, name: "Weizen" },
        { beer: 4, isAvailable: true, name: "Seb´s Pale Ale" },
        { beer: 5, isAvailable: true, name: "New Zealand Pils" },
        { beer: 6, isAvailable: true, name: "Liaison" },
        { beer: 7, isAvailable: true, name: "Imperial Stout barrel aged" },
        { beer: 8, isAvailable: true, name: "Wiener Lager" },
        { beer: 9, isAvailable: true, name: "Export" },
    ],
};