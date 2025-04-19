import mysql from "mysql2/promise";

const pool = mysql.createPool(
  process.env.DATABASE_CONN_STRING ||
    "mysql://root:121233@localhost/your_database_name"
);

export default pool;
