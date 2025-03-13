import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState([]);
  const queryParams = {
    'no': '',
    'googleAccount': 'ngdanhezcom'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api/sheet', { params: queryParams });
        console.log(result.data);
        setData(result.data);
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
