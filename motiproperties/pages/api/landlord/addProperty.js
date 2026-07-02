import pool from "../../../lib/db";

export default async function addProperty(req, res) {
  const { address, description, price, landlordID, propertyType, imageURL } = req.body;

  if (!address || !price || !landlordID || !propertyType) {
    return res.status(400).json({ message: "All required fields must be filled" });
  }

  try {
    const [result] = await pool.query(
      "INSERT INTO properties  address, description, price, landlordID, propertyType, imageURL) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [ address, description, price, landlordID, propertyType, imageURL]
    );
    res.status(201).json({ message: "Property added successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error adding property" });
  }
}
