import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export const EmptyState: React.FC = () => {
    const scaleAnim = useRef(new Animated.Value(0)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                tension: 50,
                friction: 7,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 600,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            <Animated.View
                style={[
                    styles.iconContainer,
                    {
                        transform: [{ scale: scaleAnim }],
                        opacity: fadeAnim,
                    },
                ]}
            >
                <LinearGradient
                    colors={['#667eea', '#764ba2']}
                    style={styles.iconGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                >
                    <Ionicons name="checkbox-outline" size={60} color="#FFFFFF" />
                </LinearGradient>
            </Animated.View>

            <Animated.View style={{ opacity: fadeAnim }}>
                <Text variant="headlineSmall" style={styles.title}>
                    No Tasks Yet
                </Text>
                <Text variant="bodyLarge" style={styles.subtitle}>
                    Tap the + button below to create
                </Text>
                <Text variant="bodyLarge" style={styles.subtitle}>
                    your first task and get started!
                </Text>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    iconContainer: {
        marginBottom: 24,
    },
    iconGradient: {
        width: 120,
        height: 120,
        borderRadius: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#667eea',
        shadowOffset: {
            width: 0,
            height: 8,
        },
        shadowOpacity: 0.3,
        shadowRadius: 16,
        elevation: 8,
    },
    title: {
        marginTop: 8,
        fontWeight: '700',
        color: '#1A1A2E',
        textAlign: 'center',
        letterSpacing: 0.5,
    },
    subtitle: {
        marginTop: 8,
        color: '#6B7280',
        textAlign: 'center',
        lineHeight: 24,
    },
});
