export const ResourceTypes = [
    "SettingsResource",
    "StringResource",
] as const;

export type ResourceType = typeof ResourceTypes[number];