import React from 'react';

import { Stack } from 'expo-router';

import { TaskProvider } from '../src/context/TaskContext';
import { ThemeProvider } from '../src/context/ThemeContext';

export default function RootLayout() {
    return (
        <ThemeProvider>
            <TaskProvider>
                <Stack
                    screenOptions={{
                        headerTitleAlign: 'center',
                    }}
                >
                    <Stack.Screen
                        name="index"
                        options={{
                            title: 'Campus Planner',
                        }}
                    />

                    <Stack.Screen
                        name="task/new"
                        options={{
                            title: 'Новая задача',
                        }}
                    />

                    <Stack.Screen
                        name="task/[id]"
                        options={{
                            title: 'Детали задачи',
                        }}
                    />

                    <Stack.Screen
                        name="task/edit/[id]"
                        options={{
                            title: 'Редактирование',
                        }}
                    />

                    <Stack.Screen
                        name="settings"
                        options={{
                            title: 'Настройки',
                        }}
                    />
                </Stack>
            </TaskProvider>
        </ThemeProvider>
    );
}