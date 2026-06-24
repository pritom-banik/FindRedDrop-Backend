const { ObjectId } = require("mongodb")
const database = require("../../config/database")

function getDistrictsCollection() {
    const db = database.getDb();
    return db.collection('districts');
}

function getUpozillaCollection() {
    const db = database.getDb();
    return db.collection("upazilas");
}

async function getDistricts(req, res) {
    try {
        const districtsCollection = getDistrictsCollection();

        const results = await districtsCollection
            .find({}, {
                projection: {
                    _id: 0,
                    name: 1,
                    id: 1
                }
            })
            .toArray();
        if (results.length === 0) return res.status(404).json(results)
        res.json(results);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }

}

async function getUpozillas(req, res) {
    try {
        const upozillaCollection = getUpozillaCollection();

        const districtId = req.params.districtId;

        const results = await upozillaCollection
            .find({ district_id: districtId },{
                projection:{
                    _id:0,
                    id:1,
                    name:1
                }
            })
            .toArray();
        if (results.length === 0) return res.status(404).json(results)
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    getDistricts,
    getUpozillas
}