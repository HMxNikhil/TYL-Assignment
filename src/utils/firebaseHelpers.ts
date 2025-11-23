import { FirebaseError } from 'firebase/app';

/**
 * Error code mappings for user-friendly messages
 */
const ERROR_MESSAGES: Record<string, string> = {
    'auth/invalid-email': 'Invalid email address format.',
    'auth/user-disabled': 'This account has been disabled.',
    'auth/user-not-found': 'No account found with this email.',
    'auth/wrong-password': 'Incorrect password. Please try again.',
    'auth/email-already-in-use': 'An account with this email already exists.',
    'auth/weak-password': 'Password should be at least 6 characters.',
    'auth/operation-not-allowed': 'This operation is not allowed.',
    'auth/invalid-credential': 'Invalid email or password.',
    'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
    'auth/network-request-failed': 'Network error. Please check your connection.',
    'auth/popup-closed-by-user': 'Sign-in cancelled.',
    'auth/cancelled-popup-request': 'Sign-in cancelled.',
    'auth/popup-blocked': 'Popup was blocked by the browser.',
};

/**
 * Get user-friendly error message from Firebase error
 */
export function getFirebaseErrorMessage(error: unknown): string {
    if (error instanceof FirebaseError) {
        return ERROR_MESSAGES[error.code] || error.message;
    }

    if (error instanceof Error) {
        return error.message;
    }

    return 'An unexpected error occurred. Please try again.';
}

/**
 * Validate email format
 */
export function validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Validate password strength
 * Returns error message if invalid, null if valid
 */
export function validatePassword(password: string): string | null {
    if (password.length < 6) {
        return 'Password must be at least 6 characters long.';
    }
    return null;
}

/**
 * Validate form inputs
 */
export interface ValidationResult {
    isValid: boolean;
    errors: {
        email?: string;
        password?: string;
    };
}

export function validateAuthForm(email: string, password: string): ValidationResult {
    const errors: { email?: string; password?: string } = {};

    if (!email) {
        errors.email = 'Email is required.';
    } else if (!validateEmail(email)) {
        errors.email = 'Please enter a valid email address.';
    }

    if (!password) {
        errors.password = 'Password is required.';
    } else {
        const passwordError = validatePassword(password);
        if (passwordError) {
            errors.password = passwordError;
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}
