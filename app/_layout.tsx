import { PortalProvider } from '@gorhom/portal';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { openDatabaseSync, SQLiteProvider } from 'expo-sqlite';
import { drizzle } from 'drizzle-orm/expo-sqlite';
import { useMigrations } from 'drizzle-orm/expo-sqlite/migrator';
import migrations from '@/drizzle/migrations';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const DATABASE_NAME = 'database.db';
const database = drizzle(openDatabaseSync(DATABASE_NAME));
const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { success, error } = useMigrations(database, migrations);

  if (error || !success) return;

  return (
    <SQLiteProvider databaseName={DATABASE_NAME}>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </SQLiteProvider>
  );
}
