'use server';
import { doc } from '../../services/google-sheetspread';

export default async function getAll(req, res) {
  const query = req.query;
  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    const headers = sheet.headerValues;

    const filteredRows = rows.filter(row => {
      return Object.entries(query).some(([key, value]) => !value || row.get(key) === value);
    });    


    // Collect data into a single object using reduce
    const data = filteredRows.reduce((acc, row) => {
      headers.forEach((header, index) => {
        if (!acc[header]) {
          acc[header] = [];
        }
        if (row._rawData[index])
          acc[header].push(row._rawData[index]);
      });
      return acc;
    }, {});

    res.status(200).json({headers: headers, env: data});
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    res.status(500).json({ error: error.message });
  }
}
