const express=require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const { bloodGroupDetailsController } = require("../controllers/analyticsController");

const router=express.Router();

// routes



// getting all the blood data 
router.get('/bloodGroups-data',authMiddelware,bloodGroupDetailsController);


module.exports=router