import pool from "../../../lib/db";

export default async function updateProperty(req, res) {
    
    if (req.method !== "PUT") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { propertyID } = req.query;
    const { address, description, price, landlordID, propertyType, imageURL } = req.body;

    if (!propertyID || !address || !price || !landlordID || !propertyType) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const [result] = await pool.query(
        "UPDATE properties SET address = ?, description = ?, price = ?, landlordID = ?, propertyType = ?, imageURL = ? WHERE propertyID = ?",
        [address, description, price, landlordID, propertyType, imageURL, propertyID]
        );
        res.status(200).json({ message: "Property updated successfully!" });
    } catch (error) {
        console.error("Error updating property:", error);
        res.status(500).json({ message: "Error updating property" });
  }
}