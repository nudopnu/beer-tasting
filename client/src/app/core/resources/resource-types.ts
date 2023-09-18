export const ResourceTypes = [
    "SettingsResource",
    "UserResource",
] as const;

export type ResourceType = typeof ResourceTypes[number];