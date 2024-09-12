import { createContext, useContext, useState } from 'react';
import { Pressable, ViewProps } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  SlideInDown,
  SlideOutDown,
} from 'react-native-reanimated';

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

export function ModalChange({
  render,
}: {
  render(
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>,
  ): React.ReactNode;
}) {
  const { setIsOpen } = useModal(ModalChange.name);
  return render(setIsOpen);
}

export function ModalContent({ style, ...props }: ViewProps) {
  const { isOpen, setIsOpen } = useModal(ModalContent.name);

  if (!isOpen) return null;

  return (
    <AnimatedPressable
      entering={FadeIn}
      exiting={FadeOut}
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        position: 'absolute',
        height: '100%',
        width: '100%',
      }}
      onPress={() => setIsOpen(false)}
    >
      <Animated.View
        entering={SlideInDown}
        exiting={SlideOutDown}
        style={[
          {
            backgroundColor: 'black',
            position: 'absolute',
            width: '100%',
            bottom: 0,
          },
          style,
        ]}
        {...props}
      />
    </AnimatedPressable>
  );
}
