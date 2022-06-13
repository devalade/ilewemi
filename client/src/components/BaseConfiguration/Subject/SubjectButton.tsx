import React from 'react';
import { Button, Menu, Text, useMantineTheme } from '@mantine/core';
import {
  SquareCheck,
  Package,
  Users,
  Calendar,
  ChevronDown,
  Trash,
} from 'tabler-icons-react';

export function SubjectButton(props: { name: string }) {
  const { name } = props;
  const theme = useMantineTheme();
  return (
    <Menu
      control={
        <Button rightIcon={<ChevronDown size={18} />} sx={{ paddingRight: 12 }}>
          {name}
        </Button>
      }
      transition='pop-top-right'
      placement='end'
      size='lg'>
      <Menu.Item icon={<Trash size={16} color={theme.colors.red[6]} />}>
        Task
      </Menu.Item>
    </Menu>
  );
}

export default SubjectButton;
