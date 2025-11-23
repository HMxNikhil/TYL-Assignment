import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function ResultScreen() {
    const { score, total } = useLocalSearchParams<{ score: string; total: string }>();
    const router = useRouter();

    const scoreNum = parseInt(score || '0', 10);
    const totalNum = parseInt(total || '10', 10);
    const percentage = (scoreNum / totalNum) * 100;

    let message = "Keep practicing!";
    let icon = "thumbs-up-outline";
    let color = "#FFC107"; // Yellow

    if (percentage >= 80) {
        message = "Outstanding!";
        icon = "trophy-outline";
        color = "#FFD700"; // Gold
    } else if (percentage >= 50) {
        message = "Good job!";
        icon = "ribbon-outline";
        color = "#4A90E2"; // Blue
    }

    const handleRestart = () => {
        router.dismissAll();
        router.replace('/quiz');
    };

    const handleHome = () => {
        router.dismissAll();
        router.replace('/');
    };

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Ionicons name={icon as any} size={80} color={color} style={styles.icon} />
                <Text style={styles.title}>Quiz Completed!</Text>
                <Text style={styles.scoreText}>
                    You scored <Text style={{ color }}>{score}</Text> / {total}
                </Text>
                <Text style={styles.message}>{message}</Text>
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.restartButton} onPress={handleRestart}>
                    <Ionicons name="refresh" size={24} color="#fff" />
                    <Text style={styles.buttonText}>Play Again</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.homeButton} onPress={handleHome}>
                    <Ionicons name="home-outline" size={24} color="#4A90E2" />
                    <Text style={styles.homeButtonText}>Home</Text>
                </TouchableOpacity>
            </View>
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
    card: {
        backgroundColor: '#fff',
        width: '100%',
        padding: 40,
        borderRadius: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.1,
        shadowRadius: 20,
        elevation: 10,
        marginBottom: 40,
    },
    icon: {
        marginBottom: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    scoreText: {
        fontSize: 24,
        color: '#555',
        marginBottom: 20,
    },
    message: {
        fontSize: 18,
        color: '#888',
        fontStyle: 'italic',
    },
    buttonContainer: {
        width: '100%',
        gap: 16,
    },
    restartButton: {
        backgroundColor: '#4A90E2',
        paddingVertical: 16,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
    homeButton: {
        backgroundColor: '#fff',
        paddingVertical: 16,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#4A90E2',
    },
    homeButtonText: {
        color: '#4A90E2',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});
