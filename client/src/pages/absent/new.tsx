import React from 'react';
import Layout from '@src/layout';
import { Box, Button, Group, Select, Stack, Text } from '@mantine/core';
import { DatePicker, TimeInput, TimeRangeInput } from '@mantine/dates';
import dayjs from 'dayjs';
import { Clock, Timeline } from 'tabler-icons-react';
import Link from 'next/link';

function New() {
  return (
    <Box sx={{ maxWidth: 600 }} mx='auto'>
      <Text component='h2'>Signaler une absence</Text>
      <form action=''>
        <Stack>
          <Select
            label='Sélectionnez une classe'
            placeholder='Sélectionnez une classe'
            defaultValue='seconde'
            data={[
              { label: 'Seconde', value: 'seconde' },
              { label: 'Premiere', value: 'premiere' },
              { label: 'Terminale', value: 'terminale' },
            ]}
          />
          <Select
            label='Sélectionnez des étudiants'
            placeholder='Sélectionnez des étudiants'
            defaultValue='asdsd343'
            data={[
              { label: 'Madjengo Gutemberg', value: 'adae3sdasd' },
              { label: 'John Doe', value: 'asdsd343' },
              { label: 'Joli Joliette', value: 'asdessdsada' },
            ]}
          />
          <DatePicker
            label='Séectionnez une date'
            placeholder='Sélectionnez une date'
            defaultValue={new Date()}
          />
          <Group sx={{ width: '100%' }} noWrap>
            <TimeInput
              icon={<Clock size={16} />}
              sx={{ width: '100%' }}
              label='Début'
            />
            <TimeInput
              icon={<Clock size={16} />}
              sx={{ width: '100%' }}
              label='Fin'
            />
          </Group>
          <Group position='right'>
            <Link href='/absent'>
              <Button component='a' variant='outline' color='dark'>
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
