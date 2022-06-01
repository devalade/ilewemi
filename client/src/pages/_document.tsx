import Message from 'next/message';
import { createGetInitialProps } from '@mantine/next';

const getInitialProps = createGetInitialProps();

export default class _Message extends Message {
  static getInitialProps = getInitialProps;
}
