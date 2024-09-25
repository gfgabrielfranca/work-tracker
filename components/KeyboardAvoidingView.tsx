import { useState, useEffect } from 'react';
import { ViewProps, Keyboard, Platform, View } from 'react-native';

export function KeyboardAvoidingView({ style, ...props }: ViewProps) {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showSubscription = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      (event) => setKeyboardHeight(event.endCoordinates.height),
    );
    const hideSubscription = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => setKeyboardHeight(0),
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return <View style={[{ paddingBottom: keyboardHeight }, style]} {...props} />;
}
