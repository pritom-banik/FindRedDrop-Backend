const express=require("express")
const router=express.Router()

const requestController=require("./user.controller")

router.get("/get-all-my-requests/:id",requestController.getUserRequestById)


module.exports = router;