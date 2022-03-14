import * as Mantine from '@mantine/core';
import { createStyles } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTableRows } from '../app/redux/actions/actions';
import { generateColumnNames } from '../utils/table/generateStructure';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]}`,
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

  const state = useSelector((s) => s.api.table);
  const actionDispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const [buttonState, setButtonState] = useState({
    start: true,
    previous: true,
    next: true,
    last: true,
  });

  useEffect(() => {
    setColumnNames(generateColumnNames(state.rows[0]));
  }, [state]);

  const rows = state.rows.map((row, index) => (
    <tr key={row.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-indigo-300'}`}>
      {columnNames.map((col) => (
        <td className="text-center  border-2 border-collapse border-black">{row[col]}</td>
      ))}
    </tr>
  ));

  // eslint-disable-next-line no-unused-vars
  const shouldButtonBeEnabled = () => {
    // eslint-disable-next-line no-unused-vars
    const { rows: R, limit: L, start: S } = state.meta[0];
    console.log(state.meta[0]);
    if (S === 0) {
      setButtonState((prevState) => ({
        ...prevState,
        start: false,
        previous: false,
      }));
    } else {
      setButtonState(() => ({ start: true, previous: true, next: true, last: true }));
    }
    console.log(buttonState);
  };

  useEffect(() => shouldButtonBeEnabled(), [state.meta]);

  const getNextRows = () => {
    const { start: S, limit: L } = state.meta[0];
    actionDispatch(getTableRows({ start: S + L, limit: L }));
  };

  return (
    <>
      <Mantine.ScrollArea
        className="h-80 shadow-md mx-8 my-2 lg:mx-20 lg:my-8 rounded-lg hover:shadow-2xl transition ease-in-out
      hover:-translate-y-1 hover:scale-110 duration-300 delay-150  motion-reduce:transition-none motion-reduce:hover:transform-none "
        scrollbarSize={10}
        type="always"
        scrollHideDelay={700}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Mantine.Table sx={{ minWidth: 700 }} className="bg-orange-500" highlightOnHover>
          <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
            <tr className="bg-lime-100">
              {columnNames.map((columnName) => (
                <th>{columnName}</th>
              ))}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Mantine.Table>
      </Mantine.ScrollArea>
      <Mantine.Center>
        <Mantine.Group>
          <Mantine.Button
            disabled={!buttonState.start}
            className="bg-orange-400 hover:bg-orange-500 hover:cursor-pointer "
          >
            Start
          </Mantine.Button>
          <Mantine.Button
            disabled={!buttonState.previous}
            className="bg-orange-300 hover:bg-orange-400 hover:cursor-pointer"
          >
            Previous
          </Mantine.Button>
          <Mantine.Center>
            <div>{`Displaying ${state.meta[0].start}-10 of ${state?.meta[0]?.rows} items`}</div>
          </Mantine.Center>
          <Mantine.Button
            onClick={() => getNextRows()}
            className="bg-orange-300 hover:bg-orange-400 hover:cursor-pointer"
          >
            Next
          </Mantine.Button>
          <Mantine.Button className="bg-orange-400 hover:bg-orange-500 hover:cursor-pointer">Last</Mantine.Button>
        </Mantine.Group>
      </Mantine.Center>
    </>
  );
}

export default TableScrollArea;

TableScrollArea.propTypes = {};
