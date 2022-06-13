import React from 'react';
import Layout from '@src/layout';
import { Box, Button, createStyles, SimpleGrid } from '@mantine/core';
import AbsentCard from '@src/components/Absent/AbsentCard';
import Link from 'next/link';

const DATA = {
  classes: 'Seconde',
  firstName: 'Madjengo',
  lastName: 'Gutemberg',
  timeRange: '08:00 - 12:00',
};

const useStyles = createStyles((theme) => ({
  wrapper: {},
}));

function Absent() {
  const { classes, cx } = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Link href='/absent/new'>
        <Button variant='outline'>Signaler une absence</Button>
      </Link>
      <SimpleGrid pt='lg' cols={3}>
        {[1, 3, 4, 5].map((value, idx) => (
          <AbsentCard
            key={idx}
            firstName={DATA.firstName}
            lastName={DATA.lastName}
            _class={DATA.classes}
            timeRange={DATA.timeRange}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}

export default Absent;

Absent.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};
