import React, { useEffect, useId } from 'react';
import './App.css';
import TableComponent from './components/Table';
import Header from './components/Header';

function App() {
  // const [res, setRes] = useState({});

  /* const doPost = async () => {
    try {
      const { status, data } = await axios.post(
        `http://192.168.0.134:280/RESTDatabase_war_exploded/getrows?start=${10}&limit=${10}`,
      );
      if (status === 200) {
        setRes(data);
        console.log(data);
      } else {
        throw new Error('API Error');
      }
    } catch (e) {
      console.log(e.message);
    }
  }; */

  useEffect(() => {
    // console.log(res);
    // (async () => doPost())();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="">
      {/* Header Component */}
      <Header />
      <TableComponent
        data={[
          {
            id: useId(),
            name: 'Ankur',
            email: 'abcd@example.com',
            company: 'XYZ',
          },
          {
            id: useId(),
            name: 'Ankur',
            email: 'abcd@example.com',
            company: 'XYZ',
          },
          {
            id: useId(),
            name: 'Ankur',
            email: 'abcd@example.com',
            company: 'XYZ',
          },
          {
            id: useId(),
            name: 'Ankur',
            email: 'abcd@example.com',
            company: 'XYZ',
          },
          {
            id: useId(),
            name: 'Ankur',
            email: 'abcd@example.com',
            company: 'XYZ',
          },
          {
            id: useId(),
            name: 'Ankur',
            email: 'abcd@example.com',
            company: 'XYZ',
          },
          {
            id: useId(),
            name: 'Ankur',
            email: 'abcd@example.com',
            company: 'XYZ',
          },
        ]}
      />
    </div>
  );
}

export default App;
