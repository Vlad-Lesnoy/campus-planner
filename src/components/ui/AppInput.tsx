import { StyleSheet, Text, TextInput, View } from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface AppInputProps {
    label: string;
    value: string;
    onChangeText: (value: string) => void;
    placeholder?: string;
    error?: string;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export function AppInput({
                             label,
                             value,
                             onChangeText,
                             placeholder,
                             error,
                             autoCapitalize = 'sentences',
                         }: AppInputProps) {
    const { theme } = useTheme();
    const palette = colors[theme];

    return (
        <View style={styles.container}>
            <Text style={[styles.label, { color: palette.text }]}>{label}</Text>

            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={palette.secondaryText}
                autoCapitalize={autoCapitalize}
                style={[
                    styles.input,
                    {
                        color: palette.text,
                        backgroundColor: palette.surface,
                        borderColor: error ? palette.danger : palette.border,
                    },
                ]}
            />

            {error ? (
                <Text style={[styles.error, { color: palette.danger }]}>{error}</Text>
            ) : null}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: spacing.xs,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
    },
    input: {
        minHeight: 46,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderWidth: 1,
        borderRadius: 10,
        fontSize: 16,
    },
    error: {
        fontSize: 13,
    },
});