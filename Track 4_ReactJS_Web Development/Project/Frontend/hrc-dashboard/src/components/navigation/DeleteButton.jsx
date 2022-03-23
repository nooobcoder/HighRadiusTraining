import React, { useState } from 'react';
import * as Mantine from '@mantine/core';
import CustomDrawer from './CustomDrawer';

function DeleteButton() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <CustomDrawer opened={opened} setOpened={setOpened} title="Delete - Drawer">
        <Mantine.Title order={2}>Delete</Mantine.Title>
      </CustomDrawer>
      <Mantine.Button
        className="bg-orange-400 hover:bg-orange-500 hover:cursor-pointer w-auto"
        onClick={() => setOpened(true)}
      >
        Delete
      </Mantine.Button>
    </>
  );
}

export default DeleteButton;
