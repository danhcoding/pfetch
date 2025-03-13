'use server';
import { doc } from '../../services/google-sheetspread';

export default async function handler(req, res) {

  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    // rows[0].set(id, Number(rows[0].get(id)) + 1);
    // await rows[0].save().then(re => res.status(200).json({ sucess: 'ok'}));
    const z = rows[0].get("id");
    res.status(200).json(z);
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    res.status(500).json({ error: error.message });
  }
}
