import { useEffect, useState } from 'react';
import {
    LayoutChangeEvent,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';

import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

interface ProgressBarProps {
    completed: number;
    total: number;
}

export function ProgressBar({
                                completed,
                                total,
                            }: ProgressBarProps) {
    const { theme } = useTheme();
    const palette = colors[theme];
    const [trackWidth, setTrackWidth] = useState(0);
    const progress = useSharedValue(0);

    const ratio =
        total > 0
            ? Math.min(completed / total, 1)
            : 0;

    useEffect(() => {
        progress.value = withTiming(ratio, {
            duration: 500,
        });
    }, [ratio, progress]);

    const fillStyle = useAnimatedStyle(() => ({
        width: trackWidth * progress.value,
    }));

    const handleLayout = (event: LayoutChangeEvent) => {
        setTrackWidth(event.nativeEvent.layout.width);
    };

    return (
        <View style={styles.container}>
            <View style={styles.labelRow}>
                <Text
                    style={[
                        styles.label,
                        { color: palette.text },
                    ]}
                >
                    Общий прогресс
                </Text>

                <Text
                    style={[
                        styles.percentage,
                        { color: palette.secondaryText },
                    ]}
                >
                    {Math.round(ratio * 100)}%
                </Text>
            </View>

            <View
                onLayout={handleLayout}
                style={[
                    styles.track,
                    { backgroundColor: palette.border },
                ]}
            >
                <Animated.View
                    style={[
                        styles.fill,
                        { backgroundColor: palette.success },
                        fillStyle,
                    ]}
                />
            </View>

            <Text
                style={[
                    styles.caption,
                    { color: palette.secondaryText },
                ]}
            >
                Выполнено {completed} из {total} задач
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: spacing.xs,
    },
    labelRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    label: {
        fontSize: 14,
        fontWeight: '700',
    },
    percentage: {
        fontSize: 14,
        fontWeight: '600',
    },
    track: {
        height: 10,
        borderRadius: 5,
        overflow: 'hidden',
    },
    fill: {
        height: '100%',
        borderRadius: 5,
    },
    caption: {
        fontSize: 12,
    },
});