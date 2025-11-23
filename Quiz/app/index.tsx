import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function StartScreen() {
    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <Ionicons name="school-outline" size={80} color="#4A90E2" />
            </View>
            <Text style={styles.title}>Quiz App</Text>
            <Text style={styles.subtitle}>Test your knowledge!</Text>

            <Link href="/quiz" asChild>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Start Quiz</Text>
                    <Ionicons name="arrow-forward" size={24} color="#fff" style={styles.buttonIcon} />
                </TouchableOpacity>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#F5F7FA',
    },
    iconContainer: {
        width: 160,
        height: 160,
        borderRadius: 80,
        backgroundColor: '#E1F0FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.2,
        shadowRadius: 20,
        elevation: 10,
    },
    title: {
        fontSize: 42,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
        marginBottom: 60,
    },
    button: {
        backgroundColor: '#4A90E2',
        paddingVertical: 16,
        paddingHorizontal: 40,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 10,
    },
    buttonIcon: {
        marginLeft: 5,
    },
});
