import DataTable from '@/app/datatable';
import EditableDropdown from '@/app/editableDropdown';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function Home() {

  const [data, setData] = useState([]);
  const [all, setAll] = useState();
  const [texts, setTexts] = useState([]);
  const [qParam, setQParam] = useState();


  // '' for all
  const dataQueryParams = {
    'no': '2',
    'googleAccount': null
  };

  const envQueryParams = {
    'no': '',
  };

  const searchHandler = async () => {
    const param = all?.headers?.reduce((acc, value, index) => {
      acc[value] = texts[index];
      return acc;
    }, {});

    try {
      const reData = await axios.get('/api/sheet', { params: param });
      if (reData?.data)
        setData(reData.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

  }

  useEffect(() => {
    const fetchData = async () => {

      // const reData = await axios.get('/api/sheet', { params: dataQueryParams });
      try {
        const reAll = await axios.get('/api/all', { params: envQueryParams });
        if (reAll?.data)
          setAll(reAll.data);
      }
      catch (error) {
        console.error("Error fetching data:", error);
      }

    };

    fetchData();
  }, []);

  return (
    <div style={{ margin: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* <pre>{JSON.stringify(all, null, 2)}</pre> */}
      <div>
        {
          all?.headers?.map((x, index) => {
            return <div key={index} style={{ display: 'inline-flex', marginRight: '15px', fontSize: '15px' }}>
              <span style={{ marginBottom: '5px', justifyContent: 'space-between' }}>
                {/* <label style={{ marginRight: '3px' }}>{x}</label> */}
                {/* <input /> */}
                <EditableDropdown options={all?.env[x]}
                  label={x}
                  onChange={(value) => {
                    const newTexts = [...texts];
                    newTexts[index] = value;
                    setTexts(newTexts);
                    console.log(value);
                  }} userInput={texts} index={index} />
              </span>
            </div>
          })
        }
      </div>

      <button style={{ justifySelf: 'center', marginTop: '10px', fontSize: '18px', cursor: 'pointer' }}
        onClick={searchHandler}
      >Search</button>
      <br />
      <DataTable data={data} />
      {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}

    </div>

  );
}
//display: 'flex', flexDirection: 'column', alignItems: 'center'