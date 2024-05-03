// only for testing purpose 
// baad me delete kar dena 

const testController=(req,res)=>{
    res.status(200).send({message:"test routes 1",success:true});
}


module.exports={testController};