import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme/colors';

interface AppButtonProps {
    title: string;
    onPress: () => void;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
}

export function AppButton({
                              title,
                              onPress,
                              variant = 'primary',
                              disabled = false,
                          }: AppButtonProps) {
    const { theme } = useTheme();
    const palette = colors[theme];
    const primary = variant === 'primary';

    return (
        <TouchableOpacity
            accessibilityRole="button"
            activeOpacity={0.75}
            disabled={disabled}
            onPress={onPress}
            style={[
                styles.button,
                {
                    backgroundColor: primary ? palette.primary : palette.surface,
                    borderColor: primary ? palette.primary : palette.border,
                    opacity: disabled ? 0.5 : 1,
                },
            ]}
        >
            <Text
                style={[
                    styles.text,
                    { color: primary ? palette.primaryText : palette.text },
                ]}
            >
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        minHeight: 46,
        paddingHorizontal: 14,
        paddingVertical: 11,
        borderRadius: 10,
        borderWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
    },
});