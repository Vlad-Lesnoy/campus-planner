import { router } from 'expo-router';
import { Text } from 'react-native';

import { useTasks } from '../../src/hooks/useTasks';
import { useTheme } from '../../src/context/ThemeContext';
import { TaskForm } from '../../src/components/task/TaskForm';
import { Screen } from '../../src/components/ui/Screen';
import { colors } from '../../src/theme/colors';
import { spacing } from '../../src/theme/spacing';

export default function NewTaskScreen() {
    const { createTask } = useTasks();
    const { theme } = useTheme();
    const palette = colors[theme];

    const handleSubmit = (input: Parameters<typeof createTask>[0]) => {
        createTask(input);
        router.replace('/');
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
                Новая задача
            </Text>

            <TaskForm onSubmit={handleSubmit} />
        </Screen>
    );
}