import * as Mantine from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { X } from 'tabler-icons-react';
import './App.css';
import { getBusinessRows, getCustomersRows, getTableRows } from './app/redux/actions/actions';
import { Header, NavBar } from './components';
import Table from './components/Table';

function App() {
  // api is the name of the reducer in the store
  const actionDispatch = useDispatch();
  // const Table = React.lazy(() => import('./components/Table'));

  // Use redux store
  const { error } = useSelector((state) => state.api);
  const { hasError, errorMessage } = error;

  /* Initial State
      hasError: false,
      message: 'Hi!',
      title: 'This is a test success message!',
      visible: true,
  */
  const notification = useSelector((state) => state.notification);
  const { visible } = notification;

  useEffect(() => {
    actionDispatch(getTableRows({ start: 0, limit: 30 }));
    actionDispatch(getBusinessRows());
    actionDispatch(getCustomersRows());
  }, []);

  useEffect(() => {
    console.log('[App.jsx rendered]');
  });

  useEffect(() => {
    /* 
      Most used notification props
        showNotification({
          id: 'hello-there',
          disallowClose: true,
          onClose: () => console.log('unmounted'),
          onOpen: () => console.log('mounted'),
          autoClose: 5000,
          title: "You've been compromised",
          message: 'Leave the building immediately',
          color: 'red',
          icon: <Cross1Icon />,
          className: 'my-notification-class',
          style: { backgroundColor: 'red' },
          sx: { backgroundColor: 'red' },
          loading: false,
        });
    */
    if (visible) {
      if (hasError) {
        showNotification({
          title: 'Error',
          message: errorMessage,
          disallowClose: true,
          type: 'danger',
          icon: <X size={18} />,
        });
      }
    }
  }, [notification]);

  return (
    <div className="">
      {/* Header Component */}
      <Header />
      <NavBar />
      {!hasError ? (
        <Table />
      ) : (
        <Mantine.Center>
          <Mantine.Text>{errorMessage}</Mantine.Text>
        </Mantine.Center>
      )}
    </div>
  );
}

export default App;
