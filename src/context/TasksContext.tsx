import {
    createContext,
    useCallback,
    useEffect,
    useState,
    type ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type {
    Task,
    CreateTaskInput,
    UpdateTaskInput,
} from '../types/task';

const TASKS_STORAGE_KEY = '@campus-planner/tasks';

interface TasksContextType {
    tasks: Task[];
    isTasksLoading: boolean;
    createTask: (input: CreateTaskInput) => Task;
    updateTask: (id: string, input: UpdateTaskInput) => void;
    removeTask: (id: string) => void;
    toggleTaskStatus: (id: string) => void;
    getTaskById: (id: string) => Task | undefined;
}

export const TasksContext = createContext<
    TasksContextType | undefined
>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isTasksLoading, setIsTasksLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        async function loadTasks() {
            try {
                const stored = await AsyncStorage.getItem(TASKS_STORAGE_KEY);

                if (!mounted) {
                    return;
                }

                if (stored !== null) {
                    const parsed: unknown = JSON.parse(stored);

                    if (Array.isArray(parsed)) {
                        setTasks(parsed as Task[]);
                    }
                } else {
                    const initialTasks: Task[] = [
                        {
                            id: 'initial-1',
                            title: 'Подготовить лабораторную работу',
                            subject: 'Программирование',
                            priority: 'high',
                            status: 'active',
                            createdAt: new Date().toISOString(),
                            dueDate: '2027-12-31',
                        },
                        {
                            id: 'initial-2',
                            title: 'Повторить лекционный материал',
                            subject: 'Математика',
                            priority: 'medium',
                            status: 'active',
                            createdAt: new Date().toISOString(),
                        },
                        {
                            id: 'initial-3',
                            title: 'Оформить отчёт',
                            subject: 'Информатика',
                            priority: 'high',
                            status: 'completed',
                            createdAt: new Date().toISOString(),
                        },
                        {
                            id: 'initial-4',
                            title: 'Прочитать учебную главу',
                            subject: 'Английский язык',
                            priority: 'low',
                            status: 'active',
                            createdAt: new Date().toISOString(),
                        },
                    ];

                    setTasks(initialTasks);
                }
            } catch (error) {
                console.error('Не удалось загрузить задачи:', error);
            } finally {
                if (mounted) {
                    setIsTasksLoading(false);
                }
            }
        }

        void loadTasks();

        return () => {
            mounted = false;
        };
    }, []);

    useEffect(() => {
        if (isTasksLoading) {
            return;
        }

        AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks)).catch(
            (error: unknown) => {
                console.error('Не удалось сохранить задачи:', error);
            }
        );
    }, [tasks, isTasksLoading]);

    const createTask = useCallback((input: CreateTaskInput): Task => {
        const task: Task = {
            ...input,
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
            createdAt: new Date().toISOString(),
            status: 'active',
        };

        setTasks((current) => [task, ...current]);
        return task;
    }, []);

    const updateTask = useCallback(
        (id: string, input: UpdateTaskInput) => {
            setTasks((current) =>
                current.map((task) =>
                    task.id === id ? { ...task, ...input } : task
                )
            );
        },
        []
    );

    const removeTask = useCallback((id: string) => {
        setTasks((current) => current.filter((task) => task.id !== id));
    }, []);

    const toggleTaskStatus = useCallback((id: string) => {
        setTasks((current) =>
            current.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        status:
                            task.status === 'active' ? 'completed' : 'active',
                    }
                    : task
            )
        );
    }, []);

    const getTaskById = useCallback(
        (id: string) => tasks.find((task) => task.id === id),
        [tasks]
    );

    return (
        <TasksContext.Provider
            value={{
                tasks,
                isTasksLoading,
                createTask,
                updateTask,
                removeTask,
                toggleTaskStatus,
                getTaskById,
            }}
        >
            {children}
        </TasksContext.Provider>
    );
}