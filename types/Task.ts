export interface Task {
    id: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: number;
    updatedAt: number;
}

export type TaskInput = Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completed'>;

export type TaskUpdate = Partial<Omit<Task, 'id' | 'createdAt'>>;
