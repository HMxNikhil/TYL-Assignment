import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

interface OptionButtonProps {
    option: string;
    isSelected: boolean;
    isCorrect: boolean;
    isAnswered: boolean;
    onPress: () => void;
}

export default function OptionButton({
    option,
    isSelected,
    isCorrect,
    isAnswered,
    onPress,
}: OptionButtonProps) {
    let backgroundColor = '#fff';
    let borderColor = '#E0E0E0';
    let textColor = '#333';

    if (isAnswered) {
        if (isSelected) {
            if (isCorrect) {
                backgroundColor = '#D4EDDA'; // Green background
                borderColor = '#28A745';
                textColor = '#155724';
            } else {
                backgroundColor = '#F8D7DA'; // Red background
                borderColor = '#DC3545';
                textColor = '#721C24';
            }
        } else if (isCorrect) {
            // Show correct answer if wrong one was selected
            backgroundColor = '#D4EDDA';
            borderColor = '#28A745';
            textColor = '#155724';
        }
    }

    return (
        <TouchableOpacity
            style={[styles.container, { backgroundColor, borderColor }]}
            onPress={onPress}
            disabled={isAnswered}
            activeOpacity={0.8}
        >
            <View style={styles.circle}>
                {isSelected && <View style={[styles.innerCircle, { backgroundColor: borderColor }]} />}
            </View>
            <Text style={[styles.text, { color: textColor }]}>{option}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 2,
        marginBottom: 12,
    },
    circle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#ccc',
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 12,
        height: 12,
        borderRadius: 6,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
    },
});
