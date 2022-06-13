import React, { useState } from 'react';
import Layout from '@src/layout';
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Paper,
  SimpleGrid,
  Text,
} from '@mantine/core';
import AddAcademicYearModal from '@src/components/BaseConfiguration/AcademicYear/AddAcademicYearModal';
import { Trash } from 'tabler-icons-react';
function AcademicYear() {
  const [opened, setOpened] = useState<boolean>(false);
  return (
    <Box>
      <AddAcademicYearModal opened={opened} onClose={() => setOpened(false)} />
      <Button onClick={() => setOpened(true)} variant='outline'>
        Nouvelle année académique
      </Button>
      <Box>
        <SimpleGrid mt={20} cols={4}>
          {[1, 2, 3, 4, 5].map((v, idx) =>
            AcademicYearCard({
              startDate: 'Jan 2021',
              endDate: 'Fev 2022',
              id: idx,
            })
          )}
        </SimpleGrid>
      </Box>
    </Box>
  );

  function AcademicYearCard({ startDate, endDate, id }) {
    return (
      <Paper withBorder p={16}>
        <Group position='apart'>
          <Text>
            {startDate} - {endDate}
          </Text>
          <ActionIcon
            onClick={() => console.log('Delete', id)}
            color='red'
            variant='hover'>
            <Trash size={16} color='red' />
          </ActionIcon>
        </Group>
      </Paper>
    );
  }
}

export default AcademicYear;

AcademicYear.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};
