import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
} from 'react';

import { Task, TaskPriority } from '../types/task';

interface TaskContextType {
    tasks: Task[];
    addTask: (
        title: string,
        subject: string,
        priority: TaskPriority
    ) => void;
    updateTask: (
        id: string,
        title: string,
        subject: string,
        priority: TaskPriority
    ) => void;
    toggleTask: (id: string) => void;
    deleteTask: (id: string) => void;
    getTask: (id: string) => Task | undefined;
}

const TaskContext = createContext<TaskContextType | undefined>(
    undefined
);

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

export function TaskProvider({
                                 children,
                             }: {
    children: ReactNode;
}) {
    const [tasks, setTasks] =
        useState<Task[]>(initialTasks);

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

        setTasks((current) => [
            newTask,
            ...current,
        ]);
    };

    const updateTask = (
        id: string,
        title: string,
        subject: string,
        priority: TaskPriority
    ) => {
        setTasks((current) =>
            current.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        title,
                        subject,
                        priority,
                    }
                    : task
            )
        );
    };

    const toggleTask = (id: string) => {
        setTasks((current) =>
            current.map((task) =>
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
        setTasks((current) =>
            current.filter((task) => task.id !== id)
        );
    };

    const getTask = (id: string) => {
        return tasks.find((task) => task.id === id);
    };

    return (
        <TaskContext.Provider
            value={{
                tasks,
                addTask,
                updateTask,
                toggleTask,
                deleteTask,
                getTask,
            }}
        >
            {children}
        </TaskContext.Provider>
    );
}

export function useTasks() {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error(
            'useTasks должен использоваться внутри TaskProvider'
        );
    }

    return context;
}