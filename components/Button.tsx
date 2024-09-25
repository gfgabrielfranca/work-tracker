import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Typography } from './Typography';

export function Button({ style, children, ...props }: TouchableOpacityProps) {
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
    >
      <Typography>{children}</Typography>
    </TouchableOpacity>
  );
}
