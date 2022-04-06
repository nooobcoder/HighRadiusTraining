// Stateless Component
import React from 'react';
import { Search } from 'tabler-icons-react';
import * as Mantine from '@mantine/core';

function FloatingActionButton() {
  return (
    <Mantine.Button
      leftIcon={<Search />}
      className=" w-auto bg-orange-400 hover:bg-orange-500 hover:cursor-pointer"
    >
      Adv. Search
    </Mantine.Button>
  );
}

export default FloatingActionButton;
