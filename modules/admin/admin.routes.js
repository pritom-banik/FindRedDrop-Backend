const express=require("express")
const router=express.Router()

const adminController=require("./admin.controller")

const middllewire=require("../../middlewire/middlewire")


router.post("/admin/get-all-requests",middllewire.verifyToken,adminController.getAllRequests);

router.post("/admin/get-all-users",middllewire.verifyToken,adminController.getAllUsers);

router.patch("/admin/user-status-change/:id",middllewire.verifyToken,adminController.changeUserStatus);

router.patch("/admin/change-user-role/:id",middllewire.verifyToken,adminController.changeUserRole);

//All analytical route

router.get("/admin/get-total-user",middllewire.verifyToken,adminController.getTotalUser)

router.get("/admin/get-total-funding",middllewire.verifyToken,adminController.getTotalFunding)

router.get("/admin/get-total-blood-request-info",middllewire.verifyToken,adminController.getTotalBloodReqInfo)

//public donor search

router.get("/user/get-all-users",adminController.getAllUserForPublic)

module.exports = router;