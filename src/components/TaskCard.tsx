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
    onPress: () => void;
}

export default function TaskCard({
                                     task,
                                     onToggle,
                                     onDelete,
                                     onPress,
                                 }: TaskCardProps) {
    const priorityText = {
        low: 'Низкий',
        medium: 'Средний',
        high: 'Высокий',
    };

    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.8}
        >
            <View
                style={[
                    styles.card,
                    task.isCompleted &&
                    styles.completedCard,
                ]}
            >
                <Text
                    style={[
                        styles.title,
                        task.isCompleted &&
                        styles.completedTitle,
                    ]}
                >
                    {task.title}
                </Text>

                <Text style={styles.text}>
                    Предмет: {task.subject}
                </Text>

                <Text style={styles.text}>
                    Приоритет: {priorityText[task.priority]}
                </Text>

                <Text style={styles.text}>
                    Статус:{' '}
                    {task.isCompleted
                        ? 'Выполнено'
                        : 'Активно'}
                </Text>

                <View style={styles.buttons}>
                    <TouchableOpacity
                        style={styles.completeButton}
                        onPress={() =>
                            onToggle(task.id)
                        }
                    >
                        <Text style={styles.buttonText}>
                            {task.isCompleted
                                ? 'Вернуть'
                                : 'Выполнить'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() =>
                            onDelete(task.id)
                        }
                    >
                        <Text style={styles.buttonText}>
                            Удалить
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        elevation: 3,
    },

    completedCard: {
        opacity: 0.55,
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },

    completedTitle: {
        textDecorationLine: 'line-through',
    },

    text: {
        fontSize: 14,
        marginBottom: 4,
    },

    buttons: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 10,
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
        color: '#FFFFFF',
        fontWeight: '600',
    },
});