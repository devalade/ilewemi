import { ReactElement, useState } from 'react';
import Layout from '@src/layout';
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Center,
  createStyles,
  Group,
  Loader,
  Menu,
  SimpleGrid,
  Text,
  useMantineTheme,
} from '@mantine/core';
import {
  DotsVertical,
  Messages,
  Pencil,
  Plus,
  Trash,
} from 'tabler-icons-react';
import AddClassModal from '@src/components/BaseConfiguration/Class/AddClassModal';
import { useQuery } from 'react-query';
import { getAllClass } from '@src/lib/handle-api/class';

const useStyles = createStyles((theme) => ({
  card: {
    width: '100%',
    aspectRatio: '3/2',
    border: '1px solid #C4C4C4',
    borderRadius: theme.radius.md,

    backgroundColor: theme.colors.gray[1],
  },
  header: {
    position: 'relative',
    width: '100%',
    height: '32%',
    borderStartStartRadius: theme.radius.md,
    borderTopRightRadius: theme.radius.md,
    backgroundColor: theme.colors.blue[9],
  },
  avatar: {
    position: 'absolute',
    bottom: '-50%',
    right: 10,
    '-webkit-box-shadow': '-4px 1px 11px 2px rgba(0,0,0,0.1)',
    'box-shadow': '-4px 1px 11px 2px rgba(0,0,0,0.1)',
  },
  title: {
    padding: 10,
    fontSize: '1.1rem',
    fontWeight: 500,
    color: theme.colors.red[1],
  },
}));

function Classes() {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState<boolean>(false);

  const { data, isLoading, isError } = useQuery('classes', getAllClass);

  if (isLoading && data == undefined) {
    <Center
      sx={() => ({
        height: '100%',
      })}>
      <Loader />
    </Center>;
  }

  return (
    <>
      <AddClassModal opened={opened} onClose={() => setOpened(false)} />
      <Box
        sx={() => ({
          width: '100%',
          height: '100%',
        })}>
        <Button
          onClick={() => setOpened(true)}
          mb={15}
          leftIcon={<Plus size={16} strokeWidth={2} />}
          variant='outline'>
          Ajouter une classe
        </Button>
        <SimpleGrid
          sx={() => ({
            width: '100%',
          })}
          cols={4}>
          {data?.map(({ name, group }) => (
            <Box className={classes.card}>
              <Box className={classes.header}>
                <Avatar
                  className={classes.avatar}
                  size={60}
                  radius={100}
                  color='blue'>
                  {name[0]}
                </Avatar>
                <Group position='apart'>
                  <Text className={classes.title}>{name}</Text>
                  <Menu
                    transition='pop'
                    withArrow
                    placement='start'
                    position='right'
                    control={
                      <ActionIcon
                        sx={() => ({
                          ':hover': {
                            backgroundColor: 'transparent',
                          },
                        })}>
                        <DotsVertical size={16} color='#FFF' />
                      </ActionIcon>
                    }>
                    <Menu.Item icon={<Pencil size={16} />}>Modifier</Menu.Item>
                    <Menu.Item icon={<Trash size={16} />} color='red'>
                      Supprimer
                    </Menu.Item>
                  </Menu>
                </Group>
              </Box>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}

export default Classes;

Classes.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
