import express from "express";
import pg from "pg";
import "dotenv/config";

import * as userHandeler from "./controller/UserHandler.js";

const app = express();
const { Pool } = pg;
app.use(express.json());
export const db = new Pool({
  connectionString: process.env.NEON_DB,
  ssl: {
    rejectUnauthorized: true,
  },
});

try {
  const client = await db.connect();
  console.log("connected successfully to the DB");
  client.release();
} catch (err) {
  console.log("Something went wrong", err);
}
async function GetUserData(_, res, next) {
  try {
    const user = await db.query("SELECT * FROM users");
    console.log("database connected");
    console.log("the users data", user.rows);
    res.json({ data: user.rows });
  } catch (err) {
    console.log("error", err);
    next(err);
  }
}

app.get("/users", GetUserData);
// app.get("/users/:id", async (req, res) => {
//   const singleUser = await db.query("SELECT * FROM users WHERE id=$1", [
//     req.params.id,
//   ]);
//   res.json({ data: singleUser.rows });
// });
app.get("/users/:id", userHandeler.GetUserById);
app.post("/users", userHandeler.PostUsers);
app.put("/users/:id", userHandeler.updateUserById);
app.patch("/users/:id", userHandeler.updateUserById);
app.delete("/users/:id", userHandeler.DeleteUsers);

app.delete("/users", (req, res) => {
  res.send("Hello World");
});

app.use((err, _, res, next) => {
  res.json({ message: err });
});

// export default app;
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
