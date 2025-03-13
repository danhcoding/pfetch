'use server';
import { doc } from '../../services/google-sheetspread';

export default async function getHeader(req, res) {
  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];

    const headers = sheet.headerValues;

    res.status(200).json(headers);
  } catch (error) {
    console.error("Error fetching sheet data:", error);
    res.status(500).json({ error: error.message });
  }
}
