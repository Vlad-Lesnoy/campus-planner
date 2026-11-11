import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, {
    FadeIn,
    FadeInDown,
    FadeOut,
    LinearTransition,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from 'react-native-reanimated';

import type { Task } from '../../types/task';
import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { AppButton } from '../ui/AppButton';
import { isTaskOverdue } from '../../utils/task';

interface TaskCardProps {
    task: Task;
    onPress: () => void;
    onToggleStatus: () => void;
    onDelete: () => void;
}

const priorityLabels = {
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
};

export function TaskCard({
                             task,
                             onPress,
                             onToggleStatus,
                             onDelete,
                         }: TaskCardProps) {
    const { theme } = useTheme();
    const palette = colors[theme];
    const [expanded, setExpanded] = useState(false);
    const completedProgress = useSharedValue(
        task.status === 'completed' ? 1 : 0,
    );
    const overdue = isTaskOverdue(task);

    useEffect(() => {
        completedProgress.value = withSpring(
            task.status === 'completed' ? 1 : 0,
            {
                damping: 14,
                stiffness: 160,
            },
        );
    }, [task.status, completedProgress]);

    const checkStyle = useAnimatedStyle(() => ({
        opacity: completedProgress.value,
        transform: [
            { scale: 0.7 + completedProgress.value * 0.3 },
        ],
    }));

    const titleStyle = useAnimatedStyle(() => ({
        opacity: 1 - completedProgress.value * 0.12,
    }));

    return (
        <Animated.View
            entering={FadeInDown.springify().damping(16)}
            exiting={FadeOut.duration(180)}
            layout={LinearTransition.springify()}
            style={[
                styles.card,
                {
                    backgroundColor: palette.surface,
                    borderColor: palette.border,
                    opacity: task.status === 'completed' ? 0.9 : 1,
                },
            ]}
        >
            <View style={styles.titleRow}>
                <Animated.View
                    style={[
                        styles.checkMark,
                        {
                            backgroundColor:
                                task.status === 'completed'
                                    ? palette.success
                                    : 'transparent',
                            borderColor:
                                task.status === 'completed'
                                    ? palette.success
                                    : palette.border,
                        },
                    ]}
                >
                    <Animated.Text
                        style={[styles.checkText, checkStyle]}
                    >
                        ✓
                    </Animated.Text>
                </Animated.View>

                <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel={`Открыть задачу ${task.title}`}
                    activeOpacity={0.75}
                    onPress={onPress}
                    style={styles.titleTouchArea}
                >
                    <Animated.Text
                        style={[
                            styles.title,
                            titleStyle,
                            {
                                color: palette.text,
                                textDecorationLine:
                                    task.status === 'completed'
                                        ? 'line-through'
                                        : 'none',
                            },
                        ]}
                    >
                        {task.title}
                    </Animated.Text>
                </TouchableOpacity>
            </View>

            <Text style={{ color: palette.secondaryText }}>
                {task.status === 'completed'
                    ? '✓ Завершена'
                    : '● Активна'}
            </Text>

            <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={
                    expanded
                        ? 'Скрыть подробности задачи'
                        : 'Показать подробности задачи'
                }
                onPress={() => setExpanded((value) => !value)}
                activeOpacity={0.7}
                style={[
                    styles.expandButton,
                    { borderColor: palette.border },
                ]}
            >
                <Text
                    style={{
                        color: palette.primary,
                        fontWeight: '600',
                    }}
                >
                    {expanded
                        ? 'Скрыть подробности  −'
                        : 'Подробнее  +'}
                </Text>
            </TouchableOpacity>

            {expanded ? (
                <Animated.View
                    entering={FadeIn.duration(180)}
                    exiting={FadeOut.duration(140)}
                    layout={LinearTransition.duration(180)}
                    style={styles.details}
                >
                    <Text style={{ color: palette.secondaryText }}>
                        Предмет: {task.subject}
                    </Text>

                    <Text style={{ color: palette.secondaryText }}>
                        Приоритет: {priorityLabels[task.priority]}
                    </Text>

                    {task.dueDate ? (
                        <Text
                            style={{
                                color: overdue
                                    ? palette.danger
                                    : palette.secondaryText,
                            }}
                        >
                            Срок: {task.dueDate}
                            {overdue ? ' — просрочена' : ''}
                        </Text>
                    ) : null}

                    <Text style={{ color: palette.secondaryText }}>
                        Создана:{' '}
                        {new Date(task.createdAt).toLocaleDateString()}
                    </Text>
                </Animated.View>
            ) : null}

            <View style={styles.actions}>
                <View style={styles.actionButton}>
                    <AppButton
                        title={
                            task.status === 'completed'
                                ? 'Вернуть'
                                : 'Завершить'
                        }
                        variant="secondary"
                        onPress={onToggleStatus}
                    />
                </View>

                <View style={styles.actionButton}>
                    <AppButton
                        title="Удалить"
                        variant="secondary"
                        onPress={onDelete}
                    />
                </View>
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: 12,
        padding: spacing.md,
        gap: spacing.md,
        overflow: 'hidden',
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    checkMark: {
        width: 25,
        height: 25,
        borderWidth: 1.5,
        borderRadius: 13,
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '800',
    },
    titleTouchArea: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
    },
    expandButton: {
        alignSelf: 'flex-start',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
    },
    details: {
        gap: spacing.xs,
        paddingTop: spacing.xs,
    },
    actions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    actionButton: {
        flexGrow: 1,
        flexBasis: 120,
    },
});