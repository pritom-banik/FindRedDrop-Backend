const express=require("express")
const router=express.Router()

const adminController=require("./admin.controller")


router.get("/admin/get-all-requests",adminController.getAllRequests);



module.exports = router;