import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { ThemeMode } from '../theme/colors';

const THEME_STORAGE_KEY = '@campus-planner/theme';

interface ThemeContextType {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
    toggleTheme: () => void;
    isThemeLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(
    undefined
);

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setThemeState] = useState<ThemeMode>('light');
    const [isThemeLoading, setIsThemeLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function loadTheme() {
            try {
                const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);

                if (mounted && (saved === 'light' || saved === 'dark')) {
                    setThemeState(saved);
                }
            } catch (error) {
                console.error('Не удалось загрузить тему:', error);
            } finally {
                if (mounted) {
                    setIsThemeLoading(false);
                }
            }
        }

        void loadTheme();

        return () => {
            mounted = false;
        };
    }, []);

    const setTheme = (nextTheme: ThemeMode) => {
        setThemeState(nextTheme);

        AsyncStorage.setItem(THEME_STORAGE_KEY, nextTheme).catch(
            (error: unknown) => {
                console.error('Не удалось сохранить тему:', error);
            }
        );
    };

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider
            value={{ theme, setTheme, toggleTheme, isThemeLoading }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme должен использоваться внутри ThemeProvider');
    }

    return context;
}