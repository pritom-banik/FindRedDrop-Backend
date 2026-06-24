const express=require("express")
const router=express.Router()

const registrationController=require("./registration.controller")

router.get("/districts",registrationController.getDistricts)

router.get("/upazilas/:districtId",registrationController.getUpazilas)


module.exports = router;