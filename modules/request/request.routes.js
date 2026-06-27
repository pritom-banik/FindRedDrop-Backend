const express=require("express")
const router=express.Router()

const requestController=require("./request.controller")

router.post("/create-blood-request", requestController.createRequest)

router.get("/get-blood-requests", requestController.getAllRequests)

router.get("/get-blood-request/:id", requestController.getRequestById)

router.patch("/update-blood-request-status/:id", requestController.updateRequestStatus)

router.delete("/delete-by-id/:id",requestController.deleteRequestById)

module.exports = router;