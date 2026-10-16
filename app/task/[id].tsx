import { StyleSheet, Text, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';

import { useTasks } from '../../src/hooks/useTasks';
import { useTheme } from '../../src/context/ThemeContext';
import { Screen } from '../../src/components/ui/Screen';
import { AppButton } from '../../src/components/ui/AppButton';
import { EmptyState } from '../../src/components/ui/EmptyState';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';
import { isTaskOverdue } from '../../src/utils/task';

const priorityLabels = {
    low: 'Низкий',
    medium: 'Средний',
    high: 'Высокий',
};

export default function TaskDetailsScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { getTaskById, toggleTaskStatus, removeTask } = useTasks();
    const { theme } = useTheme();
    const palette = colors[theme];

    const task = getTaskById(id);

    if (!task) {
        return (
            <Screen>
                <EmptyState
                    icon="🔎"
                    title="Задача не найдена"
                    description="Возможно, задача была удалена или ссылка устарела."
                    actionLabel="Вернуться назад"
                    onAction={() => router.back()}
                />
            </Screen>
        );
    }

    const overdue = isTaskOverdue(task);

    const handleDelete = () => {
        removeTask(task.id);
        router.back();
    };

    return (
        <Screen>
            <Text style={[styles.heading, { color: palette.text }]}>
                Подробности задачи
            </Text>

            <View
                style={[
                    styles.card,
                    { backgroundColor: palette.surface, borderColor: palette.border },
                ]}
            >
                <Text style={[styles.title, { color: palette.text }]}>
                    {task.title}
                </Text>

                <View style={styles.field}>
                    <Text style={[styles.label, { color: palette.secondaryText }]}>
                        Предмет
                    </Text>
                    <Text style={[styles.value, { color: palette.text }]}>
                        {task.subject}
                    </Text>
                </View>

                <View style={styles.field}>
                    <Text style={[styles.label, { color: palette.secondaryText }]}>
                        Приоритет
                    </Text>
                    <Text style={[styles.value, { color: palette.text }]}>
                        {priorityLabels[task.priority]}
                    </Text>
                </View>

                <View style={styles.field}>
                    <Text style={[styles.label, { color: palette.secondaryText }]}>
                        Статус
                    </Text>
                    <Text style={[styles.value, { color: palette.text }]}>
                        {task.status === 'completed' ? 'Завершена' : 'Активна'}
                    </Text>
                </View>

                <View style={styles.field}>
                    <Text style={[styles.label, { color: palette.secondaryText }]}>
                        Создана
                    </Text>
                    <Text style={[styles.value, { color: palette.text }]}>
                        {new Date(task.createdAt).toLocaleString()}
                    </Text>
                </View>

                {task.dueDate ? (
                    <View style={styles.field}>
                        <Text style={[styles.label, { color: palette.secondaryText }]}>
                            Срок выполнения
                        </Text>
                        <Text
                            style={[
                                styles.value,
                                { color: overdue ? palette.danger : palette.text },
                            ]}
                        >
                            {task.dueDate}
                            {overdue ? ' — просрочена' : ''}
                        </Text>
                    </View>
                ) : null}
            </View>

            <View style={styles.actions}>
                <AppButton
                    title={task.status === 'completed' ? 'Вернуть в активные' : 'Завершить задачу'}
                    onPress={() => toggleTaskStatus(task.id)}
                />
                <AppButton
                    title="Редактировать"
                    variant="secondary"
                    onPress={() =>
                        router.push({
                            pathname: '/task/edit/[id]',
                            params: { id: task.id },
                        })
                    }
                />
                <AppButton
                    title="Удалить задачу"
                    variant="secondary"
                    onPress={handleDelete}
                />
                <AppButton
                    title="Назад"
                    variant="secondary"
                    onPress={() => router.back()}
                />
            </View>
        </Screen>
    );
}

const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        fontWeight: '700',
    },
    card: {
        padding: spacing.md,
        borderRadius: 12,
        borderWidth: 1,
        gap: spacing.md,
    },
    title: {
        fontSize: 22,
        fontWeight: '700',
    },
    field: {
        gap: spacing.xs,
    },
    label: {
        fontSize: 13,
    },
    value: {
        fontSize: 16,
    },
    actions: {
        gap: spacing.sm,
    },
});