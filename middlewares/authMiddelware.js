const JWT=require('jsonwebtoken')

module.exports=async(req,res,next)=>{
    try{
        // console.log(req.headers['authorization'].split(" "))
        // [
        //     'Bearer',
        //     'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWU1YWI4MzE1Mzg0OTg2N2FjZWZkNDIiLCJpYXQiOjE3MDk1NTY3NjYsImV4cCI6MTcwOTY0MzE2Nn0.LqDk0a9O5N_Py5N-6NT13ipiLR56N4JNVLafP09DBMk'
        //   ]
        const token=req.headers['authorization'].split(" ")[1]

        JWT.verify(token,process.env.JWT_SECRET,(err,decode)=>{
            if(err){
                return res.status(401).send({
                    success:false,
                    message:'auth failed'
                })
            }

            else{
                // userId coming from authController login token me se 
                // here this is initailizing userId 
                req.body.userId=decode.userId;

                // console.log(decode);
                // decode ye sab dega 
                // {
                //     userId: '65e5ab83153849867acefd42',
                //     iat: 1709556766,
                //     exp: 1709643166
                // }
                next();
            }
        })
    }
    catch(error){
        console.log(error);
        return res.status(401).send({
            success:false,
            error,
            message:'auth failed',
        })
    }
}