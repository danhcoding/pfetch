import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const queryParams = {
    'no': '2',
    'googleAccount': null
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reData = await axios.get('/api/sheet', { params: queryParams });
        const reHeader = await axios.get('/api/header');

        console.log(reHeader.data);
        setData(reHeader.data);
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
