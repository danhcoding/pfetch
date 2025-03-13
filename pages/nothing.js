import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  // '' for all
  const dataQueryParams = {
    'no': '2',
    'googleAccount': null
  };

  const envQueryParams = {
    'no': '',
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reData = await axios.get('/api/sheet', { params: dataQueryParams });
        const reHeader = await axios.get('/api/header');
        const reEnv = await axios.get('/api/env', { params: envQueryParams });


        console.log(reEnv.data);
        setData(reEnv.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Google Sheets Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
