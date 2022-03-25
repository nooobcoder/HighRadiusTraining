import * as Mantine from '@mantine/core';
import React from 'react';
import Fallback from '../Fallback';

function NavBar() {
  const AddButton = React.lazy(() => import('./AddButton'));
  const EditButton = React.lazy(() => import('./EditButton'));
  const DeleteButton = React.lazy(() => import('./DeleteButton'));
  const PredictButton = React.lazy(() => import('./PredictButton'));
  return (
    <Mantine.SimpleGrid cols={4} className="mx-8 my-2 lg:mx-20 lg:my-8 ">
      <React.Suspense fallback={<Fallback />}>
        <PredictButton />
        <AddButton />
        <EditButton />
        <DeleteButton />
      </React.Suspense>
    </Mantine.SimpleGrid>
  );
}

export default NavBar;
