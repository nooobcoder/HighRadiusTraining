// Stateless Component
import React from 'react';
import { Search } from 'tabler-icons-react';
import * as Mantine from '@mantine/core';
import CustomDrawer from './CustomDrawer';
import AdvancedSearchForm from './Forms/AdvancedSearchForm';

function FloatingActionButton() {
  const [opened, setOpened] = React.useState(false);

  return (
    <>
      <CustomDrawer
        opened={opened}
        setOpened={setOpened}
        title="🔍 Advanced Search - Drawer"
        closeOnClickOutside={false}
      >
        <AdvancedSearchForm setOpened={setOpened} />
      </CustomDrawer>
      <Mantine.Button
        leftIcon={<Search />}
        onClick={() => setOpened(true)}
        className=" w-auto bg-orange-400 hover:bg-orange-500 hover:cursor-pointer"
      >
        Adv. Search
      </Mantine.Button>
    </>
  );
}

export default FloatingActionButton;
