export const States = [
    'Default',
    'Scanning',
    'Recording',
    'Results',
] as const;

export type State = typeof States[number];