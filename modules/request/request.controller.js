const { ObjectId } = require("mongodb")
const database = require("../../config/database")

function getCollection() {
    const db = database.getDb();
    return db.collection('blood_requests');
}

async function createRequest(req, res) {
    try {
        const collection = getCollection();
        const requestData = req.body;
        console.log("Request Data:", requestData); // Log the request data for debugging
        //const result = await collection.insertOne(requestData);
        //res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { createRequest }