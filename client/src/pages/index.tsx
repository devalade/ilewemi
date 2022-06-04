import { Button } from '@mantine/core';
import { ReactElement } from 'react';
import Layout from '../layout';

function Demo() {
  // Same can be applied to Aside component with Aside.Section component
  return (
    <>
      <Button variant='gradient' gradient={{ from: 'indigo', to: 'cyan' }}>
        Indigo ddfdsfsdfsdcyan
      </Button>
      <Button
        variant='gradient'
        gradient={{ from: 'teal', to: 'lime', deg: 105 }}>
        Lime green
      </Button>
      <Button
        variant='gradient'
        gradient={{ from: 'teal', to: 'blue', deg: 60 }}>
        Teal blue
      </Button>
      <Button variant='gradient' gradient={{ from: 'orange', to: 'red' }}>
        Orange red
      </Button>
      <Button
        variant='gradient'
        gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}>
        Peach
      </Button>
    </>
  );
}

export default Demo;

Demo.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
