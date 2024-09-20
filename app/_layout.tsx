import { PortalProvider } from '@gorhom/portal';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <PortalProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          statusBarTranslucent: true,
          contentStyle: {
            backgroundColor: colorScheme === 'light' ? 'white' : 'black',
          },
        }}
      >
        <Stack.Screen name="index" />
      </Stack>
    </PortalProvider>
  );
}
