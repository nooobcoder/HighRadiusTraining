import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import { getTableRows } from './app/redux/actions/actions';
import Header from './components/Header';
import TableComponent from './components/Table';

function App() {
  // api is the name of the reducer in the store
  const actionDispatch = useDispatch();

  useEffect(() => {
    actionDispatch(getTableRows());
  }, []);

  return (
    <div className="">
      {/* Header Component */}
      <Header />
      <TableComponent />
    </div>
  );
}

export default App;
