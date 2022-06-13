import { Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import React from 'react';

interface IAddEventTypeModal {
  opened: boolean;
  onClose: () => void;
}

function AddEventTypeModal(props: IAddEventTypeModal) {
  const { opened, onClose } = props;
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Ajouter un type d'évènement">
      <form action=''>
        <Stack>
          <TextInput label='Type dévènement' placeholder='Ex: Fête patronale' />
          <Group>
            <Button onClick={onClose} color='dark' variant='outline'>
              Annuler
            </Button>
            <Button>Enregistrer</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

export default AddEventTypeModal;
