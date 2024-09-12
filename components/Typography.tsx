import { Text, TextProps, useColorScheme } from 'react-native';

export function Typography({ style, ...props }: TextProps) {
  const colorScheme = useColorScheme();

  return (
    <Text
      style={[{ color: colorScheme === 'light' ? 'black' : 'white' }, style]}
      {...props}
    />
  );
}
