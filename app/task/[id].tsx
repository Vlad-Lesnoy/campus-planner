import React from 'react';

import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

import {
    router,
    useLocalSearchParams,
} from 'expo-router';

import { useTasks } from '../../src/context/TaskContext';

export default function TaskDetailsScreen() {
    const { id } =
        useLocalSearchParams<{
            id: string;
        }>();

    const {
        getTask,
        toggleTask,
        deleteTask,
    } = useTasks();

    const task = getTask(id);

    if (!task) {
        return (
            <View style={styles.center}>
                <Text style={styles.error}>
                    Задача не найдена
                </Text>

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.back()}
                >
                    <Text style={styles.buttonText}>
                        Вернуться к списку
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    const priorityText = {
        low: 'Низкий',
        medium: 'Средний',
        high: 'Высокий',
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>
                    {task.title}
                </Text>

                <Text style={styles.item}>
                    Предмет: {task.subject}
                </Text>

                <Text style={styles.item}>
                    Приоритет:{' '}
                    {priorityText[task.priority]}
                </Text>

                <Text style={styles.item}>
                    Статус:{' '}
                    {task.isCompleted
                        ? 'Выполнено'
                        : 'Активно'}
                </Text>

                <TouchableOpacity
                    style={styles.completeButton}
                    onPress={() =>
                        toggleTask(task.id)
                    }
                >
                    <Text style={styles.buttonText}>
                        {task.isCompleted
                            ? 'Вернуть в активные'
                            : 'Отметить выполненной'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() =>
                        router.push({
                            pathname: '/task/edit/[id]',
                            params: {
                                id: task.id,
                            },
                        })
                    }
                >
                    <Text style={styles.buttonText}>
                        Редактировать
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => {
                        deleteTask(task.id);
                        router.back();
                    }}
                >
                    <Text style={styles.buttonText}>
                        Удалить
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F4F7',
        padding: 16,
    },

    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 20,
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },

    item: {
        fontSize: 16,
        marginBottom: 12,
    },

    completeButton: {
        backgroundColor: '#4CAF50',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },

    editButton: {
        backgroundColor: '#2196F3',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },

    deleteButton: {
        backgroundColor: '#E53935',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },

    button: {
        backgroundColor: '#2196F3',
        padding: 14,
        borderRadius: 8,
        marginTop: 20,
    },

    buttonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
        textAlign: 'center',
    },

    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    error: {
        fontSize: 18,
        marginBottom: 10,
    },
});