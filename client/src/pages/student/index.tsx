import Layout from '@src/layout';
import {
  Box,
  Button,
  Center,
  createStyles,
  ScrollArea,
  Text,
} from '@mantine/core';
import { Loader, Plus } from 'tabler-icons-react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { getAllStudent } from '@src/lib/handle-api/student';
import { StudentType } from '@src/lib/types/studentType';
import StudentTable from '@src/components/Student/StudentTable';
import { ReactNode } from 'react';
import { StudentInfoAction } from '@src/components/Student/StudentCard';

const DATA = {
  avatar:
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=255&q=80',
  name: 'Jane Fingerlicker',
  email: 'jfingerlicker@me.io',
  job: 'Art director',
};

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  sideBar: {
    minWidth: 300,
    height: '100%',
    margin: '-16px',
    paddingBottom: '-1rem',
    marginLeft: 0,

    'border-left': '2px solid ' + theme.colors.gray[5],
  },
}));

function Student() {
  const { classes, cx } = useStyles();
  const {
    data: allStudent,
    error,
    isLoading,
  } = useQuery<StudentType[]>('students', getAllStudent);

  if (isLoading) {
    return (
      <Center>
        <Loader />
      </Center>
    );
  }
  return (
    <Box className={classes.wrapper}>
      <Box sx={() => ({ width: '100%' })}>
        <Link href='/student/add'>
          <Button
            component='a'
            leftIcon={<Plus size={16} strokeWidth={2} />}
            variant='outline'>
            Ajouter un étudiant
          </Button>
        </Link>
        {allStudent?.length == 0 ? (
          <Center>
            <Text>Aucun apprenant</Text>
          </Center>
        ) : (
          <StudentTable data={allStudent || []} />
        )}
      </Box>
      <ScrollArea className={classes.sideBar}>
        <StudentInfoAction {...DATA} />
      </ScrollArea>
    </Box>
  );
}

export default Student;

Student.getLayout = function (page: ReactNode) {
  return <Layout>{page}</Layout>;
};
