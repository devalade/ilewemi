import { ReactElement } from 'react';
import Layout from '@src/layout';

function Classes() {
  return <div>Classes</div>;
}

export default Classes;

Classes.getLayout = function (page: ReactElement) {
  return <Layout>{page}</Layout>;
};
