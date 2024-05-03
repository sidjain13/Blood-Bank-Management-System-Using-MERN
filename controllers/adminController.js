const userModel = require("../models/userModel")


// get donar list 
const getDonarListController=async(req,res)=>{

    try{

        const donarData=await userModel.find({role:'donar'}).sort({created:-1})

        return res.status(200).send({
            success:true,
            totalCount:donarData.length,
            message:'donar list fetchd success',
            donarData
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'error in donar list api',
            error 
        })
    }
}

// get hospital list 
const getHospitalListController=async(req,res)=>{

    try{

        const hospitalData=await userModel.find({role:'hospital'}).sort({created:-1})

        return res.status(200).send({
            success:true,
            totalCount:hospitalData.length,
            message:'hospital list fetchd success',
            hospitalData
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'error in hospital list api',
            error 
        })
    }
}


// get organsiation list 
const getOrganisationListController=async(req,res)=>{

    try{

        const orgData=await userModel.find({role:'organisation'}).sort({created:-1})

        return res.status(200).send({
            success:true,
            totalCount:orgData.length,
            message:'organisation list fetchd success',
            orgData
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'error in organisation list api',
            error 
        })
    }
}


// delete donar 
const deleteDonarController=async(req,res)=>{
    try{
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:'donar deleted success'
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'while deleting donar ',
            error 
        })
    }

}

// delete hospital 
const deleteHospitalController=async(req,res)=>{
    try{
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:'hospital deleted success'
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'while deleting hospital ',
            error 
        })
    }

}

// delete organisation 
const deleteOrganisationController=async(req,res)=>{
    try{
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success:true,
            message:'hospital deleted success'
        })
    }
    catch(error){
        console.log(error)
        return res.status(500).send({
            success:false,
            message:'while deleting hospital ',
            error 
        })
    }

}



module.exports={getDonarListController,getHospitalListController,getOrganisationListController,deleteDonarController,deleteHospitalController,deleteOrganisationController}