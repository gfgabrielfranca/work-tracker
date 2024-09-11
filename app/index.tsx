import { Text, useColorScheme, View } from 'react-native';

export default function Index() {
  const colorScheme = useColorScheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ color: colorScheme === 'light' ? 'black' : 'white' }}>
        Hello World
      </Text>
    </View>
  );
}
