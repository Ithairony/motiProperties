import pool from "../../../lib/db";

export  default async function addUser(req, res) {
  const { id, name, email, role  } = req.body;

  try {
    const [result] = await pool.query(
      "INSERT INTO users (id, name, email, role ) VALUES (?, ?, ?, ?)",
      [address, description, price, landlordID, propertyType, imageURL]
    );
    res.status(201).json({ message: "Property added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding property" });
  }
}
