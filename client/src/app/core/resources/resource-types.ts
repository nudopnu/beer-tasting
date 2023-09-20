export const ResourceTypes = [
    "SettingsResource",
    "UserResource",
    "StateResource",
] as const;

export type ResourceType = typeof ResourceTypes[number];