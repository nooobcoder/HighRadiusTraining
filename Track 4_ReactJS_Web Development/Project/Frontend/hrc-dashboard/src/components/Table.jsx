import * as Mantine from '@mantine/core';
import { createStyles } from '@mantine/core';
import React, { useEffect, useState, useId } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedRows } from '../app/redux/slices/apiSlice';
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
  // const [checkedItems, setCheckedItems] = useState([3]);

  const state = useSelector((s) => s.api.table);
  const { selectedIndices: checkedItems } = state;
  const actionDispatch = useDispatch();

  // eslint-disable-next-line no-unused-vars
  const [buttonState, setButtonState] = useState({
    start: true,
    previous: true,
    next: true,
    last: true,
  });

  const rowsSelector = (payload) => actionDispatch(setSelectedRows(payload));
  const id = useId();

  const rows = state.rows.map((row, index) => (
    <tr
      key={`row${id}${row?.sl_no}}`}
      className={`${index % 2 === 0 ? 'bg-white' : 'bg-indigo-300'} text-center  border-2 border-collapse border-black`}
    >
      <td key={`data:${id}${row?.sl_no}}`}>
        <Mantine.Center className="px-1 py-1">
          <Mantine.Checkbox
            value={row.sl_no}
            color="orange"
            checked={checkedItems.includes(row.sl_no)}
            onChange={(e) => {
              if (e.target.checked) {
                rowsSelector([...checkedItems, row.sl_no]);
              } else {
                // Remove the serial number from the state array
                rowsSelector(checkedItems.filter((item) => item !== row.sl_no));
              }
            }}
          />
        </Mantine.Center>
      </td>
      {columnNames.map((col) => (
        <td key={`${col}${id}${row[col]}`} className="text-center  border-2 border-collapse border-black">
          {row[col]}
        </td>
      ))}
    </tr>
  ));

  // eslint-disable-next-line no-unused-vars
  const shouldButtonBeEnabled = () => {
    // eslint-disable-next-line no-unused-vars
    const { rows: R, limit: L, start: S } = state.meta[0];
    if (S === 0) {
      setButtonState(() => ({
        next: true,
        last: true,
        start: false,
        previous: false,
      }));
    } else if (S + L === R) {
      setButtonState(() => ({
        start: true,
        previous: true,
        next: false,
        last: false,
      }));
    } else {
      setButtonState(() => ({ start: true, previous: true, next: true, last: true }));
    }
  };

  // useEffect(() => shouldButtonBeEnabled(), [state.meta]);

  useEffect(() => {
    setColumnNames(generateColumnNames(state.rows[0]));
    shouldButtonBeEnabled();
  }, [state]);

  useEffect(() => {
    console.log('[Table.jsx rendered]');
  });

  const getRows = ({ operation = 'next' }) => {
    const { start: S, limit: L, rows: R } = state.meta[0];
    rowsSelector([]);
    switch (operation) {
      case 'start':
        actionDispatch(getTableRows({ start: 0, limit: L }));
        break;
      case 'next':
        actionDispatch(getTableRows({ start: S + L, limit: L }));
        break;
      case 'previous':
        actionDispatch(getTableRows({ start: S - L, limit: L }));
        break;
      case 'last':
        actionDispatch(getTableRows({ start: R - L, limit: L }));
        break;
      default:
        console.log('An operation type was expected but not provided');
    }
  };

  // eslint-disable-next-line no-unused-vars
  const displayTableFooter = () => {
    const { start, limit } = state.meta[0];
    const end = start + limit;

    return (
      <Mantine.Center>
        <Mantine.Group>
          <Mantine.Group>
            <Mantine.Button
              disabled={!buttonState.start}
              onClick={() => getRows({ operation: 'start' })}
              className="bg-orange-400 hover:bg-orange-500 hover:cursor-pointer "
            >
              Start
            </Mantine.Button>
            <Mantine.Button
              disabled={!buttonState.previous}
              onClick={() => getRows({ operation: 'previous' })}
              className="bg-orange-300 hover:bg-orange-400 hover:cursor-pointer"
            >
              Previous
            </Mantine.Button>
          </Mantine.Group>
          <Mantine.Center>
            <Mantine.Mark className="px-3 rounded-lg bg-[#5DAAE0]  lg:visible">
              <Mantine.Text className="text-black sm:text-sm">
                {`Displaying ${start + 1}-${end} of ${state?.meta[0]?.rows} items`}
              </Mantine.Text>
            </Mantine.Mark>
          </Mantine.Center>
          <Mantine.Group>
            <Mantine.Button
              onClick={() => getRows({ operation: 'next' })}
              disabled={!buttonState.next}
              className="bg-orange-300 hover:bg-orange-400 hover:cursor-pointer"
            >
              Next
            </Mantine.Button>
            <Mantine.Button
              disabled={!buttonState.last}
              onClick={() => getRows({ operation: 'last' })}
              className="bg-orange-400 hover:bg-orange-500 hover:cursor-pointer"
            >
              Last
            </Mantine.Button>
          </Mantine.Group>
        </Mantine.Group>
      </Mantine.Center>
    );
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
          <thead key={`${id}thead`} className={`z-10 ${cx(classes.header, { [classes.scrolled]: scrolled })}`}>
            <tr className="bg-lime-100">
              <td key="table-header">
                <Mantine.Center className="px-1 py-2 font-semibold text-sm">
                  <Mantine.Checkbox
                    value="all"
                    label="All"
                    checked={checkedItems.length === state.rows.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        rowsSelector(state.rows.map((row) => row.sl_no));
                      } else {
                        rowsSelector([]);
                      }
                    }}
                  />
                </Mantine.Center>
              </td>
              {columnNames.map((columnName) => (
                <th key={`${id}${columnName}`}>{columnName}</th>
              ))}
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Mantine.Table>
      </Mantine.ScrollArea>
      {displayTableFooter()}
    </>
  );
}

export default TableScrollArea;

TableScrollArea.propTypes = {};
