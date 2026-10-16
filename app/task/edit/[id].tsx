import { router, useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';

import { useTasks } from '../../../src/hooks/useTasks';
import { useTheme } from '../../../src/context/ThemeContext';
import { TaskForm } from '../../../src/components/task/TaskForm';
import { Screen } from '../../../src/components/ui/Screen';
import { EmptyState } from '../../../src/components/ui/EmptyState';
import { colors } from '../../../src/theme/colors';
import { spacing } from '../../../src/theme/spacing';

export default function EditTaskScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const { getTaskById, updateTask } = useTasks();
    const { theme } = useTheme();
    const palette = colors[theme];

    const task = getTaskById(id);

    if (!task) {
        return (
            <Screen>
                <EmptyState
                    icon="🔎"
                    title="Задача не найдена"
                    description="Невозможно отредактировать удалённую задачу."
                    actionLabel="Вернуться назад"
                    onAction={() => router.back()}
                />
            </Screen>
        );
    }

    const handleSubmit = (input: Parameters<typeof updateTask>[1]) => {
        updateTask(task.id, input);
        router.replace({
            pathname: '/task/[id]',
            params: { id: task.id },
        });
    };

    return (
        <Screen>
            <Text
                style={{
                    color: palette.text,
                    fontSize: 24,
                    fontWeight: '700',
                    marginBottom: spacing.sm,
                }}
            >
                Редактирование задачи
            </Text>

            <TaskForm
                key={task.id}
                initialTask={task}
                submitLabel="Сохранить изменения"
                onSubmit={handleSubmit}
            />
        </Screen>
    );
}