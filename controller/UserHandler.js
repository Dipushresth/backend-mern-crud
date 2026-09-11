import { db } from "../app.js";

export async function PostUsers(req, res) {
  const userData = Object.values(req.body);
  console.log("here is the values", userData);

  const QueryGen =
    "INSERT INTO users (name, age, email, phone, address) VALUES($1,$2,$3,$4,$5)";

  await db.query(QueryGen, userData);
  res.json({ message: "success" });
}

export async function DeleteUsers(req, res) {
  const id = req.params.id;

  try {
    const result = await db.query(` DELETE FROM users WHERE id=$1 `, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "success", deletedUser: result.rows[0] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

export async function GetUserById(req, res) {
  const { id } = req.params;
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    console.log("result on getUserByyId", result);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("get id", result.rows[0]);
  } catch (err) {
    console.log("error", err);
    next(err);
  }
}

export async function updateUserById(req, res) {
  const { id } = req.params;
  const userData = req.body;

  const fields = objects.keys(userData);
  const values = objects.values(userData);
  try {
    const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("got id", result.rows[0]);
  } catch (err) {
    console.log("error", err);
  }
}
