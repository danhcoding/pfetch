'use server';

import { doc } from "../../../services/google-sheetspread";

export default async function result(id) {
  if (!id) {
    return null;
  }

  try {
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    rows[0].set(id, Number(rows[0].get(id)) + 1);
    await rows[0].save();
  } catch (error) {
    console.error(error);
    return null;
  }
  return null;
}