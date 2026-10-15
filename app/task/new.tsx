import React from 'react';

import {
    View,
    StyleSheet,
} from 'react-native';

import { router } from 'expo-router';

import TaskForm from '../../src/components/TaskForm';
import { useTasks } from '../../src/context/TaskContext';
import { TaskPriority } from '../../src/types/task';

export default function NewTaskScreen() {
    const { addTask } = useTasks();

    const handleSubmit = (
        title: string,
        subject: string,
        priority: TaskPriority
    ) => {
        addTask(title, subject, priority);

        router.back();
    };

    return (
        <View style={styles.container}>
            <TaskForm
                mode="create"
                onSubmit={handleSubmit}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F2F4F7',
        padding: 16,
    },
});