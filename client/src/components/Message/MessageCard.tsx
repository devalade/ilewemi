import React from 'react';
import { createStyles, Paper, Text, ThemeIcon } from '@mantine/core';
import { ColorSwatch } from 'tabler-icons-react';

const useStyles = createStyles((theme) => ({
  card: {
    position: 'relative',
    cursor: 'pointer',
    overflow: 'hidden',
    transition: 'transform 150ms ease, box-shadow 100ms ease',
    padding: theme.spacing.xl,
    paddingLeft: theme.spacing.xl * 2,

    '&:hover': {
      boxShadow: theme.shadows.md,
      transform: 'scale(1.02)',
    },

    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: 6,
      backgroundImage: theme.fn.linearGradient(
        0,
        theme.colors.blue[6],
        theme.colors.violet[6]
      ),
    },
  },
}));

interface CardGradientProps {
  title: string;
  description: string;
}

function MessageCard({ title, description }: CardGradientProps) {
  const { classes } = useStyles();
  return (
    <Paper withBorder radius='md' className={classes.card}>
      <Text size='xl' weight={500} mt='md'>
        {title}
      </Text>
      <Text size='sm' mt='sm' color='dimmed' lineClamp={5}>
        {description}
      </Text>
    </Paper>
  );
}

export default MessageCard;
