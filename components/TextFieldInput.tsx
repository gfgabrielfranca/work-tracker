import { useState } from 'react';
import { TextInput, TextInputProps } from 'react-native';

const DEFAULT_OPACITY = 0.3;

export function TextFieldInput({
  onFocus,
  onBlur,
  style,
  ...props
}: TextInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <TextInput
      placeholderTextColor={`rgba(255, 255, 255, ${DEFAULT_OPACITY})`}
      onFocus={(event) => {
        setIsFocused(true);
        onFocus?.(event);
      }}
      onBlur={(event) => {
        setIsFocused(false);
        onBlur?.(event);
      }}
      style={[
        {
          borderColor: `rgba(255, 255, 255, ${isFocused ? 1 : DEFAULT_OPACITY})`,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 4,
          borderWidth: 1,
          color: 'white',
        },
        style,
      ]}
      cursorColor="white"
      {...props}
    />
  );
}
