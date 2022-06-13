import React, { useCallback, useState } from 'react';
import {
  createStyles,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
} from '@mantine/core';
import { Logout, Settings, ChevronDown } from 'tabler-icons-react';
import { useAtom } from 'jotai';
import { userAtom } from '@src/lib/store';
import { setAccessToken } from '@src/lib/tokens';
import { useRouter } from 'next/router';

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor: theme.colors[theme.primaryColor][6],
    borderBottom: `1px solid ${theme.colors[theme.primaryColor][6]}`,
    marginBottom: 120,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  userMenu: {
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  user: {
    color: theme.white,
    padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
    borderRadius: theme.radius.sm,
    transition: 'background-color 100ms ease',

    '&:hover': {
      backgroundColor:
        theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 7 : 5],
    },
  },

  burger: {
    [theme.fn.largerThan('xs')]: {
      display: 'none',
    },
  },

  userActive: {
    backgroundColor:
      theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 7 : 5],
  },

  tabs: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  tabsList: {
    borderBottom: '0 !important',
  },

  tabControl: {
    fontWeight: 500,
    height: 38,
    color: `${theme.white} !important`,

    '&:hover': {
      backgroundColor:
        theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 7 : 5],
    },
  },

  tabControlActive: {
    color: `${
      theme.colorScheme === 'dark' ? theme.white : theme.black
    } !important`,
    borderColor: `${theme.colors[theme.primaryColor][6]} !important`,
  },
}));

function ProfileCard() {
  const { classes, theme, cx } = useStyles();
  const router = useRouter();
  // store
  const [user, setUserAtom] = useAtom(userAtom);

  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const handleLogout = useCallback(() => {
    setUserAtom(null);
    setAccessToken('');
    router.push('/login');
  }, []);
  return (
    <Menu
      size={260}
      placement='end'
      transition='pop-top-right'
      className={classes.userMenu}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      control={
        <UnstyledButton
          className={cx(classes.user, {
            [classes.userActive]: userMenuOpened,
          })}>
          <Group spacing={7}>
            <Avatar
              alt={user?.lastName + ' ' + user?.firstName}
              radius='xl'
              size={20}
            />
            <Text
              weight={500}
              size='sm'
              sx={{ lineHeight: 1, color: theme.white }}
              mr={3}>
              {user?.lastName + ' ' + user?.firstName}
            </Text>
            <ChevronDown size={12} />
          </Group>
        </UnstyledButton>
      }>
      <Menu.Item onClick={handleLogout} icon={<Settings size={14} />}>
        Paramètre
      </Menu.Item>
      <Menu.Item icon={<Logout size={14} />}>Déconnexion</Menu.Item>
    </Menu>
  );
}

export default ProfileCard;
