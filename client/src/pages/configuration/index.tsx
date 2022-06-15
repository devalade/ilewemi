import React, { ReactElement } from 'react';
import {
  createStyles,
  Card,
  Text,
  SimpleGrid,
  UnstyledButton,
  Group,
  Center,
} from '@mantine/core';
import { Coin, Calendar, School, Ballpen, Timeline } from 'tabler-icons-react';
import Layout from '@src/layout';
import Link from 'next/link';

const mockdata = [
  {
    title: 'Année Academic',
    link: '/academic-year',
    icon: Timeline,
    color: 'green',
  },
  { title: 'Matières', link: '/subject', icon: Ballpen, color: 'red' },
  { title: 'Classes', link: '/classes', icon: School, color: 'cyan' },
  {
    title: 'Type Évnènement',
    link: '/event-type',
    icon: Calendar,
    color: 'pink',
  },
];

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  title: {
    fontWeight: 700,
  },

  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: theme.radius.md,
    height: 'auto',
    aspectRatio: '1 / 1',
    padding: '1rem',
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease, transform 100ms ease',

    '&:hover': {
      boxShadow: `${theme.shadows.md} !important`,
      transform: 'scale(1.05)',
    },
  },
}));

function Configuration() {
  const { classes, theme } = useStyles();

  const items = mockdata.map((item, idx) => (
    <Link key={idx} href={'/configuration' + item.link}>
      <UnstyledButton component='a' key={item.title} className={classes.item}>
        <item.icon color={theme.colors[item.color][6]} size={32} />
        <Text size='xs' mt={7}>
          {item.title}
        </Text>
      </UnstyledButton>
    </Link>
  ));

  return (
    <Center
      sx={() => ({
        height: '100%',
      })}>
      <Card withBorder radius='md' className={classes.card}>
        <Group position='apart'>
          <Text className={classes.title}>Configuration de base</Text>
        </Group>
        <SimpleGrid cols={2} mt='md'>
          {items}
        </SimpleGrid>
      </Card>
    </Center>
  );
}

export default Configuration;

Configuration.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
