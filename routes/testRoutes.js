// only for testing purpose  
// delete it after some time 

const express=require('express');
const { testController } = require('../controllers/testController');

// router object 
const router=express.Router();


// routes 
router.get('/',testController);

module.exports=router;