import { Text, TextProps, useColorScheme } from 'react-native';

export type TypographyProps = TextProps;

export function Typography({ style, ...props }: TypographyProps) {
  const colorScheme = useColorScheme();

  return (
    <Text
      style={[{ color: colorScheme === 'light' ? 'black' : 'white' }, style]}
      {...props}
    />
  );
}
