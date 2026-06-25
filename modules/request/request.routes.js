const express=require("express")
const router=express.Router()

const requestController=require("./request.controller")

router.post("/create", requestController.createRequest)


module.exports = router;