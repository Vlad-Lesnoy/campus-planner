import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { CreateTaskInput, Task, TaskPriority } from '../../types/task';
import { useTheme } from '../../context/ThemeContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { AppInput } from '../ui/AppInput';
import { AppButton } from '../ui/AppButton';

const DRAFT_STORAGE_KEY = '@campus-planner/task-draft';

interface TaskFormProps {
    initialTask?: Task;
    submitLabel?: string;
    onSubmit: (input: CreateTaskInput) => void;
}

const priorities: { value: TaskPriority; label: string }[] = [
    { value: 'low', label: 'Низкий' },
    { value: 'medium', label: 'Средний' },
    { value: 'high', label: 'Высокий' },
];

export function TaskForm({
                             initialTask,
                             submitLabel = 'Добавить задачу',
                             onSubmit,
                         }: TaskFormProps) {
    const { theme } = useTheme();
    const palette = colors[theme];

    const [title, setTitle] = useState(initialTask?.title ?? '');
    const [subject, setSubject] = useState(initialTask?.subject ?? '');
    const [priority, setPriority] = useState<TaskPriority>(
        initialTask?.priority ?? 'medium'
    );
    const [dueDate, setDueDate] = useState(initialTask?.dueDate ?? '');

    const [titleError, setTitleError] = useState('');
    const [subjectError, setSubjectError] = useState('');
    const [draftLoaded, setDraftLoaded] = useState(Boolean(initialTask));

    useEffect(() => {
        if (initialTask) {
            setDraftLoaded(true);
            return;
        }

        let mounted = true;

        async function loadDraft() {
            try {
                const saved = await AsyncStorage.getItem(DRAFT_STORAGE_KEY);

                if (!mounted || !saved) {
                    return;
                }

                const draft: unknown = JSON.parse(saved);

                if (
                    typeof draft === 'object' &&
                    draft !== null &&
                    'title' in draft &&
                    'subject' in draft &&
                    'priority' in draft &&
                    'dueDate' in draft
                ) {
                    const value = draft as {
                        title: string;
                        subject: string;
                        priority: TaskPriority;
                        dueDate: string;
                    };

                    setTitle(value.title);
                    setSubject(value.subject);
                    setPriority(value.priority);
                    setDueDate(value.dueDate);
                }
            } catch (error) {
                console.error('Не удалось загрузить черновик:', error);
            } finally {
                if (mounted) {
                    setDraftLoaded(true);
                }
            }
        }

        void loadDraft();

        return () => {
            mounted = false;
        };
    }, [initialTask]);

    useEffect(() => {
        if (!draftLoaded || initialTask) {
            return;
        }

        AsyncStorage.setItem(
            DRAFT_STORAGE_KEY,
            JSON.stringify({ title, subject, priority, dueDate })
        ).catch((error: unknown) => {
            console.error('Не удалось сохранить черновик:', error);
        });
    }, [title, subject, priority, dueDate, draftLoaded, initialTask]);

    const handleSubmit = async () => {
        const cleanTitle = title.trim();
        const cleanSubject = subject.trim();

        setTitleError(cleanTitle ? '' : 'Введите название задачи');
        setSubjectError(cleanSubject ? '' : 'Введите название предмета');

        if (!cleanTitle || !cleanSubject) {
            return;
        }

        const input: CreateTaskInput = {
            title: cleanTitle,
            subject: cleanSubject,
            priority,
            ...(dueDate.trim() ? { dueDate: dueDate.trim() } : {}),
        };

        if (!initialTask) {
            try {
                await AsyncStorage.removeItem(DRAFT_STORAGE_KEY);
            } catch (error) {
                console.error('Не удалось очистить черновик:', error);
            }
        }

        onSubmit(input);
    };

    return (
        <View style={styles.container}>
            <AppInput
                label="Название задачи"
                value={title}
                onChangeText={(value) => {
                    setTitle(value);
                    if (value.trim()) setTitleError('');
                }}
                placeholder="Например, подготовить доклад"
                error={titleError}
            />

            <AppInput
                label="Предмет"
                value={subject}
                onChangeText={(value) => {
                    setSubject(value);
                    if (value.trim()) setSubjectError('');
                }}
                placeholder="Например, программирование"
                error={subjectError}
            />

            <AppInput
                label="Срок выполнения (необязательно)"
                value={dueDate}
                onChangeText={setDueDate}
                placeholder="ГГГГ-ММ-ДД"
                autoCapitalize="none"
            />

            <Text style={[styles.label, { color: palette.text }]}>
                Приоритет
            </Text>

            <View style={styles.priorities}>
                {priorities.map((item) => (
                    <View key={item.value} style={styles.priorityButton}>
                        <AppButton
                            title={item.label}
                            variant={priority === item.value ? 'primary' : 'secondary'}
                            onPress={() => setPriority(item.value)}
                        />
                    </View>
                ))}
            </View>

            <AppButton title={submitLabel} onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: spacing.md,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
    },
    priorities: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    priorityButton: {
        flexGrow: 1,
        flexBasis: 90,
    },
});