import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';

function App() {
  const [res, setRes] = useState({});

  const doPost = async () => {
    const { status, data } = await axios.post(
      `http://192.168.0.134:280/RESTDatabase_war_exploded/getrows?start=${10}&limit=${10}`,
    );
    if (status === 200) {
      setRes(data);
      console.log(data);
    } else {
      throw new Error('The Endpoint could not be reached!');
    }
  };

  useEffect(() => {
    console.log(res);
    (async () => doPost())();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-lime-300">
      {/* Header Component */}
      <Header />
    </div>
  );
}

export default App;
