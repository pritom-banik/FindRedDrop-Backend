const express=require("express")
const router=express.Router()

const requestController=require("./user.controller")

router.get("/get-all-my-requests/:id",requestController.getUserRequestById)


router.post("/register-all-my-fundings",requestController.saveFundingDetails)

module.exports = router;