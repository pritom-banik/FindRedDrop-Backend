const express=require("express")
const router=express.Router()

const adminController=require("./admin.controller")


router.post("/admin/get-all-requests",adminController.getAllRequests);



module.exports = router;