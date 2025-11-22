import React, { useRef } from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    Animated,
} from 'react-native';
import * as Haptics from 'expo-haptics';

export type ButtonType = 'number' | 'operator' | 'equals' | 'clear' | 'delete';

interface CalculatorButtonProps {
    value: string;
    onPress: () => void;
    type?: ButtonType;
}

export default function CalculatorButton({
    value,
    onPress,
    type = 'number',
}: CalculatorButtonProps) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePressIn = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Animated.spring(scaleAnim, {
            toValue: 0.95,
            useNativeDriver: true,
            tension: 100,
            friction: 3,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            tension: 100,
            friction: 3,
        }).start();
    };

    const isEquals = type === 'equals';
    const buttonStyle = isEquals ? styles.equalsButton : styles.normalButton;

    return (
        <Animated.View
            style={[
                styles.buttonContainer,
                { transform: [{ scale: scaleAnim }] },
            ]}
        >
            <TouchableOpacity
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                activeOpacity={0.7}
                style={[styles.touchable, buttonStyle]}
            >
                <Text style={[styles.buttonText, isEquals && styles.equalsText]}>
                    {value}
                </Text>
            </TouchableOpacity>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '22%',
        margin: 4,
        aspectRatio: 1,
    },
    touchable: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35,
    },
    normalButton: {
        backgroundColor: '#E8E8F0',
        shadowColor: '#A3A3C2',
        shadowOffset: {
            width: -6,
            height: -6,
        },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 8,
    },
    equalsButton: {
        backgroundColor: '#E5B3D1',
        shadowColor: '#D19BC0',
        shadowOffset: {
            width: -6,
            height: -6,
        },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 8,
    },
    buttonText: {
        fontSize: 26,
        fontWeight: '400',
        color: '#4A4A6A',
    },
    equalsText: {
        color: '#6B4A5A',
        fontWeight: '500',
    },
});
