import { Box, Button, Stack, Tabs, Text, Title } from '@mantine/core';
import { ReactElement } from 'react';
import Layout from '../../layout';

function User() {
  // Same can be applied to Aside component with Aside.Section component
  return (
    <Stack spacing='lg'>
      <Title order={2} sx={{ fontWeight: 'bold' }}>
        Gestion des utilisateurs
      </Title>
      <Tabs>
        <Tabs.Tab label="Membre de l'administration">
          Tableau de tout les membres de l'administration{' '}
        </Tabs.Tab>
        <Tabs.Tab label='Parent'>Tableau de tout les parents ici</Tabs.Tab>
      </Tabs>
    </Stack>
  );
}

export default User;

User.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
