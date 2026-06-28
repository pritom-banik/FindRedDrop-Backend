const { ObjectId } = require("mongodb")
const database = require("../../config/database")

function getCollection() {
    const db = database.getDb();
    return db.collection('blood_requests');
}

async function createRequest(req, res) {
    try {
        const collection = getCollection();

        const now = new Date();

        const requestData = {
            ...req.body,
            createdAt: now,
            updatedAt: now
        };
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

async function getRequestById(req, res) {
    try {
        const collection = getCollection();
        const requestId = req.params.id;
        const request = await collection.findOne({ _id: new ObjectId(requestId) });
        if (!request) {
            return res.status(404).json({ message: "Blood request not found." });
        }
        res.status(200).json(request);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function updateRequestStatus(req, res) {
    try {
        const collection = getCollection();
        const requestId = req.params.id;

        const now = new Date();

        const { status } = req.body;
        //console.log(status);

        if (status === "done") {
            const { status, donorEmail, donorName } = req.body;
            const result = await collection.updateOne(
                { _id: new ObjectId(requestId) },
                {
                    $set: {
                        status: "done",
                        updatedAt: now
                    }
                }
            );
            if (result.matchedCount === 0) {
                return res.status(404).json({ message: "Blood request not found." });
            }
        }
        else if (status === "inprogress") {
            const { status, donorEmail, donorName } = req.body;
            const result = await collection.updateOne(
                { _id: new ObjectId(requestId) },
                {
                    $set: {
                        status: status,
                        donorEmail: donorEmail,
                        donorName: donorName,
                    }
                }
            );
            if (result.matchedCount === 0) {
                return res.status(404).json({ message: "Blood request not found." });
            }
        }
        else if (status === "cancel") {
            const { status, donorEmail, donorName } = req.body;
            const result = await collection.updateOne(
                { _id: new ObjectId(requestId) },
                {
                    $set: {
                        status: "cancel",
                    }
                }
            );
            if (result.matchedCount === 0) {
                return res.status(404).json({ message: "Blood request not found." });
            }
        }
        else {
            return res.status(400).json({ message: "Bad request" });
        }

        res.status(200).json({ message: "Request status updated successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function deleteRequestById(req, res) {
    try {
        const collection = getCollection();
        const requestId = req.params.id;


        const result = await collection.deleteOne({ _id: new ObjectId(requestId), status: "pending" });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Blood request not found." });
        }

        res.status(200).json({ message: "Blood request deleted successfully." });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

async function updateBloodRequest(req, res) {
    try {
        const collection = getCollection();
        const requestId = req.params.id;

        const { requesterId, ...updateData } = req.body;

        updateData.updatedAt = new Date();

        const result = await collection.updateOne(
            {
                _id: new ObjectId(requestId),
                requesterId,
            },
            {
                $set: updateData,
            }
        );
        console.log("Sender id : ", requesterId);
        console.log("Updated body : ", updateData);
        console.log("Request id ; ", requestId)

        if (result.matchedCount === 0) {
            return res.status(404).json({
                message: "Blood request not found or unauthorized.",
            });
        }

        res.status(200).json({
            message: "Blood request updated successfully.",
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
}

module.exports = { createRequest, getAllRequests, getRequestById, updateRequestStatus, deleteRequestById, updateBloodRequest }