const express=require('express')
const authMiddelware=require('../middlewares/authMiddelware');
const { getDonarListController, getHospitalListController, getOrganisationListController, deleteDonarController, deleteHospitalController, deleteOrganisationController } = require('../controllers/adminController');
const adminMiddleware = require('../middlewares/adminMiddleware');

const router =express.Router();

// Routes 

// get method for get donar list 
router.get('/donar-list',authMiddelware,adminMiddleware,getDonarListController);

// get method for get hospital list 
router.get('/hospital-list',authMiddelware,adminMiddleware,getHospitalListController);

// get method for get organisation list 
router.get('/organisation-list',authMiddelware,adminMiddleware,getOrganisationListController);



// donar delete 
router.delete('/delete-donar/:id',authMiddelware,adminMiddleware,deleteDonarController)


// hospital delete 
router.delete('/delete-hospital/:id',authMiddelware,adminMiddleware,deleteHospitalController)

// organisation delete 
router.delete('/delete-organisation/:id',authMiddelware,adminMiddleware,deleteOrganisationController)


// export 
module.exports=router;