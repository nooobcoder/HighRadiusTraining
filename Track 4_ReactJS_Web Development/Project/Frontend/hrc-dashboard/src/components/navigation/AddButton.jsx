import * as Mantine from '@mantine/core';
import React from 'react';
import { PlaylistAdd } from 'tabler-icons-react';
import CustomDrawer from './CustomDrawer';
import AddForm from './Forms/AddForm';

function AddButton() {
  const [opened, setOpened] = React.useState(false);

  return (
    <>
      <CustomDrawer
        opened={opened}
        setOpened={setOpened}
        title="➕ Add Record - Drawer"
        closeOnClickOutside={false}
      >
        <AddForm setOpened={setOpened} />
      </CustomDrawer>
      <Mantine.Button
        leftIcon={<PlaylistAdd />}
        className="w-auto bg-orange-400 hover:bg-orange-500 hover:cursor-pointer"
        onClick={() => setOpened(true)}
      >
        Add
      </Mantine.Button>
    </>
  );
}

export default AddButton;
