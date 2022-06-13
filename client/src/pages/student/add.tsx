import React, { ReactNode, useCallback, useState } from 'react';
import Layout from '@src/layout';
import {
  ActionIcon,
  Box,
  Button,
  Code,
  createStyles,
  Divider,
  Group,
  PasswordInput,
  SimpleGrid,
  Stack,
  Stepper,
  Switch,
  Text,
  TextInput,
} from '@mantine/core';

import {
  CircleCheck,
  ExclamationMark,
  Mail,
  Phone,
  Plus,
  Trash,
} from 'tabler-icons-react';
import { formList, useForm } from '@mantine/form';
import { relative } from 'node:path/win32';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addStudent } from '@src/lib/handle-api/student';
import { showNotification, updateNotification } from '@mantine/notifications';
import { StudentType } from '@src/lib/types/studentType';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  wrapper: {
    fontFamily: 'Poppins',
    maxWidth: 700,
    marginInline: 'auto',
    marginTop: 30,
  },
  tutorFieldWrapper: {
    position: 'relative',
    border: '2px',
    borderStyle: 'solid',
    borderColor: theme.colors.gray[3],
    padding: 15,
    borderRadius: theme.radius.sm,
  },
  deleteButton: {
    position: 'absolute',
    top: -12,
    right: 10,
    backgroundColor: theme.colors.red[1],
  },
  fieldName: {
    fontSize: theme.fontSizes.md,
    fontWeight: 600,
    color: theme.colors.gray[6],
  },
}));

