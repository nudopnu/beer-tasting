export interface Settings {
    videoInputDevice: MediaDeviceInfo | undefined;
    numberOfSamples: number;
}

export const DEFAULT_SETTINGS: Settings = {
    videoInputDevice: undefined,
    numberOfSamples: 3,
};