import { Box, Button, createStyles, SimpleGrid, Textarea } from '@mantine/core';
import MessageCard from '@src/components/Message/MessageCard';
import Layout from '@src/layout';
import Link from 'next/link';

const DATA = {
  title: 'Avertissement',
  description:
    'Knowledge nay estimable questions repulsive daughters boy. Solicitude gay way unaffected expression for. His mistress ladyship required off horrible disposed rejoiced. Unpleasing pianoforte unreserved as oh he unpleasant no inquietude insipidity.',
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
      </SimpleGrid>
    </Box>
  );
}

export default Message;

Message.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};
