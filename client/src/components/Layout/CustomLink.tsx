import { createStyles } from '@mantine/core';
import Link from 'next/link';
import React, { forwardRef, useState } from 'react';
import { Icon } from 'tabler-icons-react';

interface ICustomLink {
  href: string;
  link: string;
  label: string;
  icon: Icon;
  useActive: any;
}

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon');
  return {
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
      cursor: 'pointer',

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

    linkIcon: {
      ref: icon,
      color:
        theme.colorScheme === 'dark'
          ? theme.colors.dark[2]
          : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor:
          theme.colorScheme === 'dark'
            ? theme.fn.rgba(theme.colors[theme.primaryColor][8], 0.25)
            : theme.colors[theme.primaryColor][0],
        color:
          theme.colorScheme === 'dark'
            ? theme.white
            : theme.colors[theme.primaryColor][7],
        [`& .${icon}`]: {
          color:
            theme.colors[theme.primaryColor][
              theme.colorScheme === 'dark' ? 5 : 7
            ],
        },
      },
    },
  };
});

const CustomLink = (props: ICustomLink, ref) => {
  const { href, link, label, icon: LinkIcon, useActive } = props;
  const { classes, cx } = useStyles();
  const [active, setActive] = useActive();

  return (
    <Link href={href}>
      <a
        className={cx(classes.link, {
          [classes.linkActive]: link === active,
        })}
        key={label}
        onClick={(event) => {
          setActive(link);
        }}>
        <LinkIcon className={classes.linkIcon} />
        <span>{label}</span>
      </a>
    </Link>
  );
};

export default CustomLink;
