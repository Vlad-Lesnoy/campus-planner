import { Stack } from 'expo-router';

import { TasksProvider } from '../src/context/TasksContext';
import { ThemeProvider } from '../src/context/ThemeContext';

export default function RootLayout() {
    return (
        <ThemeProvider>
            <TasksProvider>
                <Stack
                    screenOptions={{
                        headerStyle: { backgroundColor: '#F5F7FB' },
                        headerTintColor: '#182230',
                        contentStyle: { backgroundColor: '#F5F7FB' },
                    }}
                >
                    <Stack.Screen
                        name="index"
                        options={{ title: 'Campus Planner' }}
                    />
                    <Stack.Screen
                        name="settings"
                        options={{ title: 'Настройки' }}
                    />
                    <Stack.Screen
                        name="task/new"
                        options={{ title: 'Новая задача' }}
                    />
                    <Stack.Screen
                        name="task/[id]"
                        options={{ title: 'Подробности задачи' }}
                    />
                    <Stack.Screen
                        name="task/edit/[id]"
                        options={{ title: 'Редактирование задачи' }}
                    />
                </Stack>
            </TasksProvider>
        </ThemeProvider>
    );
}