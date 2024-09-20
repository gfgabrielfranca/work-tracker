import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

export function Button({ style, ...props }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          justifyContent: 'center',
          paddingHorizontal: 16,
          alignItems: 'center',
          paddingVertical: 8,
          borderRadius: 4,
        },
        style,
      ]}
      activeOpacity={0.7}
      {...props}
    />
  );
}
