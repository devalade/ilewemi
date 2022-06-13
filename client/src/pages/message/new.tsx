import {
  Box,
  Button,
  Checkbox,
  createStyles,
  Group,
  Radio,
  RadioGroup,
  Select,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import Layout from '@src/layout';
import Link from 'next/link';

const useStyles = createStyles((theme) => ({
  wrapper: {
    width: theme.breakpoints.xs,
    marginInline: 'auto',
  },
}));

function Message() {
  const { classes, cx } = useStyles();
  return (
    <Stack className={classes.wrapper}>
      <Text component='h2'>Envoyer un message</Text>
      <RadioGroup>
        <Radio value='0' label='Toutes les classes' />
        <Radio value='1' label='Sélectionnez vous même' />
      </RadioGroup>

      <Select
        label='Destinataires'
        data={[
          {
            label: 'Tout le monde',
            value: '0',
          },
        ]}
      />
      <TextInput label='Objet' placeholder='Objet de votre message' />
      <Textarea
        placeholder='Votre message ici...'
        label='Message'
        autosize
        minRows={2}
      />
      <Group position='right'>
        <Link href='/message'>
          <Button component='a' variant='outline' color='dark'>
            Revenir en arrière
          </Button>
        </Link>
        <Button variant='filled'>Envoyer</Button>
      </Group>
    </Stack>
  );
}

export default Message;

Message.getLayout = function (page) {
  return <Layout>{page}</Layout>;
};
