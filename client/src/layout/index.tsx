import { ReactNode, useEffect } from 'react';
import {
  AppShell,
  Header,
  Navbar,
  Box,
  Anchor,
  Center,
  Loader,
} from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
// import SideBar from '@src/components/Layout/Sidebar';
import LayoutHeader from '@src/components/Layout/LayoutHeader';
import SideBar from '@src/components/Layout/Sidebar';
import { useQuery } from 'react-query';
import { me } from '@src/lib/handle-api/user';
import { useLocalStorage } from '@mantine/hooks';
import { useAtom, useAtomValue } from 'jotai';
import { userAtom } from '@src/lib/store';
import { useRouter } from 'next/router';

function index({ children }: { children: ReactNode }) {
  // const router = useRouter();
  // const [user] = useAtom(userAtom);

  // const { data: meData, error, isLoading, refetch } = useQuery('me', () => me);

  // useEffect(() => {
  //   if (user?.id) {
  //     refetch(user?.id);
  //   }
  // }, []);

  // if (isLoading) {
  //   return (
  //     <Center>
  //       <Loader />
  //     </Center>
  //   );
  // }
  // console.log(error);
  // if (error && !meData) {
  //   router.push('/login');
  // }

  return (
    <AppShell padding='md' navbar={<SideBar />} header={<LayoutHeader />}>
      {children}
    </AppShell>
  );
}

export default index;
