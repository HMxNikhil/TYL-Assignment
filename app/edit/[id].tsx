import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { TextInput, Button, HelperText, ActivityIndicator, Text } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { getTasks, updateTask } from '../../utils/storage';
import { Task } from '../../types/Task';

export default function EditTaskScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id: string }>();
    const [task, setTask] = useState<Task | null>(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [titleError, setTitleError] = useState('');

    useEffect(() => {
        loadTask();
    }, [id]);

    const loadTask = async () => {
        const tasks = await getTasks();
        const foundTask = tasks.find((t) => t.id === id);

        if (foundTask) {
            setTask(foundTask);
            setTitle(foundTask.title);
            setDescription(foundTask.description || '');
        } else {
            Alert.alert('Error', 'Task not found');
            router.back();
        }

        setLoading(false);
    };

    const validateForm = (): boolean => {
        if (title.trim().length === 0) {
            setTitleError('Title is required');
            return false;
        }
        setTitleError('');
        return true;
    };

    const handleSave = async () => {
        if (!validateForm() || !task) {
            return;
        }

        setSaving(true);
        const updatedTask = await updateTask(task.id, {
            title: title.trim(),
            description: description.trim() || undefined,
        });

        if (updatedTask) {
            router.back();
        } else {
            Alert.alert('Error', 'Failed to update task. Please try again.');
        }
        setSaving(false);
    };

    const handleCancel = () => {
        router.back();
    };

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    style={styles.gradientContainer}
                >
                    <ActivityIndicator size="large" color="#FFFFFF" />
                </LinearGradient>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={100}
        >
            <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.headerGradient}
            />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.contentContainer}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.form}>
                    <View style={styles.header}>
                        <Text variant="headlineSmall" style={styles.headerText}>
                            Edit Your Task
                        </Text>
                        <Text variant="bodyMedium" style={styles.subheaderText}>
                            Update the title or description
                        </Text>
                    </View>

                    <TextInput
                        label="Task Title *"
                        value={title}
                        onChangeText={(text) => {
                            setTitle(text);
                            if (titleError) setTitleError('');
                        }}
                        mode="outlined"
                        style={styles.input}
                        error={!!titleError}
                        autoFocus
                        maxLength={100}
                        outlineColor="#E5E7EB"
                        activeOutlineColor="#667eea"
                        left={<TextInput.Icon icon="format-title" />}
                    />
                    <HelperText type="error" visible={!!titleError}>
                        {titleError}
                    </HelperText>

                    <TextInput
                        label="Description (optional)"
                        value={description}
                        onChangeText={setDescription}
                        mode="outlined"
                        style={[styles.input, styles.textArea]}
                        multiline
                        numberOfLines={6}
                        maxLength={500}
                        outlineColor="#E5E7EB"
                        activeOutlineColor="#667eea"
                        left={<TextInput.Icon icon="text" />}
                    />

                    <View style={styles.buttonContainer}>
                        <Button
                            mode="outlined"
                            onPress={handleCancel}
                            style={styles.cancelButton}
                            disabled={saving}
                            textColor="#667eea"
                        >
                            Cancel
                        </Button>
                        <Button
                            mode="contained"
                            onPress={handleSave}
                            style={styles.saveButton}
                            loading={saving}
                            disabled={saving}
                            buttonColor="#667eea"
                            icon="check"
                        >
                            Update Task
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    centerContainer: {
        flex: 1,
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
        height: 150,
        opacity: 0.1,
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        flexGrow: 1,
    },
    form: {
        padding: 20,
    },
    header: {
        marginBottom: 24,
        marginTop: 8,
    },
    headerText: {
        fontWeight: '700',
        color: '#1A1A2E',
        marginBottom: 8,
    },
    subheaderText: {
        color: '#6B7280',
    },
    input: {
        marginBottom: 8,
        backgroundColor: '#FFFFFF',
    },
    textArea: {
        marginTop: 8,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 32,
        gap: 12,
    },
    cancelButton: {
        flex: 1,
        borderColor: '#667eea',
        borderWidth: 1.5,
    },
    saveButton: {
        flex: 1,
        elevation: 2,
    },
});
