import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import { useTheme } from '../src/context/ThemeContext';
import { Screen } from '../src/components/ui/Screen';
import { AppButton } from '../src/components/ui/AppButton';
import { colors } from '../src/theme/colors';
import { spacing } from '../src/theme/spacing';

export default function SettingsScreen() {
    const { theme, setTheme } = useTheme();
    const palette = colors[theme];

    return (
        <Screen>
            <Text style={[styles.title, { color: palette.text }]}>
                Настройки
            </Text>

            <Text style={[styles.description, { color: palette.secondaryText }]}>
                Выбери оформление приложения.
            </Text>

            <View
                style={[
                    styles.section,
                    { backgroundColor: palette.surface, borderColor: palette.border },
                ]}
            >
                <Text style={[styles.sectionTitle, { color: palette.text }]}>
                    Тема приложения
                </Text>

                <AppButton
                    title={theme === 'light' ? '✓ Светлая тема' : 'Светлая тема'}
                    variant={theme === 'light' ? 'primary' : 'secondary'}
                    onPress={() => setTheme('light')}
                />

                <AppButton
                    title={theme === 'dark' ? '✓ Тёмная тема' : 'Тёмная тема'}
                    variant={theme === 'dark' ? 'primary' : 'secondary'}
                    onPress={() => setTheme('dark')}
                />
            </View>

            <View style={styles.footer}>
                <AppButton
                    title="Вернуться к задачам"
                    variant="secondary"
                    onPress={() => router.back()}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: '700',
    },
    description: {
        fontSize: 14,
        marginTop: spacing.xs,
        marginBottom: spacing.md,
    },
    section: {
        padding: spacing.md,
        borderWidth: 1,
        borderRadius: 12,
        gap: spacing.md,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    footer: {
        marginTop: spacing.md,
    },
});