import * as Mantine from '@mantine/core';
import React from 'react';
import AddButton from './AddButton';
import EditButton from './EditButton';
import DeleteButton from './DeleteButton';
import PredictButton from './PredictButton';

function NavBar() {
  return (
    <Mantine.SimpleGrid cols={4} className="mx-8 my-2 lg:mx-20 lg:my-8 ">
      <PredictButton />
      <AddButton />
      <EditButton />
      <DeleteButton />
    </Mantine.SimpleGrid>
  );
}

export default NavBar;
