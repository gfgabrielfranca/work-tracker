import { Button } from '@/components/Button';
import { Modal, ModalChange, ModalContent } from '@/components/Modal';
import { Typography } from '@/components/Typography';
import { View } from 'react-native';

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Modal>
        <ModalChange
          render={(setIsModalOpen) => (
            <Button onPress={() => setIsModalOpen(true)}>
              <Typography>Open Modal</Typography>
            </Button>
          )}
        />
        <ModalContent style={{ padding: 32 }}>
          <ModalChange
            render={(setIsModalOpen) => (
              <Button onPress={() => setIsModalOpen(false)}>
                <Typography>Close Modal</Typography>
              </Button>
            )}
          />
        </ModalContent>
      </Modal>
    </View>
  );
}
