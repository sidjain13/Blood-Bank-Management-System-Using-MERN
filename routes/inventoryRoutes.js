const express=require("express");
const authMiddelware = require("../middlewares/authMiddelware");
const { createInventoryController, getInventoryController, getDonarsController, getHospitalController, getOrganisationController, getOrganisationControllerForHospital, getInventoryHospitalController } = require("../controllers/inventoryController");

const router=express.Router();

// routes


// adding invertory using post 
router.post('/create-inventory',authMiddelware,createInventoryController);



// getting all the blood records 
router.get('/get-inventory',authMiddelware,getInventoryController);

// getting hospital conusmer blood records 
router.post('/get-inventory-hospital',authMiddelware,getInventoryHospitalController);


// getting all the donar records 
router.get('/get-donars',authMiddelware,getDonarsController);

// getting all the hospital records 
router.get('/get-hospitals',authMiddelware,getHospitalController);

// getting all the organisation records 
router.get('/get-organisation',authMiddelware,getOrganisationController);

// getting all the organisation records for hospitals  
router.get('/get-organisation-for-hospital',authMiddelware,getOrganisationControllerForHospital);


module.exports=router