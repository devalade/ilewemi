import React from 'react';
import Layout from '@src/layout';
import {
  Box,
  Button,
  Group,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import Link from 'next/link';

function New() {
  return (
    <Box sx={{ maxWidth: '30em' }} mx='auto'>
      <Text component='h2'>Ajouter un évènement</Text>
      <form action=''>
        <Stack>
          <TextInput
            label="Titre de l'évenement"
            placeholder='Ex: Fête patronale'
          />
          <Select
            label="Type d'évènement"
            placeholder="Sélectionnez un type d'évènement"
            data={[
              {
                label: 'Fête patronale',
                value: '1',
              },
            ]}
          />
          <DatePicker label="Date d'évenement" />
          <Textarea
            label="Description de l'évènement"
            placeholder='Votre description ici...'
            cols={3}
          />
          <Group position='right'>
            <Link href='/event'>
              <Button component='a' color='dark' variant='outline'>
                Revenir en arrière
              </Button>
            </Link>
            <Button variant='filled'>Enregistrer</Button>
          </Group>
        </Stack>
      </form>
    </Box>
  );
}

export default New;

New.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};
