import { ReactNode } from 'react';
import { AppShell, Header, Navbar, Box, Anchor } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
// import SideBar from '@src/components/Layout/Sidebar';
import LayoutHeader from '@src/components/Layout/LayoutHeader';
import SideBar from '@src/components/Layout/Sidebar';

function index({ children }: { children: ReactNode }) {
  return (
    <AppShell padding='md' navbar={<SideBar />} header={<LayoutHeader />}>
      {children}
    </AppShell>
  );
}

export default index;
