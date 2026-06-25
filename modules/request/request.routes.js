const express=require("express")
const router=express.Router()

const requestController=require("./request.controller")

router.post("/create-blood-request", requestController.createRequest)


module.exports = router;