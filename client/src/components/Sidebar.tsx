import React, { ReactNode, useState } from 'react';
import { createStyles, Navbar, Group, Code, Text } from '@mantine/core';
import {
  BellRinging,
  Fingerprint,
  Key,
  Settings,
  TwoFA,
  DatabaseImport,
  Receipt2,
  SwitchHorizontal,
  Logout,
  Users,
  School,
  Cash,
  CalendarEvent,
} from 'tabler-icons-react';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    navbar: {
      backgroundColor: theme.colors[theme.primaryColor][6],
    },

    version: {
      backgroundColor: theme.colors[theme.primaryColor][7],
      color: theme.white,
      fontWeight: 700,
    },

    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${theme.colors[theme.primaryColor][7]}`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.colors[theme.primaryColor][7]}`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.white,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colors[theme.primaryColor][5],
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.white,
      opacity: 0.75,
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          opacity: 0.9,
        },
      },
    },
  };
});

const data = [
  { link: '', label: 'Gestion des admin', icon: Users },
  { link: '', label: 'Gestions des élèves', icon: School },
  { link: '', label: 'Scolarité', icon: Cash },
  { link: '', label: 'Évnènement', icon: CalendarEvent },
];

function SideBar() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Billing');

  const links = data.map((item) => (
    <a
      className={cx(classes.link, {
        [classes.linkActive]: item.label === active,
      })}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}>
      <item.icon className={classes.linkIcon} />
      <span>{item.label}</span>
    </a>
  ));

  return (
    <Navbar
      height={'100vh'}
      width={{ sm: 300 }}
      p='md'
      className={classes.navbar}>
      <Navbar.Section grow>
        <Group className={classes.header} position='apart'>
          <Text color='#fff' sx={{ fontWeight: 'bold', fontSize: 32 }}>
            Ilewemi
          </Text>
        </Group>
        {links}
      </Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a
          href='#'
          className={classes.link}
          onClick={(event) => event.preventDefault()}>
          <Logout className={classes.linkIcon} />
          <span>Déconnexion</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}

export default SideBar;
