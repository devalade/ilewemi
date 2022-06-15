import { ReactElement, useState } from 'react';
import Layout from '@src/layout';
import { Box, Button, Center, Loader, SimpleGrid } from '@mantine/core';
import { Plus } from 'tabler-icons-react';
import AddSubjectModal from '@src/components/BaseConfiguration/Subject/AddSubjectModal';
import { useQuery } from 'react-query';
import { getAllSubject } from '@src/lib/handle-api/subject';
import get from 'lodash/get';
import { SubjectType } from '@src/lib/types/subjectType';
import SubjectButton from '@src/components/BaseConfiguration/Subject/SubjectButton';

function Subject() {
  const [opened, setOpened] = useState<boolean>(false);
  const { data, isLoading, error } = useQuery<SubjectType[]>(
    'subjects',
    getAllSubject
  );

  const subjectsData = get(data, 'data', []);

  if (isLoading) {
    return (
      <Center
        sx={() => ({
          height: '100%',
        })}>
        <Loader />
      </Center>
    );
  }

  const items = data?.map(({ id, name }) => (
    <SubjectButton key={id} id={id} name={name} />
  ));

  return (
    <>
      <AddSubjectModal opened={opened} onClose={() => setOpened(false)} />

      <Box
        sx={() => ({
          height: '100%',
        })}>
        {data?.length === 0 && (
          <Center
            sx={() => ({
              height: '100%',
            })}>
            <Button
              onClick={() => setOpened(true)}
              leftIcon={<Plus size={16} strokeWidth={2} />}>
              Ajouter des matières
            </Button>
          </Center>
        )}

        {data !== undefined && data?.length > 0 && (
          <SimpleGrid cols={4}>
            <Button
              variant='light'
              onClick={() => setOpened(true)}
              leftIcon={<Plus size={16} strokeWidth={2} />}>
              Ajouter des matières
            </Button>
            {data?.map(({ id, name }) => (
              <SubjectButton key={id} id={id} name={name} />
            ))}
          </SimpleGrid>
        )}
      </Box>
    </>
  );
}

export default Subject;

Subject.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
