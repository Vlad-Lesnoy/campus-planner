import { StyleSheet, Text, View } from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { AppButton } from './AppButton';

interface EmptyStateProps {
    icon: string;
    title: string;
    description: string;
    actionLabel?: string;
    onAction?: () => void;
}

export function EmptyState({
                               icon,
                               title,
                               description,
                               actionLabel,
                               onAction,
                           }: EmptyStateProps) {
    const { theme } = useTheme();
    const palette = colors[theme];

    return (
        <View style={styles.container}>
            <Text style={styles.icon}>{icon}</Text>
            <Text style={[styles.title, { color: palette.text }]}>{title}</Text>
            <Text style={[styles.description, { color: palette.secondaryText }]}>
                {description}
            </Text>

            {actionLabel && onAction ? (
                <View style={styles.action}>
                    <AppButton title={actionLabel} onPress={onAction} />
                </View>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.xl,
        gap: spacing.sm,
    },
    icon: {
        fontSize: 38,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        textAlign: 'center',
    },
    description: {
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 21,
    },
    action: {
        width: '100%',
        marginTop: spacing.sm,
    },
});