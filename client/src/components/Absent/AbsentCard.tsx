import { createStyles, Avatar, Text, Group, Paper } from '@mantine/core';
import { PhoneCall, At, Clock } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  icon: {
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[3]
        : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

interface UserInfoIconsProps {
  firstName: string;
  lastName: string;
  _class: string;
  timeRange: string;
}

function AbsentCard(props: UserInfoIconsProps) {
  const { firstName, lastName, _class, timeRange } = props;
  const { classes } = useStyles();
  return (
    <Group noWrap>
      <Avatar size={94} radius='md' color='blue'>
        MF{' '}
      </Avatar>
      <div>
        <Text
          size='xs'
          sx={{ textTransform: 'uppercase' }}
          weight={700}
          color='dimmed'>
          {_class}
        </Text>

        <Text size='lg' weight={500} className={classes.name}>
          {lastName + ' ' + firstName}
        </Text>

        <Group noWrap spacing={10} mt={3}>
          <Clock size={16} className={classes.icon} />
          <Text size='xs' color='dimmed'>
            {timeRange}
          </Text>
        </Group>
      </div>
    </Group>
  );
}

export default AbsentCard;
