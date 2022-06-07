import {
  Box,
  Button,
  Center,
  Loader,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import AddUser from '@src/components/User/modal/AddUser';
import { UsersTable } from '@src/components/User/UserTable';
import { getAllUser } from '@src/lib/handle-api/user';
import { UserType } from '@src/lib/types/userType';
import { ReactElement, useState } from 'react';
import { useQuery } from 'react-query';
import Layout from '../../layout';

function User() {
  const [opened, setOpened] = useState<boolean>(false);
  const {
    data: allUserData,
    isLoading,
    error,
  } = useQuery<UserType[]>('users', () => getAllUser('admin,manager'), {
    staleTime: 100000,
  });

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  return (
    <>
      <AddUser opened={opened} onClose={() => setOpened(false)} />
      <Stack spacing='lg'>
        <Title order={2} sx={{ fontWeight: 'bold' }}>
          Gestion des utilisateurs
        </Title>
        <Tabs>
          <Tabs.Tab label="Membre de l'administration">
            <Stack spacing='lg'>
              <Box>
                <Button onClick={() => setOpened(true)} variant='filled'>
                  Ajouter un utilisateur
                </Button>
              </Box>
              <UsersTable data={allUserData} />
            </Stack>
          </Tabs.Tab>
          <Tabs.Tab label='Parent'>Tableau de tout les parents ici</Tabs.Tab>
        </Tabs>
      </Stack>
    </>
  );
}

export default User;

User.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
