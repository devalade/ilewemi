import React from 'react';
import Layout from '@src/layout';
import {
  Box,
  Button,
  createStyles,
  Group,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  wrapper: {
    maxWidth: '30em',
    marginInline: 'auto',
  },
  eventTitle: {
    fontSize: '1.2em',
    fontWeight: 600,
  },
  eventDate: {
    color: theme.colors.gray[7],
  },
}));

function Event() {
  return (
    <Box sx={{ maxWidth: '30em' }} mx='auto'>
      <Link href='/event/new'>
        <Button>Ajouer un évenement</Button>
      </Link>
      <Stack mt={22}>
        {[1].map((v) => (
          <EventCard />
        ))}
      </Stack>
    </Box>
  );

  function EventCard() {
    const { classes } = useStyles();
    return (
      <Paper withBorder p={16}>
        <Stack>
          <Box>
            <Text className={classes.eventTitle}>Fête patronale</Text>
            <Text className={classes.eventDate}>Dans l'école</Text>
          </Box>
          <Text lineClamp={6}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Maiores
            quia excepturi qui deserunt nobis corporis accusamus iure ipsa
            impedit fuga vitae iusto, illo ullam aliquid maxime tenetur animi.
            Minus, harum! Nemo consequuntur reprehenderit deserunt error quas
            sapiente consectetur, perspiciatis dignissimos officiis repellat
            unde nulla iste similique laborum, rerum nobis atque doloremque,
            deleniti natus. Expedita voluptatem quis asperiores error dicta
            eius.
          </Text>
        </Stack>
      </Paper>
    );
  }
}

export default Event;

Event.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};
