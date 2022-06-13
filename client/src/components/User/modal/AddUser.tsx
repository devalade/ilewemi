import React, { useCallback } from 'react';
import { TextInput, Group, Button, Modal, Box, Select } from '@mantine/core';
import { z } from 'zod';
import { useForm, zodResolver } from '@mantine/form';
import { CircleCheck, ExclamationMark, Mail, Phone } from 'tabler-icons-react';
import { UserType, USER_ROLE } from '@src/lib/types/userType';
import { showNotification, updateNotification } from '@mantine/notifications';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { addUser } from '@src/lib/handle-api/user';
import { useRouter } from 'next/router';

const userSchema = z.object({
  firstName: z.string({
    required_error: 'Entrez le prénom',
    invalid_type_error: 'Le prénom doit être une chaine de caractère',
  }),
  lastName: z.string({
    required_error: 'Lastname is required',
    invalid_type_error: 'Name must be a string',
  }),
  email: z
    .string({ required_error: 'Entrez un email' })
    .email({ message: 'Email incorrect' }),
  phoneNumber: z.string(),
  role: z.string({
    required_error: 'Vous deve choisir un role',
    invalid_type_error: 'type de valeur invalide',
  }),
});

interface IAddUser {
  onClose: () => void;
  opened: boolean;
}

function AddUser(props: IAddUser) {
  const router = useRouter();
  // const client = new QueryClient();
  const queryClient = useQueryClient();

  const { opened, onClose } = props;
  const form = useForm({
    schema: zodResolver(userSchema),
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      role: '',
    },
  });

  const mutation = useMutation<
    UserType,
    AxiosError,
    Parameters<typeof addUser>['0']
  >('addUser', addUser, {
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
        id: 'addUser',
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
        <Group spacing='md' noWrap>
          <TextInput
            label='Prénom'
            placeholder='Prénom'
            name='firstName'
            {...form.getInputProps('firstName')}
          />
          <TextInput
            label='Nom'
            placeholder='Nom'
            name='lastName'
            {...form.getInputProps('lastName')}
          />
        </Group>
        <TextInput
          label='Email'
          placeholder='Email'
          name='email'
          icon={<Mail size={18} strokeWidth={1.5} />}
          {...form.getInputProps('email')}
        />
        <TextInput
          label='Numéro de téléphone'
          placeholder='+229 62xxxxxx'
          name='phoneNumber'
          icon={<Phone size={18} strokeWidth={1.5} />}
          {...form.getInputProps('phoneNumber')}
        />
        <Select
          label='Role'
          placeholder='Choisissez un role'
          name='role'
          {...form.getInputProps('role')}
          data={[
            { value: USER_ROLE.ADMIN, label: 'Administrateur' },
            { value: USER_ROLE.MANAGER, label: 'Gestionnaire' },
          ]}
        />

        <Group position='right' mt='md'>
          <Button onClick={onClose} variant='default' color='red'>
            Annuler
          </Button>
          <Button type='submit'>Ajouter</Button>
        </Group>
      </form>
    </Modal>
  );
}

export default AddUser;
