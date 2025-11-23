import { useEffect } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { useAuth } from '../src/hooks/useAuth';
import { LoadingScreen } from '../src/components/LoadingScreen';

/**
 * Index/Root Screen
 * Handles automatic navigation based on auth state
 * - If user is logged in → redirect to /home
 * - If user is logged out → redirect to /auth/login
 */
export default function Index() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        if (loading) return;

        const inAuthGroup = segments[0] === 'auth';

        if (user && inAuthGroup) {
            // User is signed in but viewing auth pages → redirect to home
            router.replace('/home');
        } else if (!user && !inAuthGroup) {
            // User is signed out but not on auth pages → redirect to login
            router.replace('/auth/login');
        }
    }, [user, loading, segments]);

    // Show loading screen while checking auth state
    if (loading) {
        return <LoadingScreen />;
    }

    // Show loading while redirecting
    return <LoadingScreen />;
}
