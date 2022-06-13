import { Box, Button, createStyles, SimpleGrid, Textarea } from '@mantine/core';
import MessageCard from '@src/components/Message/MessageCard';
import Layout from '@src/layout';
import Link from 'next/link';

const DATA = {
  title: 'Avertissement',
  description:
    'Extend default theme with any amount of additional colors, replace shadows, radius, spacing, fonts and many other properties to match your design requirements. Mantine theme is just an object, you can subscribe to it in any part of application via context and use it to build your own components.',
};

const useStyles = createStyles((theme) => ({
  wrapper: {},
}));

function Message() {
  const { classes, cx } = useStyles();
  return (
    <Box className={classes.wrapper}>
      <Link href='/message/new'>
        <Button component='a' variant='outline'>
          Envoyer un message
        </Button>
      </Link>
      <SimpleGrid pt='lg' cols={3}>
        <MessageCard {...DATA} />
        <MessageCard {...DATA} />
        <MessageCard {...DATA} />
        <MessageCard {...DATA} />
        <MessageCard {...DATA} />
      </SimpleGrid>
    </Box>
  );
}

export default Message;

Message.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};
