const express=require("express")
const router=express.Router()

const adminController=require("./admin.controller")


router.post("/admin/get-all-requests",adminController.getAllRequests);

router.post("/admin/get-all-users",adminController.getAllUsers);

router.patch("/admin/user-status-change/:id",adminController.changeUserStatus);

router.patch("/admin/change-user-role/:id",adminController.changeUserRole);

//All analytical route

router.get("/admin/get-total-user",adminController.getTotalUser)

router.get("/admin/get-total-funding",adminController.getTotalFunding)

router.get("/admin/get-total-blood-request-info",adminController.getTotalBloodReqInfo)



module.exports = router;