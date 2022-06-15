import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Text,
} from '@mantine/core';
import AddEventTypeModal from '@src/components/BaseConfiguration/EventType/AddEventTypeModal';
import Layout from '@src/layout';
import {
  deleteEventType,
  getAllEventType,
} from '@src/lib/handle-api/event-type';
import { useState } from 'react';
import { useMutation, useQuery } from 'react-query';
import { Trash } from 'tabler-icons-react';

function EventType() {
  const [opened, setOpened] = useState<boolean>(false);

  const { data, isLoading, error } = useQuery('eventType', getAllEventType);

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }
  return (
    <>
      <AddEventTypeModal opened={opened} onClose={() => setOpened(false)} />
      <Box sx={{ maxWidth: 600 }} mx='auto'>
        <Button onClick={() => setOpened(true)} variant='outline'>
          Ajouter un type d'évènement
        </Button>
        <SimpleGrid cols={2} mt={20}>
          {data.map(({ id, label }, idx) => (
            <EventTypeCard key={idx} id={id} label={label} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}

function EventTypeCard(props: { id: string; label: string }): JSX.Element {
  const { id, label } = props;
  const mutation = useMutation('eventType', deleteEventType);
  return (
    <Paper withBorder>
      <Group position='apart' p={12}>
        <Text>{label}</Text>
        <ActionIcon
          onClick={() => mutation.mutate(id)}
          color='red'
          variant='hover'>
          <Trash size={16} />
        </ActionIcon>
      </Group>
    </Paper>
  );
}

export default EventType;

EventType.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};
