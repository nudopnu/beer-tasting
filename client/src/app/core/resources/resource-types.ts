export const ResourceTypes = [
    "SettingsResource",
    "UserResource",
    "UserDataResource",
    "StateResource",
    "DrinkingStateResource",
] as const;

export type ResourceType = typeof ResourceTypes[number];