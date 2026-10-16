import { useMemo, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import type { TaskStatus } from '../src/types/task';
import { useTasks } from '../src/hooks/useTasks';
import { useTheme } from '../src/context/ThemeContext';
import { Screen } from '../src/components/ui/Screen';
import { AppButton } from '../src/components/ui/AppButton';
import { AppInput } from '../src/components/ui/AppInput';
import { EmptyState } from '../src/components/ui/EmptyState';
import { TaskCard } from '../src/components/task/TaskCard';
import { countTasks, filterTasks, sortTasksByPriority } from '../src/utils/task';
import { colors } from '../src/theme/colors';
import { spacing } from '../src/theme/spacing';

export default function HomeScreen() {
    const { tasks, isTasksLoading, removeTask, toggleTaskStatus } = useTasks();
    const { theme } = useTheme();
    const palette = colors[theme];
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<
        'all' | TaskStatus
    >('all');

    const stats = countTasks(tasks);

    const visibleTasks = useMemo(() => {
        const searchedTasks = filterTasks(tasks, search);

        const filteredTasks =
            statusFilter === 'all'
                ? searchedTasks
                : searchedTasks.filter(
                    (task) => task.status === statusFilter
                );

        return sortTasksByPriority(filteredTasks);
    }, [tasks, search, statusFilter]);

    return (
        <Screen>
            <View style={styles.header}>
                <Text style={[styles.title, { color: palette.text }]}>
                    Учебные задачи
                </Text>
                <Text style={{ color: palette.secondaryText }}>
                    Планируй учёбу и следи за выполнением заданий
                </Text>
            </View>

            <View
                style={[
                    styles.statistics,
                    { backgroundColor: palette.surface, borderColor: palette.border },
                ]}
            >
                <View style={styles.statisticItem}>
                    <Text style={[styles.statisticNumber, { color: palette.primary }]}>
                        {stats.active}
                    </Text>
                    <Text style={{ color: palette.secondaryText }}>Активных</Text>
                </View>

                <View style={styles.statisticItem}>
                    <Text style={[styles.statisticNumber, { color: palette.success }]}>
                        {stats.completed}
                    </Text>
                    <Text style={{ color: palette.secondaryText }}>Завершённых</Text>
                </View>
            </View>

            <AppInput
                label="Поиск задач"
                value={search}
                onChangeText={setSearch}
                placeholder="Название задачи или предмет"
            />

            <View style={styles.filters}>
                <View style={styles.filterButton}>
                    <AppButton
                        title="Все"
                        variant={statusFilter === 'all' ? 'primary' : 'secondary'}
                        onPress={() => setStatusFilter('all')}
                    />
                </View>

                <View style={styles.filterButton}>
                    <AppButton
                        title="Активные"
                        variant={statusFilter === 'active' ? 'primary' : 'secondary'}
                        onPress={() => setStatusFilter('active')}
                    />
                </View>

                <View style={styles.filterButton}>
                    <AppButton
                        title="Выполненные"
                        variant={statusFilter === 'completed' ? 'primary' : 'secondary'}
                        onPress={() => setStatusFilter('completed')}
                    />
                </View>
            </View>

            <View style={styles.mainActions}>
                <View style={styles.actionButton}>
                    <AppButton
                        title="Добавить задачу"
                        onPress={() => router.push('/task/new')}
                    />
                </View>
                <View style={styles.actionButton}>
                    <AppButton
                        title="Настройки"
                        variant="secondary"
                        onPress={() => router.push('/settings')}
                    />
                </View>
            </View>

            {isTasksLoading ? (
                <Text style={{ color: palette.secondaryText }}>
                    Загружаем задачи...
                </Text>
            ) : (
                <FlatList
                    style={styles.list}
                    data={visibleTasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <TaskCard
                            task={item}
                            onPress={() =>
                                router.push({
                                    pathname: '/task/[id]',
                                    params: { id: item.id },
                                })
                            }
                            onToggleStatus={() => toggleTaskStatus(item.id)}
                            onDelete={() => removeTask(item.id)}
                        />
                    )}
                    ItemSeparatorComponent={() => <View style={{ height: spacing.sm }} />}
                    ListEmptyComponent={
                        <EmptyState
                            icon={search.trim() ? '🔎' : '📚'}
                            title={
                                search.trim() || statusFilter !== 'all'
                                    ? 'Задачи не найдены'
                                    : 'Пока нет задач'
                            }
                            description={
                                search.trim()
                                    ? 'Попробуй изменить поисковый запрос или фильтр.'
                                    : statusFilter === 'active'
                                        ? 'Активных задач пока нет.'
                                        : statusFilter === 'completed'
                                            ? 'Завершённых задач пока нет.'
                                            : 'Добавь первую задачу, чтобы начать планирование.'
                            }
                            actionLabel={search.trim() ? undefined : 'Добавить задачу'}
                            onAction={
                                search.trim() ? undefined : () => router.push('/task/new')
                            }
                        />
                    }
                    contentContainerStyle={styles.listContent}
                    keyboardShouldPersistTaps="handled"
                />
            )}
        </Screen>
    );
}

const styles = StyleSheet.create({
    header: {
        gap: spacing.xs,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
    },
    statistics: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: spacing.md,
        borderWidth: 1,
        borderRadius: 12,
    },
    statisticItem: {
        alignItems: 'center',
        gap: spacing.xs,
    },
    statisticNumber: {
        fontSize: 24,
        fontWeight: '700',
    },
    mainActions: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    actionButton: {
        flex: 1,
    },
    list: {
        flex: 1,
    },
    listContent: {
        flexGrow: 1,
        paddingVertical: spacing.sm,
        gap: spacing.sm,
    },
    filters: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    filterButton: {
        flexGrow: 1,
        flexBasis: 90,
    },
});