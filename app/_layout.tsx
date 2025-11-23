import { Stack } from 'expo-router';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Custom theme with beautiful gradient-inspired color palette
const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#667eea',
    primaryContainer: '#E0E7FF',
    secondary: '#764ba2',
    secondaryContainer: '#FAF5FF',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    error: '#FF6B6B',
    onPrimary: '#FFFFFF',
    onSecondary: '#FFFFFF',
    onBackground: '#1A1A2E',
    onSurface: '#1A1A2E',
  },
  roundness: 16,
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider theme={theme}>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#667eea',
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
              fontWeight: '700',
              fontSize: 20,
            },
            headerShadowVisible: true,
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen
            name="index"
            options={{
              title: '✓ My Tasks',
              headerStyle: {
                backgroundColor: '#667eea',
              },
            }}
          />
          <Stack.Screen
            name="add"
            options={{
              title: 'Create New Task',
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen
            name="edit/[id]"
            options={{
              title: 'Edit Task',
              presentation: 'modal',
              animation: 'slide_from_bottom',
            }}
          />
        </Stack>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
