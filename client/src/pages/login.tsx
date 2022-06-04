import {
  TextInput,
  PasswordInput,
  Checkbox,
  Group,
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
import { loginUser } from '../lib/handle-api';
import { setAccessToken, setRefreshToken } from '../lib/tokens';

const registerSchema = z.object({
  email: z.string().email({ message: 'Email incorrect' }),
  password: z
    .string({
      required_error: 'you must provide a password',
    })
    .nonempty({ message: 'you must provide a password' }),
});

function Login() {
  const router = useRouter();

  const form = useForm({
    schema: zodResolver(registerSchema),
    initialValues: {
      email: '',
      password: '',
    },
  });

  const mutation = useMutation<
    string,
    AxiosError,
    Parameters<typeof loginUser>['0']
  >('login', loginUser, {
    onSuccess: (data: any) => {
      setAccessToken(data.access_token);
      setRefreshToken(data.refresh_token);
      router.push('/');
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
        sx={{ width: 350, padding: '2.5em' }}
        mx='auto'>
        <Text align='center' color='dark' weight='bold' pb='xs' size='lg'>
          Login
        </Text>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack spacing='xs'>
            <TextInput label='Email' {...form.getInputProps('email')} />
            <PasswordInput
              label='Password'
              {...form.getInputProps('password')}
            />

            <Button fullWidth type='submit'>
              Submit
            </Button>
          </Stack>
        </form>
      </Paper>
    </Center>
  );
}

export default Login;
