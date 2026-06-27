const { ObjectId } = require("mongodb")
const database = require("../../config/database")

function getCollection() {
    const db = database.getDb();
    return db.collection('blood_requests');
}

async function getUserRequestById(req,res) {
    const userId =  req.params.id;
    try {
        const collection = getCollection();
        const requests = await collection.find({ requesterId: userId }).toArray();
        if (requests.length === 0) {
            return res.status(404).json({ message: "No blood requests found for this user." });
        }
        res.status(200).json(requests);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports={getUserRequestById}