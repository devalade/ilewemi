import {
  ActionIcon,
  Box,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Text,
} from '@mantine/core';
import AddEventTypeModal from '@src/components/BaseConfiguration/EventType/AddEventTypeModal';
import Layout from '@src/layout';
import { useState } from 'react';
import { Trash } from 'tabler-icons-react';

function EventType() {
  const [opened, setOpened] = useState<boolean>(false);
  return (
    <>
      <AddEventTypeModal opened={opened} onClose={() => setOpened(false)} />
      <Box sx={{ maxWidth: 600 }} mx='auto'>
        <Button onClick={() => setOpened(true)} variant='outline'>
          Ajouter un type d'évènement
        </Button>
        <SimpleGrid cols={2} mt={20}>
          {[1, 2, 3, 4].map((v, idx) => (
            <Paper key={idx} withBorder>
              <Group position='apart' p={12}>
                <Text>Fête patronale</Text>
                <ActionIcon color='red' variant='hover'>
                  <Trash size={16} />
                </ActionIcon>
              </Group>
            </Paper>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}

export default EventType;

EventType.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};
