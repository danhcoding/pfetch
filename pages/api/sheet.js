'use server';
import { doc } from '../../services/google-sheetspread';

export default async function fitlerData(req, res) {
  const query = req.query;
  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    const headers = sheet.headerValues;

    // rows[0].set(id, Number(rows[0].get(id)) + 1);
    // await rows[0].save().then(re => res.status(200).json({ sucess: 'ok'}));

    // const z = rows[0].get("Google Account");
    // Filter rows based on dynamic query parameters
    // Filter rows based on dynamic query parameters

    // const filteredRows = rows.filter(row => {
    //   return Object.entries(query).every(([key, value]) => !value || row.get(key) === value);
    // });

    const filteredRows = rows.filter(row => {
      return Object.entries(query).every(([key, value]) => !value || row.get(key).includes(value));
    });    

    const data = filteredRows.map(row => {
      const rowObject = {};
      headers.forEach((header, index) => {
        rowObject[header] = row._rawData[index];
      });
      return rowObject;
    });
    
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    res.status(500).json({ error: error.message });
  }
}
