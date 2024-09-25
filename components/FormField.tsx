import { View, ViewProps } from 'react-native';
import { Typography, TypographyProps } from './Typography';

export function FormField({ style, ...props }: ViewProps) {
  return <View style={[{ gap: 4 }, style]} {...props} />;
}

export function FormFieldLabel({ style, ...props }: TypographyProps) {
  return <Typography style={[{ fontWeight: 700 }, style]} {...props} />;
}
