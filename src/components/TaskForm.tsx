import React, { useEffect, useState } from 'react';

import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
    Task,
    TaskPriority,
} from '../types/task';

interface TaskFormProps {
    initialTask?: Task;
    onSubmit: (
        title: string,
        subject: string,
        priority: TaskPriority
    ) => void;
    mode: 'create' | 'edit';
}

const DRAFT_KEY =
    '@campus-planner/task-draft';

export default function TaskForm({
                                     initialTask,
                                     onSubmit,
                                     mode,
                                 }: TaskFormProps) {
    const [title, setTitle] =
        useState(initialTask?.title ?? '');

    const [subject, setSubject] =
        useState(initialTask?.subject ?? '');

    const [priority, setPriority] =
        useState<TaskPriority>(
            initialTask?.priority ?? 'medium'
        );

    useEffect(() => {
        if (mode !== 'create') {
            return;
        }

        const loadDraft = async () => {
            try {
                const draft =
                    await AsyncStorage.getItem(
                        DRAFT_KEY
                    );

                if (draft) {
                    const data = JSON.parse(draft);

                    setTitle(data.title ?? '');
                    setSubject(data.subject ?? '');
                    setPriority(
                        data.priority ?? 'medium'
                    );
                }
            } catch (error) {
                console.log(
                    'Ошибка загрузки черновика:',
                    error
                );
            }
        };

        loadDraft();
    }, [mode]);

    useEffect(() => {
        if (mode !== 'create') {
            return;
        }

        const saveDraft = async () => {
            try {
                await AsyncStorage.setItem(
                    DRAFT_KEY,
                    JSON.stringify({
                        title,
                        subject,
                        priority,
                    })
                );
            } catch (error) {
                console.log(
                    'Ошибка сохранения черновика:',
                    error
                );
            }
        };

        if (title || subject) {
            saveDraft();
        }
    }, [title, subject, priority, mode]);

    const handleSubmit = async () => {
        if (!title.trim()) {
            Alert.alert(
                'Ошибка',
                'Введите название задачи'
            );
            return;
        }

        if (!subject.trim()) {
            Alert.alert(
                'Ошибка',
                'Введите название предмета'
            );
            return;
        }

        onSubmit(
            title.trim(),
            subject.trim(),
            priority
        );

        if (mode === 'create') {
            await AsyncStorage.removeItem(
                DRAFT_KEY
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>
                Название задачи
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Например: Сделать лабораторную"
                value={title}
                onChangeText={setTitle}
            />

            <Text style={styles.label}>
                Предмет
            </Text>

            <TextInput
                style={styles.input}
                placeholder="Например: Программирование"
                value={subject}
                onChangeText={setSubject}
            />

            <Text style={styles.label}>
                Приоритет
            </Text>

            <View style={styles.priorityContainer}>
                {(
                    [
                        ['low', 'Низкий'],
                        ['medium', 'Средний'],
                        ['high', 'Высокий'],
                    ] as [
                        TaskPriority,
                        string
                    ][]
                ).map(([value, text]) => (
                    <TouchableOpacity
                        key={value}
                        style={[
                            styles.priorityButton,
                            priority === value &&
                            styles.selectedPriority,
                        ]}
                        onPress={() =>
                            setPriority(value)
                        }
                    >
                        <Text>{text}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity
                style={styles.submitButton}
                onPress={handleSubmit}
            >
                <Text style={styles.submitText}>
                    {mode === 'create'
                        ? 'Создать задачу'
                        : 'Сохранить изменения'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
    },

    label: {
        fontSize: 15,
        fontWeight: '600',
        marginBottom: 6,
    },

    input: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 14,
    },

    priorityContainer: {
        flexDirection: 'row',
        gap: 8,
        marginBottom: 18,
    },

    priorityButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 8,
        padding: 10,
        alignItems: 'center',
    },

    selectedPriority: {
        borderWidth: 2,
        borderColor: '#2196F3',
    },

    submitButton: {
        backgroundColor: '#2196F3',
        borderRadius: 8,
        padding: 14,
        alignItems: 'center',
    },

    submitText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: 'bold',
    },
});