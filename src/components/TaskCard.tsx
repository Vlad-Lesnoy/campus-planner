import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { Task } from '../types/task';

interface TaskCardProps {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
}

export default function TaskCard({
    task,
    onToggle,
    onDelete,
    }: TaskCardProps) {
    const priorityText = {
        low: 'Низкий',
        medium: 'Средний',
        high: 'Высокий',
    };

    return (
        <View
            style={[
                styles.card,
                task.isCompleted && styles.completedCard,
            ]}
        >
            <View style={styles.content}>
                <Text
                    style={[
                        styles.title,
                        task.isCompleted && styles.completedTitle,
                    ]}
                >
                    {task.title}
                </Text>

                <Text style={styles.subject}>
                    Предмет: {task.subject}
                </Text>

                <Text style={styles.priority}>
                    Приоритет: {priorityText[task.priority]}
                </Text>

                <Text style={styles.status}>
                    Статус: {task.isCompleted ? 'Выполнено' : 'Активно'}
                </Text>
            </View>

            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.completeButton}
                    onPress={() => onToggle(task.id)}
                >
                    <Text style={styles.buttonText}>
                        {task.isCompleted ? 'Вернуть' : 'Выполнить'}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => onDelete(task.id)}
                >
                    <Text style={styles.buttonText}>Удалить</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: {
            width: 0,
            height: 2,
        },
    },

    completedCard: {
        opacity: 0.55,
    },

    content: {
        marginBottom: 12,
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
    },

    completedTitle: {
        textDecorationLine: 'line-through',
    },

    subject: {
        fontSize: 14,
        marginBottom: 4,
    },

    priority: {
        fontSize: 14,
        marginBottom: 4,
    },

    status: {
        fontSize: 14,
    },

    buttons: {
        flexDirection: 'row',
        gap: 8,
    },

    completeButton: {
        flex: 1,
        backgroundColor: '#4CAF50',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },

    deleteButton: {
        flex: 1,
        backgroundColor: '#E53935',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
    },

    buttonText: {
        color: '#ffffff',
        fontWeight: '600',
    },
});