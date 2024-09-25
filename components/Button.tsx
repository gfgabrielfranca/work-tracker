import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Typography } from './Typography';

export type ButtonProps = TouchableOpacityProps;

export function Button({ style, children, ...props }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[
        {
          backgroundColor: 'rgba(255, 255, 255, 0.15)',
          justifyContent: 'center',
          paddingHorizontal: 16,
          alignItems: 'center',
          paddingVertical: 10,
          borderRadius: 4,
        },
        props.disabled && { opacity: 0.3 },
        style,
      ]}
      activeOpacity={0.7}
      {...props}
    >
      <Typography>{children}</Typography>
    </TouchableOpacity>
  );
}
