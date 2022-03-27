import * as Mantine from '@mantine/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { getTableRows, getBusinessRows, getCustomersRows } from './app/redux/actions/actions';
import { Header, NavBar } from './components';
import Table from './components/Table';

function App() {
  // api is the name of the reducer in the store
  const actionDispatch = useDispatch();
  // const Table = React.lazy(() => import('./components/Table'));

  // Use redux store
  const { error } = useSelector((state) => state.api);
  const { hasError, message } = error;

  useEffect(() => {
    actionDispatch(getTableRows({ start: 0, limit: 30 }));
    actionDispatch(getBusinessRows());
    actionDispatch(getCustomersRows());
  }, []);

  useEffect(() => {
    console.log('[App.jsx rendered]');
  });

  return (
    <div className="">
      {/* Header Component */}
      <Header />
      <NavBar />
      {!hasError ? (
        <Table />
      ) : (
        <Mantine.Center>
          <Mantine.Text>{message}</Mantine.Text>
        </Mantine.Center>
      )}
    </div>
  );
}

export default App;
