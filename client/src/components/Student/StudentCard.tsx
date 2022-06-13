import {
  Avatar,
  Text,
  Button,
  Box,
  Center,
  Group,
  ScrollArea,
  List,
} from '@mantine/core';
import { Tabs } from '@mantine/core';
import { getOneStudent } from '@src/lib/handle-api/student';
import { selectedStudent } from '@src/lib/store';
import { StudentType } from '@src/lib/types/studentType';
import { useAtomValue } from 'jotai';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Loader } from 'tabler-icons-react';
import AddMarkModal from './Note/AddMarkModal';

const SUBJECT_DATA = [
  { subject: 'PCT', marks: [12, 13, 3] },
  { subject: 'Mathématique', marks: [18, 15, 3] },
];

interface StudentInfoActionProps {
  avatar: string;
  name: string;
  email: string;
  job: string;
}

export function StudentInfoAction({
  name,
  email,
  job,
}: StudentInfoActionProps) {
  const selectedStudentId = useAtomValue(selectedStudent);
  const [opened, setOpened] = useState<boolean>(false);

  const {
    isIdle,
    data: oneStudentData,
    error,
    isLoading,
    refetch,
  } = useQuery<Partial<StudentType>>(
    ['student', selectedStudent],
    () => getOneStudent(selectedStudentId as string),
    {
      enabled: false,
    }
  );

  useEffect(() => {
    refetch();
  }, [selectedStudentId]);

  if (isLoading && typeof oneStudentData == 'object') {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }

  const leadingZeroFormat = new Intl.NumberFormat(undefined, {
    minimumIntegerDigits: 2,
  });

  const items = [
    { label: 'Scolarité', value: 90000 },
    { label: 'Classe', value: 'Seconde' },
  ].map((stat, idx) => (
    <div key={idx}>
      <Text align='center' size='lg' weight={500}>
        {typeof stat.value == 'number'
          ? leadingZeroFormat.format(stat.value)
          : stat.value}
      </Text>
      <Text align='center' size='sm' color='dimmed'>
        {stat.label}
      </Text>
    </div>
  ));

  return (
    <ScrollArea>
      <AddMarkModal opened={opened} onClose={() => setOpened(false)} />
      {selectedStudentId && oneStudentData !== undefined && (
        <Box
          p='lg'
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.white,
          })}>
          <Avatar size={120} radius={120} mx='auto' color='blue'>
            {typeof oneStudentData === 'object' &&
              `${oneStudentData?.firstName} ${oneStudentData?.lastName}`}
          </Avatar>
          <Text align='center' size='lg' weight={500} mt='md'>
            {oneStudentData.lastName + ' ' + oneStudentData.firstName}
          </Text>
          <Text align='center' color='dimmed' size='sm'>
            {email} • {job}
          </Text>
          <Box
            sx={() => ({
              width: '80%',
              display: 'flex',
              justifyContent: 'space-between',
              marginInline: 'auto',
              marginTop: 10,
            })}>
            {items}
          </Box>

          <Button
            onClick={() => setOpened(true)}
            variant='default'
            fullWidth
            mt='md'>
            Ajouter une note
          </Button>
          <Box>
            <Tabs>
              <Tabs.Tab
                label='Notes'
                title='Reveal hidden truth on long mouse over'>
                {SUBJECT_DATA.map((value, idx) => (
                  <>
                    <Text>{value.subject}</Text>
                    <Group>
                      <List withPadding listStyleType=''>
                        {value.marks.map((mark) => (
                          <List.Item>
                            {' '}
                            {leadingZeroFormat.format(mark)}
                          </List.Item>
                        ))}
                      </List>
                    </Group>
                  </>
                ))}
              </Tabs.Tab>
              <Tabs.Tab label='Absences'>https://youtu.be/dQw4w9WgXcQ</Tabs.Tab>
            </Tabs>
          </Box>
        </Box>
      )}
      {!selectedStudentId && <Text>Aucun apprenant sélectionné</Text>}
    </ScrollArea>
  );
}
