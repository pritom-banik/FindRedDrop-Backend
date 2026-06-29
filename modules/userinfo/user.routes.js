const express=require("express")
const router=express.Router()

const requestController=require("./user.controller")

const middllewire=require("../../middlewire/middlewire")

router.get("/get-all-my-requests/:id",middllewire.verifyToken,requestController.getUserRequestById)


router.post("/register-all-my-fundings",middllewire.verifyToken,requestController.saveFundingDetails)

router.get("/get-all-funding",middllewire.verifyToken,requestController.getAllFunding)

module.exports = router;