function AddStudentPage() {
  const router = useRouter();
  const { classes, cx } = useStyles();
  const [active, setActive] = useState(0);
  const queryClient = useQueryClient();

  const nextStep = useCallback(
    () => setActive((current) => (current < 3 ? current + 1 : current)),
    []
  );
  const prevStep = useCallback(
    () => setActive((current) => (current > 0 ? current - 1 : current)),
    []
  );

  const form = useForm({
    initialValues: {
      studentCode: '',
      firstName: '',
      lastName: '',
      tutors: formList([
        { firstName: '', lastName: '', email: '', phoneNumber: '' },
      ]),
    },
  });

  const fields = form.values.tutors.map((item, index) => (
    <Box key={index} className={classes.tutorFieldWrapper} mt='md'>
      {/* <Group spacing='md' noWrap> */}
      <SimpleGrid cols={2}>
        <TextInput
          label='Prénom'
          placeholder='Prénom'
          name='firstName'
          {...form.getListInputProps('tutors', index, 'firstName')}
        />
        <TextInput
          label='Nom'
          placeholder='Nom'
          name='lastName'
          {...form.getListInputProps('tutors', index, 'lastName')}
        />
        {/* </Group> */}
        <TextInput
          label='Email'
          placeholder='Email'
          name='email'
          icon={<Mail size={18} strokeWidth={1.5} />}
          {...form.getListInputProps('tutors', index, 'email')}
        />
        <TextInput
          label='Numéro de téléphone'
          placeholder='+229 62xxxxxx'
          name='phoneNumber'
          icon={<Phone size={18} strokeWidth={1.5} />}
          {...form.getListInputProps('tutors', index, 'phoneNumber')}
        />
      </SimpleGrid>
      <ActionIcon
        className={classes.deleteButton}
        color='red'
        variant='light'
        onClick={() => form.removeListItem('tutors', index)}>
        <Trash size={16} />
      </ActionIcon>
    </Box>
  ));

  const mutation = useMutation<
    StudentType,
    AxiosError,
    Parameters<typeof addStudent>['0']
  >('students', addStudent, {
    onMutate: async () => {
      showNotification({
        id: 'addStudent',
        title: 'Création de compte',
        message: 'Patientez...',
        loading: true,
      });
    },
    onSuccess: async (data) => {
      updateNotification({
        id: 'addStudent',
        icon: <CircleCheck size={14} />,
        title: 'Success',
        message: 'Apprenant ajouté avec success',
        color: 'green',
      });
      await queryClient.cancelQueries('students');

      const previousData = queryClient.getQueryData<StudentType[]>('students');

      queryClient.setQueryData<StudentType[]>('students', [
        data,
        ...(previousData as any),
      ]);
      router.push('/student');
    },
    onError: (error: any) => {
      updateNotification({
        id: 'addStudent',
        icon: <ExclamationMark width='14' height='14' strokeWidth='2' />,
        title: 'Error',
        message: error.response?.data.message,
        color: 'red',
      });
    },
  });

  const handleSubmit = useCallback((data) => {
    console.log(data);
    mutation.mutate(data);
  }, []);

  return (
    <Box className={classes.wrapper}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stepper active={active} onStepClick={setActive} breakpoint='sm'>
          <Stepper.Step
            label='Première étape'
            description='Ajouter un apprenant'
            allowStepSelect={active > 0}>
            <TextInput
              label='Matricule'
              placeholder='Ex: 4970-D'
              name='studentCode'
              {...form.getInputProps('studentCode')}
            />
            <TextInput
              label='Nom de famille'
              placeholder='Ex: Madjengo'
              name='lastName'
              {...form.getInputProps('lastName')}
            />
            <TextInput
              label='Prénom'
              placeholder='Ex: Gutemberg'
              name='firstName'
              {...form.getInputProps('firstName')}
            />
          </Stepper.Step>
          <Stepper.Step
            label='Deuxième étape'
            description='Ajouter les tuteur'
            allowStepSelect={active > 1}>
            <Box mx='auto'>
              {fields}

              <Group position='center' mt='md'>
                <Button
                  onClick={() =>
                    form.addListItem('tutors', {
                      firstName: '',
                      lastName: '',
                      email: '',
                      phoneNumber: '',
                    })
                  }>
                  Ajouter un autre tuteur
                </Button>
              </Group>
            </Box>
          </Stepper.Step>

          <Stepper.Completed>
            {StudentInformation(form.values)}
          </Stepper.Completed>
        </Stepper>

        <Group position='center' mt='xl'>
          <Button variant='default' onClick={prevStep}>
            Revenir en arrière
          </Button>
          <Button type={active > 1 ? 'submit' : 'button'} onClick={nextStep}>
            {active > 1 ? 'Enregistrer' : 'Suivant'}
          </Button>
        </Group>
      </form>
    </Box>
  );

  function StudentInformation(values) {
    return (
      <Stack>
        <Box>
          <Text component='h2'>Apprenant</Text>
          <Group>
            <Text className={classes.fieldName}>Matricule: </Text>
            <Text>{values.studentCode}</Text>
          </Group>
          <Group>
            <Text className={classes.fieldName}>Nom: </Text>
            <Text>{values.lastName}</Text>
          </Group>
          <Group>
            <Text className={classes.fieldName}>Prénom: </Text>
            <Text>{values.firstName}</Text>
          </Group>
        </Box>
        <Box>
          <Text component='h2'>Tuteur(s)</Text>
          {values.tutors.map(({ firstName, lastName, email, phoneNumber }) => (
            <>
              <Divider my='sm' variant='dashed' />

              <Group>
                <Text className={classes.fieldName}>Nom: </Text>
                <Text>{lastName}</Text>
              </Group>
              <Group>
                <Text className={classes.fieldName}>Prénom: </Text>
                <Text>{lastName}</Text>
              </Group>
              <Group>
                <Text className={classes.fieldName}>Email: </Text>
                <Text>{email}</Text>
              </Group>
              <Group>
                <Text className={classes.fieldName}>Numéro de téléphone: </Text>
                <Text>{phoneNumber}</Text>
              </Group>
            </>
          ))}
        </Box>
      </Stack>
    );
  }
}

export default AddStudentPage;

AddStudentPage.getLayout = function (page: ReactNode) {
  return <Layout>{page}</Layout>;
};
