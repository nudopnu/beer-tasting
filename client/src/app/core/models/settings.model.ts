import { Beer } from "./beer.model";

export interface Settings {
    videoInputDevice: MediaDeviceInfo | undefined;
    numberOfSamples: number;
    secondsPerSample: number;
    beers: Array<Beer>;
}

export const DEFAULT_SETTINGS: Settings = {
    videoInputDevice: undefined,
    numberOfSamples: 3,
    secondsPerSample: 10,
    beers: [
        { assignedNumber: 1, isAvailable: true, name: "Hell" },
        { assignedNumber: 2, isAvailable: true, name: "Dunkel" },
        { assignedNumber: 3, isAvailable: true, name: "Weizen" },
        { assignedNumber: 4, isAvailable: true, name: "Seb´s Pale Ale" },
        { assignedNumber: 5, isAvailable: true, name: "New Zealand Pils" },
        { assignedNumber: 6, isAvailable: true, name: "Liaison" },
        { assignedNumber: 7, isAvailable: true, name: "Imperial Stout barrel aged" },
        { assignedNumber: 8, isAvailable: true, name: "Wiener Lager" },
        { assignedNumber: 9, isAvailable: true, name: "Export" },
        { assignedNumber: 10, isAvailable: true, name: "Indian Summer IPA" },
    ],
};