import * as Mantine from '@mantine/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Search } from 'tabler-icons-react';
import { setFilteredRows } from '../../app/redux/slices/apiSlice';
import AdvancedSearchButton from '../AdvancedSearchButton';
import AddButton from './AddButton';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';
import PredictButton from './PredictButton';

function NavBar() {
  const [searchValue, setSearchValue] = React.useState(null);

  const actionDispatch = useDispatch();

  React.useEffect(() => {
    // This prevents the filter function to be called on every value change,
    // What we see here is a cleanup function of the useEffect hook in React ⚛️.
    // https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
    const timer = setTimeout(() => {
      actionDispatch(setFilteredRows(searchValue));
    }, 600);
    return () => clearTimeout(timer);
  }, [searchValue]);

  return (
    <Mantine.SimpleGrid cols={6} className="my-2 mx-8 lg:my-6 lg:mx-20 ">
      <PredictButton />
      <AddButton />
      <Mantine.NumberInput
        value={searchValue}
        onChange={(val) => setSearchValue(val || null)}
        placeholder="Search by cust number"
        stepHoldDelay={500}
        stepHoldInterval={100}
        icon={<Search size={18} />}
      />
      <AdvancedSearchButton />
      <EditButton />
      <DeleteButton />
    </Mantine.SimpleGrid>
  );
}

export default NavBar;
