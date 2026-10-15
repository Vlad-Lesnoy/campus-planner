import React from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { useTheme } from '../src/context/ThemeContext';

export default function SettingsScreen() {
    const { theme, setTheme } =
        useTheme();

    const isDark = theme === 'dark';

    return (
        <View
            style={[
                styles.container,
                isDark && styles.darkContainer,
            ]}
        >
            <Text
                style={[
                    styles.title,
                    isDark && styles.darkText,
                ]}
            >
                Настройки приложения
            </Text>

            <Text
                style={[
                    styles.subtitle,
                    isDark && styles.darkSecondaryText,
                ]}
            >
                Выберите тему интерфейса
            </Text>

            <TouchableOpacity
                style={[
                    styles.themeButton,
                    theme === 'light' &&
                    styles.selectedButton,
                ]}
                onPress={() =>
                    setTheme('light')
                }
            >
                <Text
                    style={[
                        styles.themeText,
                        theme === 'light' &&
                        styles.selectedText,
                    ]}
                >
                    Светлая тема
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.themeButton,
                    theme === 'dark' &&
                    styles.selectedButton,
                ]}
                onPress={() =>
                    setTheme('dark')
                }
            >
                <Text
                    style={[
                        styles.themeText,
                        theme === 'dark' &&
                        styles.selectedText,
                    ]}
                >
                    Тёмная тема
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F4F7',
        padding: 20,
    },

    darkContainer: {
        backgroundColor: '#121212',
    },

    title: {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    subtitle: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 25,
    },

    darkText: {
        color: '#FFFFFF',
    },

    darkSecondaryText: {
        color: '#BBBBBB',
    },

    themeButton: {
        backgroundColor: '#FFFFFF',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#DDDDDD',
    },

    selectedButton: {
        backgroundColor: '#2196F3',
        borderColor: '#2196F3',
    },

    themeText: {
        fontSize: 16,
        fontWeight: '600',
    },

    selectedText: {
        color: '#FFFFFF',
    },
});