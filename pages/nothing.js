import EditableDropdown from '@/app/editableDropdown';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {

  const [header, setHeader] = useState([]);
  const [data, setData] = useState([]);
  const [env, setEnv] = useState();
  const [texts, setTexts] = useState([]);


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

        if (reData?.data)
          setData(reData.data);

        if (reHeader?.data)
          setHeader(reHeader.data);

        if (reEnv?.data)
          setEnv(reEnv.data);

        // console.log(data);
        // setData(reHeader.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ margin: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* <pre>{JSON.stringify(env, null, 2)}</pre> */}
      <div>
        {
          header?.map((x, index) => {
            return <div key={index} style={{ display: 'inline-flex', marginRight: '15px', fontSize: '15px' }}>
              <span style={{ marginBottom: '5px', justifyContent: 'space-between' }}>
                {/* <label style={{ marginRight: '3px' }}>{x}</label> */}
                {/* <input /> */}
                <EditableDropdown options={env[x]}
                  label={x}
                  onChange={(value) => {
                    texts[index] = value;
                    setTexts(texts);
                    console.log(texts[index]);
                  }} userInput={texts[index]}/>
              </span>
            </div>
          })
        }
      </div>


      <button style={{ justifySelf: 'center', marginTop: '10px', fontSize: '18px' }}>Search</button>
    </div>

  );
}
//display: 'flex', flexDirection: 'column', alignItems: 'center'