import React, { useCallback } from 'react';
import {
  TextInput,
  Group,
  Button,
  Modal,
  Box,
  Select,
  MultiSelect,
  Stack,
} from '@mantine/core';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { CircleCheck, ExclamationMark, Mail, Phone } from 'tabler-icons-react';
import { UserType, USER_ROLE } from '@src/lib/types/userType';
import { showNotification, updateNotification } from '@mantine/notifications';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { ClassType } from '@src/lib/types/classType';
import { addClass } from '@src/lib/handle-api/class';
import { getAllSubject } from '@src/lib/handle-api/subject';
import { SubjectType } from '@src/lib/types/subjectType';

const userSchema = z.object({
  name: z.string({
    required_error: 'Entrez une valeur',
    invalid_type_error: 'Invalid type',
  }),
  group: z.string(),
  subjects: z
    .array(z.string())
    .min(2, { message: 'Vous devez sélectionnez plus de deux matières' }),
});

interface IAddClassModal {
  onClose: () => void;
  opened: boolean;
}

function AddClassModal(props: IAddClassModal) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { opened, onClose } = props;

  const {
    data: allSubject,
    isLoading,
    isError,
  } = useQuery<SubjectType[]>('subjects', getAllSubject);

  const form = useForm({
    schema: zodResolver(userSchema),
    initialValues: {
      name: '',
      group: '',
      subjects: [],
    },
  });

  const mutation = useMutation<
    ClassType,
    AxiosError,
    Parameters<typeof addClass>['0']
  >('classes', addClass, {
    onMutate: async () => {
      showNotification({
        id: 'addClass',
        title: "Ajout d'une nouvelle classe",
        message: 'Patientez...',
        loading: true,
      });
    },
    onSuccess: async (data) => {
      updateNotification({
        id: 'addClass',
        icon: <CircleCheck size={14} />,
        title: 'Success',
        message: 'Utilisateur ajouté avec success',
        color: 'green',
      });
      await queryClient.cancelQueries('classes');

      const previousData = queryClient.getQueryData<ClassType[]>('classes');

      queryClient.setQueryData<ClassType[]>('classes', [
        ...(previousData as any),
        data,
      ]);

      onClose();
    },
    onError: (error: any) => {
      updateNotification({
        id: 'addClass',
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
      title='Ajouter une classe'
      overlayBlur={4}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <Group spacing='md' noWrap>
            <TextInput
              label='Nom de la classe'
              placeholder='Ex: 2nd'
              name='name'
              {...form.getInputProps('name')}
            />
            <TextInput
              label='Groupe'
              placeholder='Ex: B'
              name='group'
              {...form.getInputProps('group')}
            />
          </Group>
          <Select
            label='Frais de scolarité'
            placeholder='Sélectionnez les frais de scolarité'
            data={[
              { label: '120.000F CFA', value: '120000' },
              {
                label: '145.000F CFA',
                value: '145.000',
              },
            ]}
          />
          <MultiSelect
            label='Matières'
            placeholder='Sélectionnez les matières'
            name='subjects'
            data={
              allSubject !== undefined
                ? allSubject?.map(({ id, name }) => ({
                    value: id,
                    label: name,
                  }))
                : []
            }
            {...form.getInputProps('subjects')}
          />

          <Group position='right' mt='md'>
            <Button onClick={onClose} variant='default' color='red'>
              Annuler
            </Button>
            <Button type='submit'>Ajouter</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

export default AddClassModal;
