const express=require("express")
const router=express.Router()

const registrationController=require("./registration.controller")

router.get("/districts",registrationController.getDistricts)

router.get("/upozillas/:districtId",registrationController.getUpozillas)


module.exports = router;