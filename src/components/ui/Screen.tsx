import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface ScreenProps {
    children: ReactNode;
    scrollable?: boolean;
}

export function Screen({ children, scrollable = true }: ScreenProps) {
    const { theme } = useTheme();
    const palette = colors[theme];

    if (scrollable) {
        return (
            <ScrollView
                style={[styles.root, { backgroundColor: palette.background }]}
                contentContainerStyle={styles.content}
                keyboardShouldPersistTaps="handled"
            >
                {children}
            </ScrollView>
        );
    }

    return (
        <View style={[styles.root, styles.content, { backgroundColor: palette.background }]}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
    },
    content: {
        flexGrow: 1,
        padding: spacing.md,
        gap: spacing.md,
    },
});