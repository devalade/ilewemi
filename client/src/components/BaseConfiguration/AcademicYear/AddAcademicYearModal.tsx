import { Box, Button, Group, Modal } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification, updateNotification } from '@mantine/notifications';
import { addAcademicYear } from '@src/lib/handle-api/acadmic-year';
import { AcademicYearType } from '@src/lib/types/academicYearType';
import { AxiosError } from 'axios';
import dayjs from 'dayjs';
import React, { useCallback } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Calendar, CircleCheck, ExclamationMark } from 'tabler-icons-react';
import { z } from 'zod';
import 'dayjs/locale/fr';

interface IAddAcademicYearModal {
  opened: boolean;
  onClose: () => void;
}

const academicYearSchema = z.object({
  startDate: z.date({
    required_error: 'Entrez une date',
  }),
  endDate: z.date({
    required_error: 'Entrez une date',
  }),
});

function AddAcademicYearModal(props: IAddAcademicYearModal) {
  const { opened, onClose } = props;
  const queryClient = useQueryClient();

  const form = useForm({
    schema: zodResolver(academicYearSchema),
    initialValues: {
      startDate: '',
      endDate: '',
    },
  });

  const mutation = useMutation<
    AcademicYearType,
    AxiosError,
    Parameters<typeof addAcademicYear>['0']
  >('academicYear', addAcademicYear, {
    onMutate: async () => {
      showNotification({
        id: 'addAcademicYear',
        title: "Ajout d'une nouvelle année academic",
        message: 'Patientez...',
        loading: true,
      });
    },
    onSuccess: async (data: AcademicYearType) => {
      updateNotification({
        id: 'addAcademicYear',
        icon: <CircleCheck size={14} />,
        title: 'Succes',
        message: 'Année académique ajouté avec succes',
        color: 'green',
      });

      await queryClient.cancelQueries('academicYear');

      const previousData =
        queryClient.getQueryData<AcademicYearType[]>('academicYear');
      console.log(
        '🚀 ~ file: AddAcademicYearModal.tsx ~ line 66 ~ onSuccess: ~ previousData',
        previousData
      );

      queryClient.setQueryData<AcademicYearType[]>('academicYear', [
        data,
        ...(previousData as any),
      ]);

      // onClose();
    },
    onError: (error: any) => {
      updateNotification({
        id: 'addAcademicYear',
        icon: <ExclamationMark width='14' height='14' strokeWidth='2' />,
        title: 'Error',
        message: error.response?.data.message,
        color: 'red',
      });
    },
  });

  const handleSubmit = useCallback((data: Partial<AcademicYearType>) => {
    mutation.mutate({ startDate: data.startDate, endDate: data.endDate });
    form.reset();
    onClose();
  }, []);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title='Ajouter un utilisateur'
      overlayBlur={4}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box sx={{ maxWidth: 500 }} mx='auto'>
          <DatePicker
            label='Date Début'
            icon={<Calendar size={16} />}
            locale='fr'
            placeholder='Sélectionnez une date'
            {...form.getInputProps('startDate')}
          />
          <DatePicker
            label='Date fin'
            icon={<Calendar size={16} />}
            locale='fr'
            placeholder='Sélectionnez une date'
            {...form.getInputProps('endDate')}
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

export default AddAcademicYearModal;
