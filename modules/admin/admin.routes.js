const express=require("express")
const router=express.Router()

const adminController=require("./admin.controller")


router.post("/admin/get-all-requests",adminController.getAllRequests);

router.post("/admin/get-all-users",adminController.getAllUsers);

router.patch("/admin/user-status-change/:id",adminController.changeUserStatus);

router.patch("/admin/change-user-role/:id",adminController.changeUserRole);



module.exports = router;