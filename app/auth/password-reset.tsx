import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/hooks/useAuth';
import {
    InputField,
    PrimaryButton,
    TextLink,
} from '../../src/components/AuthForm';
import { getFirebaseErrorMessage, validateEmail } from '../../src/utils/firebaseHelpers';

/**
 * Password Reset Screen
 * Allows users to request a password reset email
 */
export default function PasswordResetScreen() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [emailError, setEmailError] = useState<string | undefined>(undefined);

    const { resetPassword } = useAuth();
    const router = useRouter();

    /**
     * Handle password reset request
     */
    const handleResetPassword = async () => {
        // Validate email
        if (!email) {
            setEmailError('Email is required.');
            return;
        } else if (!validateEmail(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        setEmailError(undefined);
        setLoading(true);

        try {
            await resetPassword(email);
            Alert.alert(
                'Check your email',
                'We have sent you a password reset link. Please check your email inbox.',
                [
                    {
                        text: 'Back to Login',
                        onPress: () => router.back(),
                    },
                ]
            );
        } catch (error) {
            const message = getFirebaseErrorMessage(error);
            Alert.alert('Request Failed', message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.header}>
                    <Text style={styles.title}>Reset Password</Text>
                    <Text style={styles.subtitle}>
                        Enter your email address and we'll send you a link to reset your password.
                    </Text>
                </View>

                <View style={styles.form}>
                    <InputField
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        error={emailError}
                    />

                    <PrimaryButton
                        title="Send Reset Link"
                        onPress={handleResetPassword}
                        loading={loading}
                        disabled={loading}
                    />

                    <TextLink
                        text="Remember your password?"
                        linkText="Back to Login"
                        onPress={() => router.back()}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
        padding: 24,
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
        lineHeight: 24,
    },
    form: {
        flex: 1,
    },
});
