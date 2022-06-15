import { Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { showNotification, updateNotification } from '@mantine/notifications';
import { addEventType } from '@src/lib/handle-api/event-type';
import React, { useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { CircleCheck, ExclamationMark } from 'tabler-icons-react';
import { z } from 'zod';

interface IAddEventTypeModal {
  opened: boolean;
  onClose: () => void;
}

const eventTypeSchema = z.object({
  label: z
    .string({
      required_error: 'Entrez une valeur',
    })
    .min(1, {
      message: 'Entrez une valeur',
    }),
});

function AddEventTypeModal(props: IAddEventTypeModal) {
  const queryClient = useQueryClient();
  const { opened, onClose } = props;

  const mutation = useMutation('eventType', addEventType, {
    onMutate: async () => {
      showNotification({
        id: 'addEventType',
        title: 'En cours ...',
        message: 'Patientez...',
        loading: true,
      });
    },
    onSuccess: async (data) => {
      updateNotification({
        id: 'addEventType',
        icon: <CircleCheck size={14} />,
        title: 'Success',
        message: "Type d'évènement ajouté avec success",
        color: 'green',
      });

      console.log(data);
      await queryClient.cancelQueries('eventType');

      const previousData = queryClient.getQueryData('eventType');

      queryClient.setQueryData('eventType', [...(previousData as any), data]);
    },
    onError: (error: any) => {
      updateNotification({
        id: 'addEventType',
        icon: <ExclamationMark width='14' height='14' strokeWidth='2' />,
        title: 'Error',
        message: error.response?.data.message,
        color: 'red',
      });
      onClose();
    },
  });

  const form = useForm({
    schema: zodResolver(eventTypeSchema),
    initialValues: {
      label: '',
    },
  });

  const handleSubmit = useCallback((data) => {
    mutation.mutate(data);
    onClose();
  }, []);
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Ajouter un type d'évènement">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack>
          <TextInput
            label='Type dévènement'
            placeholder='Ex: Fête patronale'
            {...form.getInputProps('label')}
          />
          <Group>
            <Button onClick={onClose} color='dark' variant='outline'>
              Annuler
            </Button>
            <Button type='submit'>Enregistrer</Button>
          </Group>
        </Stack>
      </form>
    </Modal>
  );
}

export default AddEventTypeModal;
