import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as mathjs from 'mathjs';
import CalculatorButton, { ButtonType } from '../components/CalculatorButton';

export default function Calculator() {
    const [expression, setExpression] = useState('');
    const [result, setResult] = useState('0');
    const [isNewCalculation, setIsNewCalculation] = useState(false);

    const handleNumberPress = (num: string) => {
        if (isNewCalculation) {
            setExpression(num);
            setIsNewCalculation(false);
        } else {
            setExpression(expression + num);
        }
    };

    const handleOperatorPress = (operator: string) => {
        setIsNewCalculation(false);
        const lastChar = expression.slice(-1);
        if (['+', '-', '*', '/', '%'].includes(lastChar)) {
            setExpression(expression.slice(0, -1) + operator);
        } else if (expression) {
            setExpression(expression + operator);
        }
    };

    const handleDecimalPress = () => {
        setIsNewCalculation(false);
        const parts = expression.split(/[\+\-\*\/%]/);
        const lastNumber = parts[parts.length - 1];

        if (!lastNumber.includes('.')) {
            setExpression(expression + '.');
        }
    };

    const handleClear = () => {
        setExpression('');
        setResult('0');
        setIsNewCalculation(false);
    };

    const handleDelete = () => {
        setIsNewCalculation(false);
        setExpression(expression.slice(0, -1));
    };

    const handleEquals = () => {
        if (!expression) return;

        try {
            const evaluated = mathjs.evaluate(expression);
            const formattedResult = Number.isInteger(evaluated)
                ? evaluated.toString()
                : evaluated.toFixed(8).replace(/\.?0+$/, '');

            setResult(formattedResult);
            setExpression(formattedResult);
            setIsNewCalculation(true);
        } catch (error) {
            setResult('Error');
            setIsNewCalculation(true);
        }
    };

    const buttons = [
        { value: 'clr', type: 'clear' as ButtonType, onPress: handleClear },
        { value: 'DEL', type: 'delete' as ButtonType, onPress: handleDelete },
        { value: '%', type: 'operator' as ButtonType, onPress: () => handleOperatorPress('%') },
        { value: '/', type: 'operator' as ButtonType, onPress: () => handleOperatorPress('/') },

        { value: '7', type: 'number' as ButtonType, onPress: () => handleNumberPress('7') },
        { value: '8', type: 'number' as ButtonType, onPress: () => handleNumberPress('8') },
        { value: '9', type: 'number' as ButtonType, onPress: () => handleNumberPress('9') },
        { value: '*', type: 'operator' as ButtonType, onPress: () => handleOperatorPress('*') },

        { value: '4', type: 'number' as ButtonType, onPress: () => handleNumberPress('4') },
        { value: '5', type: 'number' as ButtonType, onPress: () => handleNumberPress('5') },
        { value: '6', type: 'number' as ButtonType, onPress: () => handleNumberPress('6') },
        { value: '-', type: 'operator' as ButtonType, onPress: () => handleOperatorPress('-') },

        { value: '1', type: 'number' as ButtonType, onPress: () => handleNumberPress('1') },
        { value: '2', type: 'number' as ButtonType, onPress: () => handleNumberPress('2') },
        { value: '3', type: 'number' as ButtonType, onPress: () => handleNumberPress('3') },
        { value: '+', type: 'operator' as ButtonType, onPress: () => handleOperatorPress('+') },

        { value: '.', type: 'number' as ButtonType, onPress: handleDecimalPress },
        { value: '0', type: 'number' as ButtonType, onPress: () => handleNumberPress('0') },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <LinearGradient
                colors={['#D4C5E2', '#C5B8DB', '#B8A8D4']}
                style={styles.gradient}
            >
                <View style={styles.displayContainer}>
                    <View style={styles.displayCard}>
                        <Text style={styles.resultText} numberOfLines={1}>
                            {expression || result}
                        </Text>
                    </View>
                </View>

                <View style={styles.buttonGrid}>
                    {buttons.map((button, index) => (
                        <CalculatorButton
                            key={`${button.value}-${index}`}
                            value={button.value}
                            type={button.type}
                            onPress={button.onPress}
                        />
                    ))}
                    <View style={styles.equalsButtonContainer}>
                        <CalculatorButton
                            value="="
                            type="equals"
                            onPress={handleEquals}
                        />
                    </View>
                </View>
            </LinearGradient>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D4C5E2',
    },
    gradient: {
        flex: 1,
        paddingTop: 20,
    },
    displayContainer: {
        paddingHorizontal: 24,
        paddingTop: 20,
        paddingBottom: 30,
    },
    displayCard: {
        backgroundColor: '#E8E8F0',
        borderRadius: 30,
        padding: 30,
        minHeight: 120,
        justifyContent: 'center',
        alignItems: 'flex-end',
        shadowColor: '#A3A3C2',
        shadowOffset: {
            width: -8,
            height: -8,
        },
        shadowOpacity: 1,
        shadowRadius: 16,
        elevation: 10,
    },
    resultText: {
        fontSize: 52,
        color: '#6A6A8A',
        fontWeight: '300',
        textAlign: 'right',
    },
    buttonGrid: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: 16,
        paddingBottom: 20,
        alignContent: 'flex-start',
    },
    equalsButtonContainer: {
        width: '46%',
        margin: 4,
        aspectRatio: 2.2,
    },
});
