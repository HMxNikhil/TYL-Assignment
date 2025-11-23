// Type declarations for firebase/auth/react-native module
declare module 'firebase/auth/react-native' {
    import { Persistence } from 'firebase/auth';
    /**
     * Returns a Persistence implementation for React Native using the provided storage.
     * The actual implementation is provided by the firebase package at runtime.
     */
    export function getReactNativePersistence(storage: any): Persistence;
}
