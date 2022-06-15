import { Box, Button, Group, Modal, NumberInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { addSchoolFees } from '@src/lib/handle-api/school-fees';
import { useCallback } from 'react';
import { useMutation } from 'react-query';

interface IAddSchoolFeesModal {
  opened: boolean;
  onClose: () => void;
}

function AddSchoolFeesModal(props: IAddSchoolFeesModal) {
  const { opened, onClose } = props;

  const form = useForm({
    initialValues: {
      fee: 0,
    },
  });

  const mutation = useMutation('schoolFees', addSchoolFees);
  const handleSubmit = useCallback((data) => {
    console.log(
      '🚀 ~ file: AddSchoolFeesModal.tsx ~ line 24 ~ handleSubmit ~ data',
      data
    );
  }, []);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title='Ajouter un utilisateur'
      overlayBlur={4}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box sx={{ maxWidth: 500 }} mx='auto'>
          <NumberInput
            label='Entrez le prix'
            hideControls
            {...form.getInputProps('fee')}
          />
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
