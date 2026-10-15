import React from 'react';

import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import {
    router,
    useLocalSearchParams,
} from 'expo-router';

import TaskForm from '../../../src/components/TaskForm';
import { useTasks } from '../../../src/context/TaskContext';
import { TaskPriority } from '../../../src/types/task';

export default function EditTaskScreen() {
    const { id } =
        useLocalSearchParams<{
            id: string;
        }>();

    const {
        getTask,
        updateTask,
    } = useTasks();

    const task = getTask(id);

    if (!task) {
        return (
            <View style={styles.center}>
                <Text>Задача не найдена</Text>
            </View>
        );
    }

    const handleSubmit = (
        title: string,
        subject: string,
        priority: TaskPriority
    ) => {
        updateTask(
            task.id,
            title,
            subject,
            priority
        );

        router.back();
    };

    return (
        <View style={styles.container}>
            <TaskForm
                mode="edit"
                initialTask={task}
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

    center: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});