import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    RefreshControl,
    Platform,
    LayoutAnimation,
    UIManager,
    Animated,
} from 'react-native';
import { FAB, ActivityIndicator, Portal, Dialog, Button, Text } from 'react-native-paper';
import { useRouter, useFocusEffect } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Task } from '../types/Task';
import { getTasks, deleteTask, toggleTaskCompletion } from '../utils/storage';
import { TaskCard } from '../components/TaskCard';
import { EmptyState } from '../components/EmptyState';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HomeScreen() {
    const router = useRouter();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);
    const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
    const fadeAnim = useCallback(() => new Animated.Value(0), []);
    const [listOpacity] = useState(fadeAnim);

    const loadTasks = useCallback(async () => {
        const loadedTasks = await getTasks();
        setTasks(loadedTasks);
        setLoading(false);

        // Fade in animation
        Animated.timing(listOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, [listOpacity]);

    useEffect(() => {
        loadTasks();
    }, [loadTasks]);

    // Reload tasks when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            loadTasks();
        }, [loadTasks])
    );

    const handleRefresh = async () => {
        setRefreshing(true);
        await loadTasks();
        setRefreshing(false);
    };

    const handleToggleComplete = async (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        await toggleTaskCompletion(id);
        await loadTasks();
    };

    const handleEdit = (id: string) => {
        router.push(`/edit/${id}`);
    };

    const handleDelete = (id: string) => {
        setTaskToDelete(id);
        setDeleteDialogVisible(true);
    };

    const confirmDelete = async () => {
        if (taskToDelete) {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
            await deleteTask(taskToDelete);
            await loadTasks();
        }
        setDeleteDialogVisible(false);
        setTaskToDelete(null);
    };

    const cancelDelete = () => {
        setDeleteDialogVisible(false);
        setTaskToDelete(null);
    };

    const handleAddTask = () => {
        router.push('/add');
    };

    if (loading) {
        return (
            <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.gradientContainer}
            >
                <ActivityIndicator size="large" color="#FFFFFF" />
            </LinearGradient>
        );
    }

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.headerGradient}
            />

            <Animated.View style={[styles.listWrapper, { opacity: listOpacity }]}>
                <FlatList
                    data={tasks}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item, index }) => (
                        <Animated.View
                            style={{
                                opacity: listOpacity,
                                transform: [
                                    {
                                        translateY: listOpacity.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [50, 0],
                                        }),
                                    },
                                ],
                            }}
                        >
                            <TaskCard
                                task={item}
                                onToggleComplete={handleToggleComplete}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                index={index}
                            />
                        </Animated.View>
                    )}
                    contentContainerStyle={
                        tasks.length === 0 ? styles.emptyContainer : styles.listContainer
                    }
                    ListEmptyComponent={<EmptyState />}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            colors={['#667eea', '#764ba2']}
                            tintColor="#667eea"
                        />
                    }
                />
            </Animated.View>

            <FAB
                icon="plus"
                style={styles.fab}
                color="#FFFFFF"
                onPress={handleAddTask}
                rippleColor="rgba(255, 255, 255, 0.3)"
            />

            <Portal>
                <Dialog visible={deleteDialogVisible} onDismiss={cancelDelete}>
                    <Dialog.Title>Delete Task</Dialog.Title>
                    <Dialog.Content>
                        <Text variant="bodyMedium">
                            Are you sure you want to delete this task? This action cannot be undone.
                        </Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={cancelDelete}>Cancel</Button>
                        <Button onPress={confirmDelete} textColor="#D32F2F">
                            Delete
                        </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    gradientContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 200,
        opacity: 0.15,
    },
    listWrapper: {
        flex: 1,
    },
    listContainer: {
        paddingVertical: 16,
        paddingBottom: 100,
    },
    emptyContainer: {
        flexGrow: 1,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#667eea',
        elevation: 8,
        shadowColor: '#667eea',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.4,
        shadowRadius: 8,
    },
});
