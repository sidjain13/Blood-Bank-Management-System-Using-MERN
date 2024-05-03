const inventoryModel = require("../models/inventoryModel");
const userModel = require("../models/userModel");
const mongoose=require("mongoose");
const {ObjectId}=require("mongodb")

// creating inventory 
const createInventoryController=async(req,res)=>{
    try{
        // validate 
        const {email}=req.body;

        const user=await userModel.findOne({email});
        if(!user){
            throw new error ('user not found');        
        }

        // if(inventoryType==="in" && user.role!=='donar'){
        //     throw new error ('not a donor account');
        // }

        // if(inventoryType==="out" && user.role!=='hospital'){
        //     throw new error ('not a hospital');
        // }

        if(req.body.inventoryType=='out'){
            const requestedBloodGroup=req.body.bloodGroup
            const requestedQuantityOfBlood=req.body.quantity
            const organisation=new mongoose.Types.ObjectId(req.body.userId)


            // calculating blood quantity 

            // these function are the function of mongodb and mongoose 
            
            const totalInOfRequestedBlood=await inventoryModel.aggregate([
                {
                    $match:{
                        organisation,
                        inventoryType:'in',
                        bloodGroup:requestedBloodGroup,
                    }
                },
                {
                    $group:{
                        _id:'$bloodGroup',
                        total:{$sum:'$quantity'}
                    }
                }
            ])
            // console.log("total in : ",totalInOfRequestedBlood)
            const totalIn=totalInOfRequestedBlood[0]?.total || 0
            
            
            // CALCULATE OUT BLOOD QUANTITY 
            const totalOutOfRequestedBloodGroup=await inventoryModel.aggregate([
                {
                    $match:{
                        organisation,
                        inventoryType:'out',
                        bloodGroup:requestedBloodGroup,
                    }
                },
                {
                    $group:{
                        _id:'$bloodGroup',
                        total:{$sum:'$quantity'}
                    }
                }
            ])
            // console.log("total in : ",totalOutOfRequestedBloodGroup)
            const totalOut=totalOutOfRequestedBloodGroup[0]?.total || 0


            // in and out calculation 
            const availableQuantityOfBloodGroup=totalIn-totalOut;



            // validation for quantity 
            if(availableQuantityOfBloodGroup<requestedQuantityOfBlood){
                return res.status(500).send({
                    success:false,
                    message:`only ${availableQuantityOfBloodGroup}ML of ${requestedBloodGroup.toUpperCase()} is available`,

                    
                })
            }

            req.body.hospital=user?._id

            
        }
        else{
            req.body.donar=user?._id;
        }


        // save record 
        const inventory=new inventoryModel(req.body);
        await inventory.save()

        return res.status(201).send({
            success:true,
            message:'new blood record added',
        })

        
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in creating inventory api',
            error,

        })
    }
}


// get all blood records 

const getInventoryController=async(req,res)=>{
    try{
        const inventory = await inventoryModel.find({organisation:req.body.userId}).populate("donar").populate("hospital").sort({createdAt:-1});
        // these are filters 

        // populate se organisation ka data to aayega hi aur uske reference me hai donar to uska bhi data aayega same hospital ka bhi aayega 

        // aur sort function -1 matlab lastest date ka uper aayega 

        return res.status(200).send({
            success:true,
            message:'get all records successfully',
            inventory   
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'error in get all inventory',
            error  
        })
    }

}



// get donar records 
const getDonarsController=async(req,res)=>{
    try{
        const organisation=req.body.userId

        // finding donar id 
        const donarId=await inventoryModel.distinct("donar",{
            organisation,
        })

        // console.log(donarId);

        const donars=await userModel.find({_id:{$in:donarId}})

        return res.status(200).send({
            success:true,
            message:'donar required fetched successfully',
            donars 
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'error in donar records',
            error 
        })
    }
}

const getHospitalController=async(req,res)=>{
    try{
        const organisation=req.body.userId

        // get hospital id 
        const hospitalId=await inventoryModel.distinct('hospital',{
            organisation
        })

        // hospital finding 
        const hospitals = await userModel.find({_id:{$in:hospitalId}});

        return res.status(200).send({
            success:true,
            message:'hospital data fetched successfully',
            hospitals
        })


    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in get hospital api',
            error
        })
    }
}



// get org profiles 
const getOrganisationController=async(req,res)=>{

    try{
        const donar = req.body.userId;

        const orgId=await inventoryModel.distinct('organisation',{donar});

        // find org 
        const organisations=await userModel.find({_id:{$in:orgId}});

        return res.status(200).send({
            success:true,
            message:'data fetched success',
            organisations
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'error in org api',
            error 
        })
    }
}


// get org profiles for hospitals
const getOrganisationControllerForHospital=async(req,res)=>{

    try{
        const hospital = req.body.userId;

        const orgId=await inventoryModel.distinct('organisation',{hospital});

        // find org 
        const organisations=await userModel.find({_id:{$in:orgId}});

        return res.status(200).send({
            success:true,
            message:'hospital data fetched success',
            organisations
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'hospital error in org api',
            error 
        })
    }
}


// get hospital blood records 

const getInventoryHospitalController=async(req,res)=>{
    try{
        const inventory = await inventoryModel.find(req.body.filters).populate("donar").populate("hospital").populate("organisation").sort({createdAt:-1});
        // these are filters 

        // populate se organisation ka data to aayega hi aur uske reference me hai donar to uska bhi data aayega same hospital ka bhi aayega 

        // aur sort function -1 matlab lastest date ka uper aayega 

        return res.status(200).send({
            success:true,
            message:'get hospital consumer records successfully',
            inventory   
        })

    }
    catch(error){
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'error in get conusmer inventory',
            error  
        })
    }

}


module.exports={createInventoryController,getInventoryController,getDonarsController,getHospitalController,getOrganisationController,getOrganisationControllerForHospital,getInventoryHospitalController}