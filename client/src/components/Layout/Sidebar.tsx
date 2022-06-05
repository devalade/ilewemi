import { useState } from 'react';
import { createStyles, Navbar } from '@mantine/core';
import CustomLink from './CustomLink';
import { LINKS } from '@src/lib/constant';

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
    header: {
      backgroundColor: theme.colors.blue[1],
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },
  };
});

function SideBar() {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState('Billing');

  return (
    <Navbar height={700} width={{ sm: 300 }} p='md'>
      <Navbar.Section grow>
        {LINKS.map((value, idx) => (
          <CustomLink key={idx} {...value} />
        ))}
      </Navbar.Section>

      {/* <Navbar.Section className={classes.footer}>
        <a
          href='#'
          className={classes.link}
          onClick={(event) => event.preventDefault()}>
          <Logout className={classes.linkIcon} />
          <span>Logout</span>
        </a>
      </Navbar.Section> */}
    </Navbar>
  );
}

export default SideBar;
