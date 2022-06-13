import { Table, Group, Text, ActionIcon, ScrollArea } from '@mantine/core';
import { Pencil, Trash } from 'tabler-icons-react';
import { useMutation, useQueryClient } from 'react-query';
import { StudentType } from '@src/lib/types/studentType';
import { deleteStudent } from '@src/lib/handle-api/student';
import { useAtom } from 'jotai';
import { selectedStudent } from '@src/lib/store';

interface StudentTableProps {
  data: StudentType[];
}

function StudentTable({ data }: StudentTableProps) {
  const queryClient = useQueryClient();
  const [, setSelectedStudentId] = useAtom(selectedStudent);
  const deleteStudentMutation = useMutation((id: string) => deleteStudent(id), {
    onSuccess: (data) => {
      queryClient.invalidateQueries();
    },
  });

  const handleSelectStudent = (id: string) => {
    console.log(id);
    setSelectedStudentId(id);
  };

  const rows = data.map((item, idx) => (
    <tr onClick={() => handleSelectStudent(item.id)} key={item.id}>
      <td>
        <Group spacing='sm'>
          <Text size='sm' weight={500}>
            {item.studentCode}
          </Text>
        </Group>
      </td>
      <td>
        <Text size='sm' weight={500}>
          {item.lastName}
        </Text>
      </td>
      <td>
        <Text size='sm' weight={500}>
          {item.firstName}
        </Text>
      </td>
      <td>
        <Group spacing={0} position='right'>
          <ActionIcon>
            <Pencil size={16} />
          </ActionIcon>
          <ActionIcon
            onClick={() => deleteStudentMutation.mutate(item.id)}
            color='red'>
            <Trash size={16} />
          </ActionIcon>
        </Group>
      </td>
    </tr>
  ));

  return (
    <ScrollArea>
      <Table sx={{ minWidth: '100%' }} verticalSpacing='sm'>
        <thead>
          <tr>
            <th>Matricule</th>
            <th>Nom </th>
            <th>Prénom</th>
            <th />
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default StudentTable;
