import { Anchor, Box, createStyles, Header, Text } from '@mantine/core';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import InputWithButton from '../Form/InputWithButton';
import ProfileCard from './ProfileCard';

const useStyles = createStyles((theme, _params) => {
  return {
    header: {
      backgroundColor: theme.colors.blue[7],
    },
    logo: {
      color: theme.colors.blue[1],
      fontSize: 32,
      fontWeight: 700,
      lineHeight: 1,
    },
  };
});

function LayoutHeader() {
  const { classes, cx } = useStyles();
  return (
    <Header className={classes.header} height={60} p='xs'>
      <Box
        sx={() => ({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        })}>
        {/* <Box sx={() => ({ flex: '1' })}> */}
        {/* <Image src='/logo.png' alt='logo' width='100px' height='40px' /> */}
        <Text className={classes.logo}>Ilewemi</Text>
        {/* </Box> */}

        <InputWithButton
          sx={() => ({
            width: 450,
          })}
        />

        <ProfileCard />
      </Box>
    </Header>
  );
}

export default LayoutHeader;
