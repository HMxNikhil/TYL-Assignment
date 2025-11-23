import React from 'react';
import { View, StyleSheet, SafeAreaView, TouchableOpacity, Text } from 'react-native';
import { useQuiz } from '../../src/hooks/useQuiz';
import QuestionCard from '../../src/components/QuestionCard';
import OptionButton from '../../src/components/OptionButton';
import { Ionicons } from '@expo/vector-icons';

export default function QuizScreen() {
    const {
        currentQuestion,
        currentQuestionIndex,
        totalQuestions,
        selectedOption,
        isAnswered,
        handleOptionSelect,
        nextQuestion,
    } = useQuiz();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <QuestionCard
                    question={currentQuestion.question}
                    questionNumber={currentQuestionIndex + 1}
                    totalQuestions={totalQuestions}
                />

                <View style={styles.optionsContainer}>
                    {currentQuestion.options.map((option) => (
                        <OptionButton
                            key={option}
                            option={option}
                            isSelected={selectedOption === option}
                            isCorrect={option === currentQuestion.answer}
                            isAnswered={isAnswered}
                            onPress={() => handleOptionSelect(option)}
                        />
                    ))}
                </View>

                {isAnswered && (
                    <TouchableOpacity style={styles.nextButton} onPress={nextQuestion}>
                        <Text style={styles.nextButtonText}>
                            {currentQuestionIndex === totalQuestions - 1 ? 'Finish' : 'Next Question'}
                        </Text>
                        <Ionicons name="arrow-forward" size={20} color="#fff" />
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F7FA',
    },
    content: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    optionsContainer: {
        marginTop: 20,
    },
    nextButton: {
        backgroundColor: '#4A90E2',
        padding: 16,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
        shadowColor: '#4A90E2',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 8,
    },
});
