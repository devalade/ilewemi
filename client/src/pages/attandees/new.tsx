import React from 'react';
import Layout from '@src/layout';
import {
  Box,
  Button,
  Group,
  NumberInput,
  Select,
  Stack,
  Text,
} from '@mantine/core';
import Link from 'next/link';

function New() {
  return (
    <Box sx={{ maxWidth: 500 }} mx='auto'>
      <Text>Payer la scolarité</Text>
      <form action=''>
        <Stack>
          <Select
            label='Classe'
            placeholder='Sélectionnez une classse'
            defaultValue='sixième'
            data={[
              { label: 'Sixième', value: 'sixième' },
              {
                label: 'Cinquième',
                value: 'cinquième',
              },
              {
                label: 'Quatrième',
                value: 'quatrième',
              },
              {
                label: 'Troisième',
                value: 'troisième',
              },
              {
                label: 'Seconde',
                value: 'seconde',
              },
              {
                label: 'première',
                value: 'Première',
              },
              {
                label: 'Terminale',
                value: 'termiale',
              },
            ]}
          />
          <Select
            label='Apprenant'
            placeholder="Sélectionnez l'apprenant"
            data={[
              { label: 'Madjengo Gutemberg', value: '1' },
              {
                label: 'Salifou Diouf',
                value: '2',
              },
              {
                label: 'Jolie Joliette',
                value: '3',
              },
            ]}
          />
          <NumberInput
            label='Montant à payer'
            min={1000}
            max={1000000}
            hideControls
          />
          <Group position='right'>
            <Link href='/attandees'>
              <Button variant='outline' color='dark'>
                Revenir en arrière
              </Button>
            </Link>
            <Button>Confirmer</Button>
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
