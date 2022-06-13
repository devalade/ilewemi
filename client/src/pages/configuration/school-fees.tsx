import { Box, Button, createStyles, Paper, Stack, Text } from '@mantine/core';
import AddSchoolFeesModal from '@src/components/BaseConfiguration/SchoolFees/AddSchoolFeesModal';
import Layout from '@src/layout';
import { useState } from 'react';

const useStyles = createStyles((theme) => ({
  price: {
    fontSize: '1.375em',
    fontWeight: 600,
  },
}));

function SchoolFees() {
  const [opened, setOpened] = useState<boolean>(false);
  return (
    <>
      <AddSchoolFeesModal opened={opened} onClose={() => setOpened(false)} />
      <Box sx={{ maxWidth: 500 }} mx='auto'>
        <Button onClick={() => setOpened(true)}>Ajouter un frais</Button>
        <Stack mt={22}>
          {[105000, 210000, 145000, 122000].map((v, idx) => (
            <SchoolFeesPrice key={idx} price={v} />
          ))}
        </Stack>
      </Box>
    </>
  );
}

function SchoolFeesPrice({ price }) {
  const { classes } = useStyles();
  return (
    <Paper withBorder p={20}>
      <Text className={classes.price}>{price} F CFA</Text>
    </Paper>
  );
}

export default SchoolFees;

SchoolFees.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};
