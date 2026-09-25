import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';

import { TaskPriority } from '../types/task';

interface TaskFormProps {
    onAdd: (
        title: string,
        subject: string,
        priority: TaskPriority
    ) => void;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [priority, setPriority] =
        useState<TaskPriority>('medium');

    const handleAdd = () => {
        if (!title.trim()) {
            Alert.alert('Ошибка', 'Введите название задачи');
            return;
        }

        if (!subject.trim()) {
            Alert.alert('Ошибка', 'Введите название предмета');
            return;
        }

        onAdd(title.trim(), subject.trim(), priority);

        setTitle('');
        setSubject('');
        setPriority('medium');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}>
                Новая учебная задача
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Название задачи"
                value={title}
                onChangeText={setTitle}
            />

            <TextInput
                style={styles.input}
                placeholder="Предмет"
                value={subject}
                onChangeText={setSubject}
            />

            <Text style={styles.label}>
                Приоритет
            </Text>

            <View style={styles.priorityContainer}>
                <TouchableOpacity
                    style={[
                        styles.priorityButton,
                        priority === 'low' && styles.selectedPriority,
                    ]}
                    onPress={() => setPriority('low')}
                >
                    <Text>Низкий</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.priorityButton,
                        priority === 'medium' && styles.selectedPriority,
                    ]}
                    onPress={() => setPriority('medium')}
                >
                    <Text>Средний</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.priorityButton,
                        priority === 'high' && styles.selectedPriority,
                    ]}
                    onPress={() => setPriority('high')}
                >
                    <Text>Высокий</Text>
                </TouchableOpacity>
            </View>

            <TouchableOpacity
                style={styles.addButton}
                onPress={handleAdd}
            >
                <Text style={styles.addButtonText}>
                    Добавить задачу
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ffffff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 16,
        elevation: 2,
    },

    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 12,
    },

    input: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
        fontSize: 16,
    },

    label: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 8,
    },

    priorityContainer: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 14,
    },

    priorityButton: {
        flex: 1,
        padding: 10,
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 8,
        alignItems: 'center',
    },

    selectedPriority: {
        borderWidth: 2,
        borderColor: '#333333',
    },

    addButton: {
        backgroundColor: '#2196F3',
        padding: 13,
        borderRadius: 8,
        alignItems: 'center',
    },

    addButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});