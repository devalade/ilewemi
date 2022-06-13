import { Box, Button, Group, Modal, NumberInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';

interface IAddSchoolFeesModal {
  opened: boolean;
  onClose: () => void;
}

function AddSchoolFeesModal(props: IAddSchoolFeesModal) {
  const { opened, onClose } = props;
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title='Ajouter un utilisateur'
      overlayBlur={4}>
      <form action=''>
        <Box sx={{ maxWidth: 500 }} mx='auto'>
          <NumberInput label='Entrez le prix' hideControls />
          <Group position='right' mt='md'>
            <Button onClick={onClose} variant='default' color='red'>
              Annuler
            </Button>
            <Button type='submit'>Enregistrer</Button>
          </Group>
        </Box>
      </form>
    </Modal>
  );
}

export default AddSchoolFeesModal;
