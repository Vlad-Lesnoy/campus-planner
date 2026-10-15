import React, { useMemo, useState } from 'react';

import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
} from 'react-native';

import { router } from 'expo-router';

import TaskCard from '../src/components/TaskCard';
import { useTasks } from '../src/context/TaskContext';
import { useTheme } from '../src/context/ThemeContext';

type Filter = 'all' | 'active' | 'completed';

export default function HomeScreen() {
    const {
        tasks,
        toggleTask,
        deleteTask,
    } = useTasks();

    const { theme } = useTheme();

    const [filter, setFilter] =
        useState<Filter>('all');

    const isDark = theme === 'dark';

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

    return (
        <View
            style={[
                styles.container,
                isDark && styles.darkContainer,
            ]}
        >
            <FlatList
                data={filteredTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskCard
                        task={item}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                        onPress={() =>
                            router.push({
                                pathname: '/task/[id]',
                                params: {
                                    id: item.id,
                                },
                            })
                        }
                    />
                )}
                ListHeaderComponent={
                    <View>
                        <Text
                            style={[
                                styles.title,
                                isDark && styles.darkText,
                            ]}
                        >
                            Campus Planner
                        </Text>

                        <Text
                            style={[
                                styles.subtitle,
                                isDark && styles.darkSecondaryText,
                            ]}
                        >
                            Планировщик учебных задач
                        </Text>

                        <View style={styles.statistics}>
                            <View
                                style={[
                                    styles.statCard,
                                    isDark && styles.darkCard,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.statNumber,
                                        isDark && styles.darkText,
                                    ]}
                                >
                                    {tasks.length}
                                </Text>

                                <Text
                                    style={[
                                        styles.statText,
                                        isDark &&
                                        styles.darkSecondaryText,
                                    ]}
                                >
                                    Всего задач
                                </Text>
                            </View>

                            <View
                                style={[
                                    styles.statCard,
                                    isDark && styles.darkCard,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.statNumber,
                                        isDark && styles.darkText,
                                    ]}
                                >
                                    {completedCount}
                                </Text>

                                <Text
                                    style={[
                                        styles.statText,
                                        isDark &&
                                        styles.darkSecondaryText,
                                    ]}
                                >
                                    Выполнено
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.addButton}
                            onPress={() =>
                                router.push('/task/new')
                            }
                        >
                            <Text style={styles.addButtonText}>
                                + Добавить задачу
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[
                                styles.settingsButton,
                                isDark && styles.darkCard,
                            ]}
                            onPress={() =>
                                router.push('/settings')
                            }
                        >
                            <Text
                                style={[
                                    styles.settingsText,
                                    isDark && styles.darkText,
                                ]}
                            >
                                Настройки
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.filters}>
                            {[
                                ['all', 'Все'],
                                ['active', 'Активные'],
                                ['completed', 'Выполненные'],
                            ].map(([value, title]) => (
                                <TouchableOpacity
                                    key={value}
                                    style={[
                                        styles.filterButton,
                                        isDark && styles.darkCard,
                                        filter === value &&
                                        styles.activeFilter,
                                    ]}
                                    onPress={() =>
                                        setFilter(value as Filter)
                                    }
                                >
                                    <Text
                                        style={[
                                            styles.filterText,
                                            isDark && styles.darkText,
                                            filter === value &&
                                            styles.activeFilterText,
                                        ]}
                                    >
                                        {title}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                }
                ListEmptyComponent={
                    <View style={styles.empty}>
                        <Text
                            style={[
                                styles.emptyText,
                                isDark && styles.darkSecondaryText,
                            ]}
                        >
                            Список пока пуст
                        </Text>
                    </View>
                }
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F4F7',
    },

    darkContainer: {
        backgroundColor: '#121212',
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

    darkText: {
        color: '#FFFFFF',
    },

    darkSecondaryText: {
        color: '#BBBBBB',
    },

    statistics: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 16,
    },

    statCard: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
    },

    darkCard: {
        backgroundColor: '#242424',
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

    addButton: {
        backgroundColor: '#2196F3',
        borderRadius: 10,
        padding: 14,
        alignItems: 'center',
        marginBottom: 10,
    },

    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },

    settingsButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        padding: 13,
        alignItems: 'center',
        marginBottom: 14,
    },

    settingsText: {
        fontSize: 15,
        fontWeight: '600',
    },

    filters: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 16,
    },

    filterButton: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        paddingVertical: 10,
        alignItems: 'center',
    },

    activeFilter: {
        backgroundColor: '#2196F3',
    },

    filterText: {
        fontWeight: '600',
    },

    activeFilterText: {
        color: '#FFFFFF',
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