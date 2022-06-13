import React from 'react';
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  ActionIcon,
  Anchor,
  ScrollArea,
  useMantineTheme,
} from '@mantine/core';
import { Pencil, Trash } from 'tabler-icons-react';
import { UserType } from '@src/lib/types/userType';
import { useMutation, useQueryClient } from 'react-query';
import { deleteUser } from '@src/lib/handle-api/user';

interface UsersTableProps {
  data: UserType[];
}

const jobColors = {
  admin: 'blue',
  manager: 'cyan',
  parent: 'pink',
};

function ParentTable({ data }: UsersTableProps) {
  const queryClient = useQueryClient();
  const deleteUserMutation = useMutation((id: string) => deleteUser(id), {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
    },
  });
  const theme = useMantineTheme();
  const rows = data.map((item, idx) => (
    <tr key={item.id}>
      <td>
        <Group spacing='sm'>
          <Avatar size={30} radius={30}>
            {item.firstName + ' ' + item.lastName}{' '}
          </Avatar>
          <Text size='sm' weight={500}>
            {item.firstName + ' ' + item.lastName}
          </Text>
        </Group>
      </td>

      <td>
        <Badge
          color={jobColors[item.role.toLowerCase()]}
          variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}>
          {item.role}
        </Badge>
      </td>
      <td>
        <Anchor<'a'>
          size='sm'
          href='#'
          onClick={(event) => event.preventDefault()}>
          {item.email}
        </Anchor>
      </td>
      <td>
        <Text size='sm' color='gray'>
          {item.phoneNumber}
        </Text>
      </td>
      <td>
        <Group spacing={0} position='right'>
          <ActionIcon>
            <Pencil size={16} />
          </ActionIcon>
          {/* <ActionIcon
            onClick={() => deleteUserMutation.mutate(item.id)}
            color='red'>
            <Trash size={16} />
          </ActionIcon> */}
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing='sm'>
        <thead>
          <tr>
            <th>Nom et Prénom</th>
            <th>Nombre d'enfant</th>
            <th>Email</th>
            <th>Téléphone</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default ParentTable;
