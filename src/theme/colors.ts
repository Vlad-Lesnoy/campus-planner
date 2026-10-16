export type ThemeMode = 'light' | 'dark';

export const colors = {
    light: {
        background: '#F5F7FB',
        surface: '#FFFFFF',
        text: '#182230',
        secondaryText: '#667085',
        primary: '#3563E9',
        primaryText: '#FFFFFF',
        border: '#D9DFEA',
        danger: '#D92D20',
        success: '#16803D',
        disabled: '#AAB3C2',
    },
    dark: {
        background: '#151922',
        surface: '#222936',
        text: '#F2F4F7',
        secondaryText: '#AAB4C5',
        primary: '#7193FF',
        primaryText: '#FFFFFF',
        border: '#3A4557',
        danger: '#FF786E',
        success: '#56D68B',
        disabled: '#5E6878',
    },
} as const;