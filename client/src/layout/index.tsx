import { ReactNode } from 'react';
import { AppShell, Header, Navbar, Box, Anchor } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import SideBar from '../components/Sidebar';

function index({ children }: { children: ReactNode }) {
  return (
    <AppShell padding='md' navbar={<SideBar />}>
      {children}
    </AppShell>
  );
}

export default index;
