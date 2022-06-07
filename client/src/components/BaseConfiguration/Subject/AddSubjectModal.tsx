import React, { useCallback } from 'react';
import {
  TextInput,
  Group,
  Button,
  Modal,
  Box,
  Select,
  Switch,
  ActionIcon,
  Text,
} from '@mantine/core';
import { randomId } from '@mantine/hooks';
import { Trash } from 'tabler-icons-react';
import { z } from 'zod';
import { useForm, zodResolver, formList } from '@mantine/form';
import { CircleCheck, ExclamationMark, Mail, Phone } from 'tabler-icons-react';
import { UserType, USER_ROLE } from '@src/lib/types/userType';
import { showNotification, updateNotification } from '@mantine/notifications';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { addUser } from '@src/lib/handle-api/user';
import { useRouter } from 'next/router';
import { SubjectType } from '@src/lib/types/subjectType';
import { addManySubject } from '@src/lib/handle-api/subject';

const subjectsSchema = z.object({
  subjects: z.array(
    z.object({
      name: z
        .string({
          required_error: 'Entrez une valeur',
        })
        .min(2, { message: 'Too short' }),
    })
  ),
});

interface IAddUser {
  onClose: () => void;
  opened: boolean;
}

function AddSubjectModal(props: IAddUser) {
  const router = useRouter();
  // const client = new QueryClient();
  const queryClient = useQueryClient();

  const { opened, onClose } = props;
  const form = useForm({
    schema: zodResolver(subjectsSchema),
    initialValues: {
      subjects: formList([{ name: '' }]),
    },
  });

  const fields = form.values.subjects.map((item, index) => (
    <Group key={index} mt='xs'>
      <TextInput
        placeholder='Ex:  Mathématique'
        required
        sx={{ flex: 1 }}
        {...form.getListInputProps('subjects', index, 'name')}
      />
      <ActionIcon
        color='red'
        variant='hover'
        onClick={() => form.removeListItem('subjects', index)}>
        <Trash size={16} />
      </ActionIcon>
    </Group>
  ));

  const mutation = useMutation<
    SubjectType[],
    AxiosError,
    Parameters<typeof addManySubject>['0']
  >('subjects', addManySubject, {
    onMutate: async () => {
      showNotification({
        id: 'addSubject',
        title: 'Ajour des matières',
        message: 'Patientez...',
        loading: true,
      });
    },
    onSuccess: async (data) => {
      updateNotification({
        id: 'addSubject',
        icon: <CircleCheck size={14} />,
        title: 'Success',
        message: 'Les matières ont été ajouté avec success',
        color: 'green',
      });
      // await queryClient.cancelQueries('subjects');

      const previousData = queryClient.getQueryData<SubjectType[]>('subjects');

      queryClient.setQueryData<SubjectType[]>('subjects', [
        ...data,
        ...(previousData as any),
      ]);

      onClose();
    },
    onError: (error: any) => {
      updateNotification({
        id: 'addSubject',
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
      title='Ajouter un utilisateur'
      overlayBlur={4}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Box sx={{ maxWidth: 500 }} mx='auto'>
          {fields.length > 0 ? (
            <Group mb='xs'>
              <Text weight={500} size='sm' sx={{ flex: 1 }}>
                Matière
              </Text>
            </Group>
          ) : (
            <Text color='dimmed' align='center'>
              Aucun champ...
            </Text>
          )}

          {fields}

          <Group position='left' mt='md'>
            <Button
              onClick={() =>
                form.addListItem('subjects', {
                  name: '',
                })
              }>
              Ajouter
            </Button>
          </Group>
        </Box>

        <Group position='right' mt='md'>
          <Button onClick={onClose} variant='default' color='red'>
            Annuler
          </Button>
          <Button type='submit'>Enregistrer</Button>
        </Group>
      </form>
    </Modal>
  );
}

export default AddSubjectModal;
