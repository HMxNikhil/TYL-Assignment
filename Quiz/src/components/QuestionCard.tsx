import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface QuestionCardProps {
    question: string;
    questionNumber: number;
    totalQuestions: number;
}

export default function QuestionCard({ question, questionNumber, totalQuestions }: QuestionCardProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.counter}>
                Question {questionNumber} / {totalQuestions}
            </Text>
            <Text style={styles.questionText}>{question}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 5,
        alignItems: 'center',
    },
    counter: {
        fontSize: 14,
        color: '#888',
        fontWeight: '600',
        marginBottom: 12,
        textTransform: 'uppercase',
        letterSpacing: 1,
    },
    questionText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        lineHeight: 30,
    },
});
