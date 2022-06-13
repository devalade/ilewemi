import { Box, Button, Group, Modal } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import React from 'react';

interface IAddAcademicYearModal {
  opened: boolean;
  onClose: () => void;
}

function AddAcademicYearModal(props: IAddAcademicYearModal) {
  const { opened, onClose } = props;
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title='Ajouter un utilisateur'
      overlayBlur={4}>
      <form action=''>
        <Box sx={{ maxWidth: 500 }} mx='auto'>
          <DatePicker label='Date Début' placeholder='Sélectionnez une date' />
          <DatePicker label='Date fin' placeholder='Sélectionnez une date' />
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

export default AddAcademicYearModal;
