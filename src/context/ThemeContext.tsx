import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    ReactNode,
} from 'react';

import {
    ActivityIndicator,
    View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export type ThemeMode = 'light' | 'dark';

interface ThemeContextType {
    theme: ThemeMode;
    setTheme: (theme: ThemeMode) => void;
    isLoading: boolean;
}

const ThemeContext =
    createContext<ThemeContextType | undefined>(
        undefined
    );

const THEME_STORAGE_KEY = '@campus-planner/theme';

export function ThemeProvider({
                                  children,
                              }: {
    children: ReactNode;
}) {
    const [theme, setThemeState] =
        useState<ThemeMode>('light');

    const [isLoading, setIsLoading] =
        useState(true);

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const savedTheme =
                    await AsyncStorage.getItem(
                        THEME_STORAGE_KEY
                    );

                if (
                    savedTheme === 'light' ||
                    savedTheme === 'dark'
                ) {
                    setThemeState(savedTheme);
                }
            } catch (error) {
                console.log(
                    'Ошибка загрузки темы:',
                    error
                );
            } finally {
                setIsLoading(false);
            }
        };

        loadTheme();
    }, []);

    const setTheme = async (
        newTheme: ThemeMode
    ) => {
        setThemeState(newTheme);

        try {
            await AsyncStorage.setItem(
                THEME_STORAGE_KEY,
                newTheme
            );
        } catch (error) {
            console.log(
                'Ошибка сохранения темы:',
                error
            );
        }
    };

    if (isLoading) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                isLoading,
            }}
        >
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error(
            'useTheme должен использоваться внутри ThemeProvider'
        );
    }

    return context;
}