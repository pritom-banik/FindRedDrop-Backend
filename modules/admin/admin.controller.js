const { ObjectId } = require("mongodb")
const database = require("../../config/database")

function getCollection() {
    const db = database.getDb();
    return db.collection('blood_requests');
}

async function getAllRequests(req, res) {
    try {
        const collection = getCollection();
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;
        const query = {};
        const {role}=req.body;
        if(role!="admin"){
            return res.status(403).json({ error: "Forbidden api" });
        }

        // 2. Only add status to the filter if it was actually passed in the request
        if (req.query.status!="all") {
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


module.exports = { getAllRequests }