const express = require("express")
const router = express.Router()

const requestController = require("./request.controller")

const middllewire=require("../../middlewire/middlewire")

router.post("/create-blood-request",middllewire.verifyToken, requestController.createRequest)

router.get("/get-blood-requests", requestController.getAllRequests)

router.get("/get-blood-request/:id", requestController.getRequestById)

router.patch("/update-blood-request-status/:id", requestController.updateRequestStatus)

router.patch("/update-blood-request/:id", requestController.updateBloodRequest);

router.delete("/delete-by-id/:id", requestController.deleteRequestById)

module.exports = router;