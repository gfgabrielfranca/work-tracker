import { Portal } from '@gorhom/portal';
import { createContext, useContext, useState } from 'react';
import { Pressable, ViewProps } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';
import { Button, ButtonProps } from './Button';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const ModalContext = createContext<null | {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>(null);

export function Modal({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

function useModal(componentName: string) {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error(`${componentName} must be used within an ${Modal.name}`);
  }

  return context;
}

export function ModalContent({ style, ...props }: ViewProps) {
  const value = useModal(ModalContent.name);

  if (!value.isOpen) return null;

  return (
    <Portal>
      <ModalContext.Provider value={value}>
        <AnimatedPressable
          entering={FadeIn}
          exiting={FadeOut}
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            position: 'absolute',
            height: '100%',
            width: '100%',
          }}
          onPress={() => value.setIsOpen(false)}
        >
          <AnimatedPressable
            entering={SlideInDown}
            exiting={SlideOutDown}
            style={[
              {
                backgroundColor: 'black',
                position: 'absolute',
                paddingVertical: 32,
                width: '100%',
                padding: 24,
                bottom: 0,
              },
              style,
            ]}
            {...props}
          />
        </AnimatedPressable>
      </ModalContext.Provider>
    </Portal>
  );
}

export function ModalButtonOpen({ onPress, ...props }: ButtonProps) {
  const { setIsOpen } = useModal(ModalButtonOpen.name);

  return (
    <Button
      onPress={(event) => {
        setIsOpen(true);
        onPress?.(event);
      }}
      {...props}
    />
  );
}

export function ModalButtonClose({ onPress, ...props }: ButtonProps) {
  const { setIsOpen } = useModal(ModalButtonClose.name);

  return (
    <Button
      onPress={(event) => {
        setIsOpen(false);
        onPress?.(event);
      }}
      {...props}
    />
  );
}
