import React, { useMemo, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    FlatList,
} from 'react-native';

import TaskCard from './src/components/TaskCard';
import TaskForm from './src/components/TaskForm';
import {
    Task,
    TaskPriority,
} from './src/types/task';

type Filter = 'all' | 'active' | 'completed';

const initialTasks: Task[] = [
    {
        id: '1',
        title: 'Подготовить лабораторную работу',
        subject: 'Программирование',
        priority: 'high',
        isCompleted: false,
    },
    {
        id: '2',
        title: 'Повторить тему по базам данных',
        subject: 'Базы данных',
        priority: 'medium',
        isCompleted: false,
    },
    {
        id: '3',
        title: 'Сделать презентацию',
        subject: 'Информационные технологии',
        priority: 'low',
        isCompleted: true,
    },
    {
        id: '4',
        title: 'Подготовиться к контрольной',
        subject: 'Математика',
        priority: 'high',
        isCompleted: false,
    },
];

export default function App() {
    const [tasks, setTasks] =
        useState<Task[]>(initialTasks);

    const [filter, setFilter] =
        useState<Filter>('all');

    const completedCount = tasks.filter(
        (task) => task.isCompleted
    ).length;

    const filteredTasks = useMemo(() => {
        if (filter === 'active') {
            return tasks.filter(
                (task) => !task.isCompleted
            );
        }

        if (filter === 'completed') {
            return tasks.filter(
                (task) => task.isCompleted
            );
        }

        return tasks;
    }, [tasks, filter]);

    const addTask = (
        title: string,
        subject: string,
        priority: TaskPriority
    ) => {
        const newTask: Task = {
            id: String(Date.now()),
            title,
            subject,
            priority,
            isCompleted: false,
        };

        setTasks((currentTasks) => [
            newTask,
            ...currentTasks,
        ]);
    };

    const toggleTask = (id: string) => {
        setTasks((currentTasks) =>
            currentTasks.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        isCompleted: !task.isCompleted,
                    }
                    : task
            )
        );
    };

    const deleteTask = (id: string) => {
        setTasks((currentTasks) =>
            currentTasks.filter(
                (task) => task.id !== id
            )
        );
    };

    const renderFilterButton = (
        value: Filter,
        title: string
    ) => {
        return (
            <Text
                style={[
                    styles.filterButton,
                    filter === value &&
                    styles.activeFilter,
                ]}
                onPress={() => setFilter(value)}
            >
                {title}
            </Text>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskCard
                        task={item}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                    />
                )}
                ListHeaderComponent={
                    <View>
                        <Text style={styles.title}>
                            Campus Planner
                        </Text>

                        <Text style={styles.subtitle}>
                            Планировщик учебных задач
                        </Text>

                        <View style={styles.statistics}>
                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>
                                    {tasks.length}
                                </Text>

                                <Text style={styles.statText}>
                                    Всего задач
                                </Text>
                            </View>

                            <View style={styles.statCard}>
                                <Text style={styles.statNumber}>
                                    {completedCount}
                                </Text>

                                <Text style={styles.statText}>
                                    Выполнено
                                </Text>
                            </View>
                        </View>

                        <TaskForm onAdd={addTask} />

                        <View style={styles.filters}>
                            {renderFilterButton(
                                'all',
                                'Все'
                            )}

                            {renderFilterButton(
                                'active',
                                'Активные'
                            )}

                            {renderFilterButton(
                                'completed',
                                'Выполненные'
                            )}
                        </View>
                    </View>
                }
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text style={styles.emptyText}>
                            Список пока пуст
                        </Text>
                    </View>
                }
                contentContainerStyle={styles.list}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F4F7',
    },

    list: {
        padding: 16,
        paddingBottom: 30,
    },

    title: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 4,
    },

    subtitle: {
        fontSize: 16,
        color: '#666666',
        marginBottom: 16,
    },

    statistics: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 16,
    },

    statCard: {
        flex: 1,
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },

    statNumber: {
        fontSize: 26,
        fontWeight: 'bold',
    },

    statText: {
        fontSize: 13,
        color: '#666666',
        marginTop: 4,
    },

    filters: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 8,
    },

    filterButton: {
        flex: 1,
        textAlign: 'center',
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 8,
        backgroundColor: '#ffffff',
        color: '#555555',
        fontWeight: '600',
    },

    activeFilter: {
        backgroundColor: '#2196F3',
        color: '#ffffff',
    },

    empty: {
        padding: 30,
        alignItems: 'center',
    },

    emptyText: {
        fontSize: 16,
        color: '#777777',
    },
});