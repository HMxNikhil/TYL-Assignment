import { Stack } from 'expo-router';
import { AuthProvider } from '../src/context/AuthContext';

/**
 * Root Layout Component
 * Wraps the entire app with AuthProvider
 */
export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#fff' },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="auth/login" />
        <Stack.Screen name="auth/signup" />
        <Stack.Screen name="auth/password-reset" />
      </Stack>
    </AuthProvider>
  );
}
