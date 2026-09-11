const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "school",
  password: "password",
  port: 5432,
});

export default db;
