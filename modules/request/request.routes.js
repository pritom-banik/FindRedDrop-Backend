const express = require("express")
const router = express.Router()

const requestController = require("./request.controller")

const middllewire=require("../../middlewire/middlewire")

router.post("/create-blood-request",middllewire.verifyToken, requestController.createRequest)

router.get("/get-blood-requests", requestController.getAllRequests)

router.get("/get-blood-request/:id",middllewire.verifyToken, requestController.getRequestById)

router.patch("/update-blood-request-status/:id",middllewire.verifyToken, requestController.updateRequestStatus)

router.patch("/update-blood-request/:id",middllewire.verifyToken, requestController.updateBloodRequest);

router.delete("/delete-by-id/:id",middllewire.verifyToken, requestController.deleteRequestById)

module.exports = router;