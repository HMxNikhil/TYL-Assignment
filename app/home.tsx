import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/hooks/useAuth';
import { getFirebaseErrorMessage } from '../src/utils/firebaseHelpers';

/**
 * Home Screen (Protected)
 * Displays user information and sign out button
 */
export default function HomeScreen() {
    const { user, signOut } = useAuth();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut();
            router.replace('/auth/login');
        } catch (error) {
            const message = getFirebaseErrorMessage(error);
            Alert.alert('Error', message);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>Welcome! 👋</Text>
                    <Text style={styles.subtitle}>You're successfully logged in</Text>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Account Information</Text>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Email:</Text>
                        <Text style={styles.infoValue}>{user?.email || 'N/A'}</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>User ID:</Text>
                        <Text style={styles.infoValue} numberOfLines={1}>
                            {user?.uid || 'N/A'}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Email Verified:</Text>
                        <Text style={styles.infoValue}>
                            {user?.emailVerified ? '✅ Yes' : '❌ No'}
                        </Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Provider:</Text>
                        <Text style={styles.infoValue}>
                            {user?.providerData[0]?.providerId === 'google.com' ? 'Google' : 'Email/Password'}
                        </Text>
                    </View>

                    {user?.displayName && (
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Display Name:</Text>
                            <Text style={styles.infoValue}>{user.displayName}</Text>
                        </View>
                    )}

                    {user?.photoURL && (
                        <View style={styles.infoRow}>
                            <Text style={styles.infoLabel}>Photo URL:</Text>
                            <Text style={styles.infoValue} numberOfLines={1}>
                                {user.photoURL}
                            </Text>
                        </View>
                    )}
                </View>

                <TouchableOpacity style={styles.signOutButton} onPress={handleSignOut} activeOpacity={0.8}>
                    <Text style={styles.signOutButtonText}>Sign Out</Text>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>
                        This is a protected route. You can only access this page when authenticated.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
    },
    header: {
        marginBottom: 32,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 20,
        marginBottom: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    infoLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#666',
        width: 120,
    },
    infoValue: {
        flex: 1,
        fontSize: 14,
        color: '#333',
    },
    signOutButton: {
        height: 50,
        backgroundColor: '#ef4444',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    signOutButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        marginTop: 16,
        padding: 16,
        backgroundColor: '#e3f2fd',
        borderRadius: 8,
    },
    footerText: {
        fontSize: 14,
        color: '#1976d2',
        textAlign: 'center',
        lineHeight: 20,
    },
});
