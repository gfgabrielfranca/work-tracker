import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export function Button({ style, ...props }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      style={[{ padding: 8 }, style]}
      activeOpacity={0.7}
      {...props}
    />
  );
}
