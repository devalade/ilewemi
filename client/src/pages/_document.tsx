import { createGetInitialProps } from '@mantine/next';
import Message from 'next/document';

const getInitialProps = createGetInitialProps();

export default class _Message extends Message {
  static getInitialProps = getInitialProps;
}
