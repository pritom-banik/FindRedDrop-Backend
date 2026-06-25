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
        //console.log("Request Data:", requestData); 
        const result = await collection.insertOne(requestData);
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function getAllRequests(req, res) {
    try {
        const collection = getCollection();

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const offset = (page - 1) * limit;

        const requests = await collection.find({},
            {
                projection: {
                    recipientName: 1,
                    district: 1,
                    upazila: 1,
                    bloodGroup: 1,
                    donationDate: 1,
                    donationTime: 1,
                    status: 1,
                }

            }
        ).sort({ donationDate: -1 })
            .skip(offset)
            .limit(limit)
            .toArray();
        const totalRequests = await collection.countDocuments();
        if (requests.length === 0) {
            return res.status(404).json({ message: "No blood requests found." });
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

module.exports = { createRequest, getAllRequests }