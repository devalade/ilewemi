import {
  TextInput,
  PasswordInput,
  Center,
  Button,
  Paper,
  Text,
  Stack,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification } from '@mantine/notifications';
import { ExclamationMark } from 'tabler-icons-react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { useMutation, useQuery } from 'react-query';
import { z } from 'zod';
import { setPassword, verifyEmailToken } from '../lib/handle-api/auth';
import { useMediaQuery } from '@mantine/hooks';
import { UserType, USER_ROLE } from '@src/lib/types/userType';

const loginSchema = z
  .object({
    password: z
      .string({
        required_error: 'you must provide a password',
      })
      .min(8, { message: 'Mot de passe trop court' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password don't match",
    path: ['confirmPassword'], // path of error
  });

function SetPassword() {
  const router = useRouter();
  const { token } = router.query;
  const largeScreen = useMediaQuery('(min-width: 1200px)', false);

  const { data, isFetching, isLoading } = useQuery<{ isValid: boolean }>(
    'token',
    () => verifyEmailToken(token as string)
  );

  console.log(data);

  const form = useForm({
    schema: zodResolver(loginSchema),
    initialValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const mutation = useMutation<
    UserType,
    AxiosError,
    Parameters<typeof setPassword>['0']
  >('setPassword', setPassword, {
    onSuccess: (data) => {
      if (data.role !== USER_ROLE.PARENT) {
        router.push('/login');
      }
    },
    onError: (error: any) => {
      showNotification({
        id: 'login',
        icon: <ExclamationMark size={14} strokeWidth='2' />,
        title: 'Error',
        message: error.response?.data.message,
        color: 'red',
      });
    },
  });

  const handleSubmit = useCallback((data: any) => {
    mutation.mutate(data);
  }, []);

  return (
    <Center
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[8]
            : theme.colors.gray[0],
        width: '100%',
        height: '100vh',
      })}>
      {data?.isValid && (
        <Paper
          shadow='xl'
          radius='md'
          sx={() => ({
            width: largeScreen ? 500 : 350,
            padding: largeScreen ? '5em 3.5em' : '3.5em 2.5em',
          })}
          mx='auto'>
          <Text align='center' color='dark' weight='bold' pb='xs' size='lg'>
            Définissez votre mot de passe
          </Text>
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack spacing='xs'>
              <PasswordInput
                label='Mot de passe'
                {...form.getInputProps('password')}
              />
              <PasswordInput
                label='Confirmer votre mot de passe'
                {...form.getInputProps('confirmPassword')}
              />
              <Button fullWidth type='submit'>
                Soumettre
              </Button>
            </Stack>
          </form>
        </Paper>
      )}
      {data !== undefined && data?.isValid == false && (
        <Text>The link has expired</Text>
      )}
    </Center>
  );
}

export default SetPassword;
