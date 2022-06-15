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
import { useCallback } from 'react';
import { useMutation } from 'react-query';
import { z } from 'zod';
import { loginUser } from '../lib/handle-api/auth';
import { useLocalStorage, useMediaQuery } from '@mantine/hooks';
import { LoginResponse } from '@src/lib/types/authType';
import { useAtom } from 'jotai';
import { userAtom } from '@src/lib/store';
import { UserType } from '@src/lib/types/userType';

const loginSchema = z.object({
  email: z.string().email({ message: 'Email incorrect' }),
  password: z.string({
    required_error: 'you must provide a password',
  }),
});

function Login() {
  const router = useRouter();
  const [, setValue] = useLocalStorage<UserType>({
    key: 'user',
  });
  const [, setAccessToken] = useLocalStorage<string>({
    key: 'accessToken',
  });
  const [, setRefreshToken] = useLocalStorage<string>({
    key: 'refreshToken',
  });
  const [, setUserAtom] = useAtom(userAtom);

  const largeScreen = useMediaQuery('(min-width: 1200px)', false);

  const form = useForm({
    schema: zodResolver(loginSchema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation<
    LoginResponse,
    AxiosError,
    Parameters<typeof loginUser>['0']
  >('login', loginUser, {
    onSuccess: (data: LoginResponse) => {
      setAccessToken(data.tokens.access_token);
      setRefreshToken(data.tokens.refresh_token);
      setValue(data.user);
      setUserAtom(data.user);
      router.push('/user');
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
      <Paper
        shadow='xl'
        radius='md'
        sx={() => ({
          width: largeScreen ? 500 : 350,
          padding: largeScreen ? '5em 3.5em' : '3.5em 2.5em',
        })}
        mx='auto'>
        <Text align='center' color='dark' weight='bold' pb='xs' size='lg'>
          Connexion
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack spacing='xs'>
            <TextInput label='Email' {...form.getInputProps('email')} />
            <PasswordInput
              label='Mot de passe'
              {...form.getInputProps('password')}
            />

            <Button fullWidth type='submit'>
              Connectez-vous
            </Button>
          </Stack>
        </form>
      </Paper>
    </Center>
  );
}

export default Login;
