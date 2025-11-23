import { useState } from 'react';
import { questions } from '../data/questions';
import { useRouter } from 'expo-router';

export const useQuiz = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const router = useRouter();

    const currentQuestion = questions[currentQuestionIndex];
    const totalQuestions = questions.length;
    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

    const handleOptionSelect = (option: string) => {
        if (isAnswered) return;

        setSelectedOption(option);
        setIsAnswered(true);

        if (option === currentQuestion.answer) {
            setScore((prev) => prev + 1);
        }
    };

    const nextQuestion = () => {
        if (isLastQuestion) {
            router.replace({ pathname: '/quiz/result', params: { score, total: totalQuestions } });
        } else {
            setCurrentQuestionIndex((prev) => prev + 1);
            setSelectedOption(null);
            setIsAnswered(false);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setSelectedOption(null);
        setIsAnswered(false);
        router.replace('/quiz');
    };

    return {
        currentQuestion,
        currentQuestionIndex,
        totalQuestions,
        score,
        selectedOption,
        isAnswered,
        handleOptionSelect,
        nextQuestion,
        restartQuiz,
    };
};
