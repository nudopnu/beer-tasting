export const ResourceTypes = [
    "SettingsResource",
    "UserResource",
    "StateResource",
    "DrinkingStateResource",
] as const;

export type ResourceType = typeof ResourceTypes[number];