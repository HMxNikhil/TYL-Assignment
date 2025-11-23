import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, Pressable } from 'react-native';
import { Card, Checkbox, IconButton, Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { Task } from '../types/Task';

interface TaskCardProps {
    task: Task;
    onToggleComplete: (id: string) => void;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    index: number;
}

export const TaskCard: React.FC<TaskCardProps> = ({
    task,
    onToggleComplete,
    onEdit,
    onDelete,
    index,
}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;
    const slideAnim = useRef(new Animated.Value(0)).current;
    const checkboxAnim = useRef(new Animated.Value(task.completed ? 1 : 0)).current;

    useEffect(() => {
        // Entrance animation with stagger
        Animated.spring(slideAnim, {
            toValue: 1,
            delay: index * 50,
            tension: 50,
            friction: 7,
            useNativeDriver: true,
        }).start();
    }, []);

    useEffect(() => {
        // Animate checkbox state change
        Animated.spring(checkboxAnim, {
            toValue: task.completed ? 1 : 0,
            tension: 80,
            friction: 6,
            useNativeDriver: false,
        }).start();
    }, [task.completed]);

    const handleToggle = () => {
        // Bounce animation
        Animated.sequence([
            Animated.timing(scaleAnim, {
                toValue: 0.95,
                duration: 100,
                useNativeDriver: true,
            }),
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 100,
                friction: 3,
                useNativeDriver: true,
            }),
        ]).start();

        onToggleComplete(task.id);
    };

    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.98,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            tension: 100,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    const cardBackgroundColor = checkboxAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['#FFFFFF', '#F0F4FF'],
    });

    return (
        <Animated.View
            style={[
                {
                    transform: [
                        { scale: scaleAnim },
                        {
                            translateX: slideAnim.interpolate({
                                inputRange: [0, 1],
                                outputRange: [-50, 0],
                            }),
                        },
                    ],
                    opacity: slideAnim,
                },
            ]}
        >
            <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
                <Card style={styles.card} mode="elevated" elevation={3}>
                    {task.completed && (
                        <LinearGradient
                            colors={['rgba(102, 126, 234, 0.1)', 'rgba(118, 75, 162, 0.1)']}
                            style={styles.completedGradient}
                        />
                    )}

                    <View style={styles.cardContent}>
                        <View style={styles.checkboxContainer}>
                            <View style={styles.checkboxWrapper}>
                                <Checkbox
                                    status={task.completed ? 'checked' : 'unchecked'}
                                    onPress={handleToggle}
                                    color="#667eea"
                                />
                            </View>
                        </View>

                        <View style={styles.textContainer}>
                            <Text
                                variant="titleMedium"
                                style={[
                                    styles.title,
                                    task.completed && styles.completedText,
                                ]}
                            >
                                {task.title}
                            </Text>
                            {task.description ? (
                                <Text
                                    variant="bodyMedium"
                                    style={[
                                        styles.description,
                                        task.completed && styles.completedText,
                                    ]}
                                    numberOfLines={2}
                                >
                                    {task.description}
                                </Text>
                            ) : null}
                            <View style={styles.timestampContainer}>
                                <Text variant="bodySmall" style={styles.timestamp}>
                                    {new Date(task.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                    })}
                                </Text>
                            </View>
                        </View>

                        <View style={styles.actionsContainer}>
                            <View style={styles.iconButton}>
                                <IconButton
                                    icon="pencil"
                                    size={22}
                                    onPress={() => onEdit(task.id)}
                                    iconColor="#667eea"
                                    style={styles.editButton}
                                />
                            </View>
                            <View style={styles.iconButton}>
                                <IconButton
                                    icon="delete"
                                    size={22}
                                    onPress={() => onDelete(task.id)}
                                    iconColor="#FF6B6B"
                                    style={styles.deleteButton}
                                />
                            </View>
                        </View>
                    </View>
                </Card>
            </Pressable>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    card: {
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        overflow: 'hidden',
        borderLeftWidth: 4,
        borderLeftColor: '#667eea',
    },
    completedGradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    checkboxContainer: {
        marginRight: 12,
    },
    checkboxWrapper: {
        backgroundColor: 'rgba(102, 126, 234, 0.08)',
        borderRadius: 12,
        padding: 4,
    },
    textContainer: {
        flex: 1,
        marginRight: 8,
    },
    title: {
        fontWeight: '700',
        color: '#1A1A2E',
        fontSize: 16,
        letterSpacing: 0.2,
    },
    description: {
        marginTop: 6,
        color: '#6B7280',
        lineHeight: 20,
    },
    completedText: {
        textDecorationLine: 'line-through',
        opacity: 0.5,
    },
    timestampContainer: {
        marginTop: 8,
    },
    timestamp: {
        color: '#9CA3AF',
        fontSize: 11,
        fontWeight: '500',
    },
    actionsContainer: {
        flexDirection: 'row',
        gap: 4,
    },
    iconButton: {
        borderRadius: 12,
        overflow: 'hidden',
    },
    editButton: {
        margin: 0,
    },
    deleteButton: {
        margin: 0,
    },
});
