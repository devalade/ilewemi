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
import ParentTable from '@src/components/User/ParentTable';
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

  const { data: allParentData } = useQuery<UserType[]>(
    ['users', 'parent'],
    () => getAllUser('parent'),
    {
      staleTime: 5 * 60 * 1000,
    }
  );

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
              <UsersTable data={allUserData ? allUserData : []} />
            </Stack>
          </Tabs.Tab>
          <Tabs.Tab label='Parent'>
            <ParentTable data={allParentData ? allParentData : []} />
          </Tabs.Tab>
        </Tabs>
      </Stack>
    </>
  );
}

export default User;

User.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
