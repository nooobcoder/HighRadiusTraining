import { createStyles, ScrollArea, Table } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { generateColumnNames } from '../utils/table/generateStructure';

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

function TableScrollArea() {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);
  const [columnNames, setColumnNames] = useState([]);

  const state = useSelector((s) => s.api);

  useEffect(() => {
    // console.log(state.rows);
    setColumnNames(generateColumnNames(state.rows[0]));
  }, [state]);

  const rows = state.rows.map((row, index) => (
    <tr
      key={row.id}
      className={`${index % 2 === 0 ? 'bg-white' : 'bg-indigo-300'}`}
    >
      {columnNames.map((col) => (
        <td className="text-center  border-2 border-collapse border-black">
          {row[col]}
        </td>
      ))}
    </tr>
  ));

  return (
    <ScrollArea
      className="h-80 shadow-md mx-8 my-2 lg:mx-20 lg:my-10 rounded-lg hover:shadow-2xl transition ease-in-out
      hover:-translate-y-1 hover:scale-110 duration-300 delay-150  motion-reduce:transition-none motion-reduce:hover:transform-none "
      scrollbarSize={10}
      type="always"
      scrollHideDelay={700}
      onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
    >
      <Table sx={{ minWidth: 700 }} className="bg-orange-500" highlightOnHover>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr className="bg-lime-100">
            {columnNames.map((columnName) => (
              <th>{columnName}</th>
            ))}
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default TableScrollArea;

TableScrollArea.propTypes = {};
