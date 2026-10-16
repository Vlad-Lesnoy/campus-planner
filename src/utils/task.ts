import type { Task, TaskPriority, TaskStatus } from '../types/task';

export function countTasks(tasks: Task[]) {
    return {
        active: tasks.filter((task) => task.status === 'active').length,
        completed: tasks.filter((task) => task.status === 'completed').length,
        total: tasks.length,
    };
}

export function filterTasks(tasks: Task[], query: string): Task[] {
    const normalizedQuery = query.trim().toLocaleLowerCase();

    if (!normalizedQuery) {
        return tasks;
    }

    return tasks.filter(
        (task) =>
            task.title.toLocaleLowerCase().includes(normalizedQuery) ||
            task.subject.toLocaleLowerCase().includes(normalizedQuery)
    );
}

const priorityOrder: Record<TaskPriority, number> = {
    high: 0,
    medium: 1,
    low: 2,
};

export function sortTasksByPriority(tasks: Task[]): Task[] {
    return [...tasks].sort(
        (a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]
    );
}

export function filterTasksByStatus(
    tasks: Task[],
    status: TaskStatus
): Task[] {
    return tasks.filter((task) => task.status === status);
}

export function isTaskOverdue(task: Task): boolean {
    if (!task.dueDate || task.status === 'completed') {
        return false;
    }

    const dueDate = new Date(`${task.dueDate}T23:59:59`);
    return !Number.isNaN(dueDate.getTime()) && dueDate.getTime() < Date.now();
}