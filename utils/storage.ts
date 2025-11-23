import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task, TaskInput, TaskUpdate } from '../types/Task';

const STORAGE_KEY = '@todo_tasks';

/**
 * Get all tasks from AsyncStorage
 */
export const getTasks = async (): Promise<Task[]> => {
    try {
        const tasksJson = await AsyncStorage.getItem(STORAGE_KEY);
        if (tasksJson === null) {
            return [];
        }
        return JSON.parse(tasksJson);
    } catch (error) {
        console.error('Error getting tasks:', error);
        return [];
    }
};

/**
 * Save tasks array to AsyncStorage
 */
export const saveTasks = async (tasks: Task[]): Promise<boolean> => {
    try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        return true;
    } catch (error) {
        console.error('Error saving tasks:', error);
        return false;
    }
};

/**
 * Add a new task
 */
export const addTask = async (taskInput: TaskInput): Promise<Task | null> => {
    try {
        const tasks = await getTasks();
        const newTask: Task = {
            id: Date.now().toString(),
            ...taskInput,
            completed: false,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        tasks.unshift(newTask); // Add to beginning of array
        await saveTasks(tasks);
        return newTask;
    } catch (error) {
        console.error('Error adding task:', error);
        return null;
    }
};

/**
 * Update an existing task
 */
export const updateTask = async (
    id: string,
    updates: TaskUpdate
): Promise<Task | null> => {
    try {
        const tasks = await getTasks();
        const taskIndex = tasks.findIndex((task) => task.id === id);
        if (taskIndex === -1) {
            return null;
        }

        tasks[taskIndex] = {
            ...tasks[taskIndex],
            ...updates,
            updatedAt: Date.now(),
        };

        await saveTasks(tasks);
        return tasks[taskIndex];
    } catch (error) {
        console.error('Error updating task:', error);
        return null;
    }
};

/**
 * Delete a task
 */
export const deleteTask = async (id: string): Promise<boolean> => {
    try {
        const tasks = await getTasks();
        const filteredTasks = tasks.filter((task) => task.id !== id);
        await saveTasks(filteredTasks);
        return true;
    } catch (error) {
        console.error('Error deleting task:', error);
        return false;
    }
};

/**
 * Toggle task completion status
 */
export const toggleTaskCompletion = async (id: string): Promise<Task | null> => {
    try {
        const tasks = await getTasks();
        const task = tasks.find((t) => t.id === id);
        if (!task) {
            return null;
        }

        return await updateTask(id, { completed: !task.completed });
    } catch (error) {
        console.error('Error toggling task completion:', error);
        return null;
    }
};
