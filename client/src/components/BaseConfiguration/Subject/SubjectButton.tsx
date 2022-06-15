import React from 'react';
import { ActionIcon, Group, Paper, Text, useMantineTheme } from '@mantine/core';
import { CircleCheck, ExclamationMark, Trash } from 'tabler-icons-react';
import { useMutation } from 'react-query';
import { deleteOneSubject } from '@src/lib/handle-api/subject';
import { showNotification, updateNotification } from '@mantine/notifications';

export function SubjectButton(props: { id: string; name: string }) {
  const { id, name } = props;
  const mutation = useMutation(['subject', id], deleteOneSubject, {
    onMutate: () => {
      showNotification({
        id: 'deleteSubject',
        title: 'Suppression en cours',
        message: `${name}`,
        loading: true,
      });
    },
    onSuccess: () => {
      updateNotification({
        id: 'deleteSubject',
        icon: <CircleCheck size={14} />,
        title: 'Succes',
        message: `${name} supprimé avec succès...`,
        color: 'green',
      });
    },
    onError: (error: any) => {
      updateNotification({
        id: 'deleteSubject',
        icon: <ExclamationMark size={14} strokeWidth='2' />,
        title: 'Succes',
        message: error.response?.data.message,
        color: 'red',
      });
    },
  });

  const theme = useMantineTheme();
  return (
    <Paper withBorder p={10}>
      <Group position='apart'>
        <Text>{name}</Text>
        <ActionIcon
          onClick={() => mutation.mutate(id)}
          variant='hover'
          color='red'>
          <Trash size={16} />
        </ActionIcon>
      </Group>
    </Paper>
  );
}

export default SubjectButton;
