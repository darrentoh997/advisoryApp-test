import pool from "../utils/db";

export const findUserByEmail = async (email: string) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return (rows as any[])[0];
};

export const findAllUsers = async () => {
  const [rows] = await pool.query("SELECT id, email FROM users");
  return rows as any[];
};
