const { ObjectId } = require("mongodb")
const database = require("../../config/database")

function getCollection() {
    const db = database.getDb();
    return db.collection('blood_requests');
}

function getUserCollection() {
    const db = database.getDb();
    return db.collection('user');
}

async function getAllRequests(req, res) {
    try {
        const collection = getCollection();
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;
        const query = {};
        const { role } = req.body;
        if (role != "admin" && role != "volunteer") {
            return res.status(403).json({ error: "Forbidden api" });
        }

        // 2. Only add status to the filter if it was actually passed in the request
        if (req.query.status != "all") {
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

async function getAllUsers(req, res) {
    try {
        const collection = getUserCollection();
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const offset = (page - 1) * limit;
        const query = {};
        const { role } = req.body;
        if (role != "admin") {
            return res.status(403).json({ error: "Forbidden api" });
        }

        // 2. Only add status to the filter if it was actually passed in the request
        if (req.query.status != "all") {
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
            users: requests,
            total: totalRequests,
            page: page,
            limit: limit
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function changeUserStatus(req, res) {
    try {
        const collection = getUserCollection();
        const requestId = req.params.id;

        const now = new Date();

        const { status, me } = req.body;

        if (me != "admin") {
            return res.status(403).json({ message: "Unauthorized" })
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(requestId) },
            {
                $set: {
                    status: status,
                    updatedAt: now
                }
            }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "Request status updated successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function changeUserRole(req, res) {
    try {
        const collection = getUserCollection();
        const requestId = req.params.id;

        const now = new Date();

        const { role, me } = req.body;

        if (me != "admin") {
            return res.status(403).json({ message: "Unauthorized" })
        }

        const result = await collection.updateOne(
            { _id: new ObjectId(requestId) },
            {
                $set: {
                    role: role,
                    updatedAt: now
                }
            }
        );
        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json({ message: "Request status updated successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports = { getAllRequests, getAllUsers, changeUserStatus, changeUserRole }