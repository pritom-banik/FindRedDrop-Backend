const { ObjectId } = require("mongodb")
const database = require("../../config/database")

function getCollection() {
    const db = database.getDb();
    return db.collection('blood_requests');
}

function getFundCollection() {
    const db = database.getDb();
    return db.collection("funding");
}

async function getUserRequestById(req, res) {
    const userId = req.params.id;
    try {
        const collection = getCollection();
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;
        const query = { requesterId: userId };


        if (req.query.status != "all") {
            requesterId: userId
            query.status = req.query.status;
        }

        const requests = await collection.find(query)
            .sort({ updatedAt: -1 })
            .skip(offset)
            .limit(limit)
            .toArray();

        const totalRequests = await collection.countDocuments(query);

        if (requests.length === 0) {
            return res.status(404).json({ message: "No blood requests found for this user." });
        }
        res.status(200).json({
            requests: requests,
            total: totalRequests,
            page: page,
            limit: limit
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function saveFundingDetails(req, res) {
    try {
        const collection = getFundCollection();
        const now = new Date();

        const requestData = {
            ...req.body,
            createdAt: now,
        };
        const result = await collection.insertOne(requestData);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { getUserRequestById, saveFundingDetails }