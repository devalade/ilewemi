import React, { useCallback } from 'react';
import { Group, Button, Modal, Select, NumberInput } from '@mantine/core';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { CircleCheck, ExclamationMark, Mail, Phone } from 'tabler-icons-react';
import { UserType } from '@src/lib/types/userType';
import { showNotification, updateNotification } from '@mantine/notifications';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { addUser } from '@src/lib/handle-api/user';
import { useRouter } from 'next/router';
import { useAtomValue } from 'jotai';
import { selectedStudent } from '@src/lib/store';
import { AddMark } from '@src/lib/handle-api/student';

const userSchema = z.object({
  mark: z.number({
    invalid_type_error: 'Entrez une valeur correcte',
  }),
  subject: z.string({ required_error: 'Vous devez choisir une matière' }),
});

interface IAddNoteModal {
  onClose: () => void;
  opened: boolean;
}

function AddNoteModal(props: IAddNoteModal) {
  const selectedStudentId = useAtomValue(selectedStudent);
  const router = useRouter();
  // const client = new QueryClient();
  const queryClient = useQueryClient();

  const { opened, onClose } = props;
  const form = useForm({
    schema: zodResolver(userSchema),
    initialValues: {
      mark: 0,
      subject: '',
    },
  });

  const mutation = useMutation<
    UserType,
    AxiosError,
    Parameters<typeof addUser>['0']
  >('addMark', AddMark, {
    onMutate: async () => {
      showNotification({
        id: 'addUser',
        title: 'Création de compte',
        message: 'Patientez...',
        loading: true,
      });
    },
    onSuccess: async (data) => {
      updateNotification({
        id: 'addUser',
        icon: <CircleCheck size={14} />,
        title: 'Success',
        message: 'Utilisateur ajouté avec success',
        color: 'green',
      });
      await queryClient.cancelQueries('user');

      const previousData = queryClient.getQueryData<UserType[]>('users');

      queryClient.setQueryData<UserType[]>('users', [
        data,
        ...(previousData as any),
      ]);

      onClose();
    },
    onError: (error: any) => {
      updateNotification({
        id: 'addMark',
        icon: <ExclamationMark width='14' height='14' strokeWidth='2' />,
        title: 'Error',
        message: error.response?.data.message,
        color: 'red',
      });
      onClose();
    },
  });

  const handleSubmit = useCallback((data: any) => {
    mutation.mutate(data);
  }, []);

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title='Ajouter une note'
      overlayBlur={4}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Select
          label='Matière'
          placeholder='Choisissez une matière'
          name='subject'
          {...form.getInputProps('subject')}
          data={[
            { value: 'maths', label: 'Mathématique' },
            { value: 'pct', label: 'PCT' },
            { value: 'svt', label: 'SVT' },
            { value: 'français', label: 'Français' },
          ]}
        />
        <NumberInput
          label='Note'
          hideControls
          defaultValue={0}
          min={0}
          max={20}
          parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
          formatter={(value: any) =>
            !Number.isNaN(parseFloat(value))
              ? ` ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              : ' '
          }
          {...form.getInputProps('mark')}
        />

        <Group position='right' mt='md'>
          <Button onClick={onClose} variant='default' color='red'>
            Annuler
          </Button>
          <Button type='submit'>Enregister</Button>
        </Group>
      </form>
    </Modal>
  );
}

export default AddNoteModal;
