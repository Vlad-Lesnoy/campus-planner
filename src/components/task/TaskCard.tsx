import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import type { Task } from '../../types/task';
import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { AppButton } from '../ui/AppButton';

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

    return (
        <View
            style={[
                styles.card,
                {
                    backgroundColor: palette.surface,
                    borderColor: palette.border,
                    opacity: task.status === 'completed' ? 0.8 : 1,
                },
            ]}
        >
            <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={`Открыть задачу ${task.title}`}
                activeOpacity={0.7}
                onPress={onPress}
                style={styles.details}
            >
                <Text
                    style={[
                        styles.title,
                        {
                            color: palette.text,
                            textDecorationLine:
                                task.status === 'completed' ? 'line-through' : 'none',
                        },
                    ]}
                >
                    {task.title}
                </Text>

                <Text style={{ color: palette.secondaryText }}>
                    Предмет: {task.subject}
                </Text>

                <Text style={{ color: palette.secondaryText }}>
                    Приоритет: {priorityLabels[task.priority]}
                </Text>

                <Text style={{ color: palette.secondaryText }}>
                    Статус: {task.status === 'completed' ? 'Завершена' : 'Активна'}
                </Text>

                {task.dueDate ? (
                    <Text style={{ color: palette.secondaryText }}>
                        Срок: {task.dueDate}
                    </Text>
                ) : null}
            </TouchableOpacity>

            <View style={styles.actions}>
                <View style={styles.actionButton}>
                    <AppButton
                        title={task.status === 'completed' ? 'Вернуть' : 'Завершить'}
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
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderRadius: 12,
        padding: spacing.md,
        gap: spacing.md,
    },
    details: {
        gap: spacing.xs,
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
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