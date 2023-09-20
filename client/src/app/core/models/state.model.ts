export const States = [
    'Default',
    'Scanning',
    'Recording',
] as const;

export type State = typeof States[number];