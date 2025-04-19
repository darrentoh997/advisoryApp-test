import pool from "../utils/db";

export const getAllUserListings = async (id: number) => {
  const SELECT_FIELDS = "id, name, latitude, longitude, created_at, updated_at";
  const [rows] = await pool.query(
    `SELECT ${SELECT_FIELDS} FROM listings WHERE id = ?`,
    [id]
  );
  return rows as any[];
};

export const getAllListings = async () => {
  const [rows] = await pool.query("SELECT * FROM listings");
  return rows as any[];
};

export const deleteListingById = async (id: number) => {
  const [result] = await pool.query("DELETE FROM listings WHERE id = ?", [id]);
  return result;
};

export const updateListingById = async (
  id: number,
  data: Record<string, any>
) => {
  const fields = Object.keys(data);
  const values = Object.values(data);

  if (fields.length === 0) {
    throw new Error("No fields provided to update.");
  }

  const setClause = fields.map((field) => `${field} = ?`).join(", ");
  const query = `UPDATE listings SET ${setClause} WHERE id = ?`;

  values.push(id);

  const [result] = await pool.query(query, values);
  return result;
};

export const addListingData = async (data: Record<string, any>) => {
  const fields = Object.keys(data);
  const values = Object.values(data);

  if (fields.length === 0) {
    throw new Error("No fields provided to insert.");
  }

  const placeholders = fields.map(() => "?").join(", ");
  const query = `INSERT INTO listings (${fields.join(
    ", "
  )}) VALUES (${placeholders})`;

  const [result] = await pool.query(query, values);
  return result;
};
