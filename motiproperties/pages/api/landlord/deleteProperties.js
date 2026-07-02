import pool from "../../../lib/db";

export default async function deleteProperty(req, res) {
  
    if (req.method !== "DELETE") {
        return res.status(405).json({ message: "Method Not Allowed" });
    }

    const { propertyID } = req.query;

    try {
        const [result] = await pool.query("DELETE FROM properties WHERE propertyID = ?", [propertyID]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Property not found" });
        }
        res.status(200).json({ message: "Property deleted successfully!" });
    } catch (error) {
        console.error("Delete error:", error);
        res.status(500).json({ message: "Error deleting property" });
    }
}