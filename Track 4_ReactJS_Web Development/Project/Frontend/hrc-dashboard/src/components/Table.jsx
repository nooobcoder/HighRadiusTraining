import { createStyles, ScrollArea, Table } from '@mantine/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark'
          ? theme.colors.dark[3]
          : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

function TableScrollArea({ data }) {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row, index) => (
    <tr
      key={row.id}
      className={`${index % 2 === 0 ? 'bg-white' : 'bg-indigo-300'}`}
    >
      <td>{row.name}</td>
      <td>{row.email}</td>
      <td>{row.company}</td>
    </tr>
  ));

  return (
    <ScrollArea
      className="h-1/3  m-10 rounded-lg"
      scrollbarSize={7}
      type="always"
      scrollHideDelay={700}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table sx={{ minWidth: 700 }} className="bg-orange-500">
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody className="border-8">{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default TableScrollArea;

TableScrollArea.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      email: PropTypes.string,
      company: PropTypes.string,
    }),
  ).isRequired,
};
