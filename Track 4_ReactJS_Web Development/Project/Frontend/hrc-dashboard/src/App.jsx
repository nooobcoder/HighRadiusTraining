import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { getTableRows } from './app/redux/actions/actions';
import { Table, Header, NavBar } from './components';

function App() {
  // api is the name of the reducer in the store
  const actionDispatch = useDispatch();

  useEffect(() => {
    actionDispatch(getTableRows({ start: 0, limit: 30 }));
  }, []);

  useEffect(() => {
    console.log('[App.jsx rendered]');
  });

  return (
    <div className="">
      {/* Header Component */}
      <Header />
      <NavBar />
      <Table />
    </div>
  );
}

export default App;
