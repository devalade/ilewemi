import React, { useState } from 'react';
import Layout from '@src/layout';
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  Loader,
  Paper,
  SimpleGrid,
  Text,
} from '@mantine/core';
import AddAcademicYearModal from '@src/components/BaseConfiguration/AcademicYear/AddAcademicYearModal';
import { Trash } from 'tabler-icons-react';
import { useMutation, useQuery } from 'react-query';
import {
  deleteOneAcademicYear,
  getAllAcademicYear,
} from '@src/lib/handle-api/acadmic-year';
import { AcademicYearType } from '@src/lib/types/academicYearType';
import dayjs from 'dayjs';
import { AxiosError } from 'axios';
function AcademicYear() {
  const [opened, setOpened] = useState<boolean>(false);

  const { data, isLoading, error } = useQuery<AcademicYearType[]>(
    'academicYear',
    getAllAcademicYear
  );

  if (isLoading) {
    <Center>
      <Loader />
    </Center>;
  }

  return (
    <Box>
      <AddAcademicYearModal opened={opened} onClose={() => setOpened(false)} />
      <Button onClick={() => setOpened(true)} variant='outline'>
        Nouvelle année académique
      </Button>
      <Box>
        <SimpleGrid mt={20} cols={4}>
          {data &&
            data.map(({ id, startDate, endDate }, idx) => (
              <AcademicYearCard
                key={idx}
                startDate={dayjs(startDate).format('DD MMM YYYY')}
                endDate={dayjs(endDate).format('DD MMM YYYY')}
                id={id}
              />
            ))}
        </SimpleGrid>
      </Box>
    </Box>
  );

  function AcademicYearCard({ startDate, endDate, id }) {
    const mutation = useMutation<
      any,
      AxiosError,
      Parameters<typeof deleteOneAcademicYear>[0]
    >('academicYear', deleteOneAcademicYear);

    const handleDelete = (id: string) => {
      mutation.mutate(id);
    };
    return (
      <Paper withBorder p={16}>
        <Group position='apart'>
          <Text>
            {startDate} - {endDate}
          </Text>
          <ActionIcon
            onClick={() => handleDelete(id)}
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
