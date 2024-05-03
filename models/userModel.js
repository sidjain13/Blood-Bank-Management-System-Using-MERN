const mongoose=require('mongoose')


const userSchema=new mongoose.Schema({
    role:{
        type:String,
        require:[true,'role is required '],
        enum:['admin','organisation','donar','hospital']
        
    },
    name:{
        type:String,
        // name required only for user and admin 
        required:function(){
            if(this.role==='donar' || this.role==='admin'){
                return true;
            }

            return false
        }

    },
    organisationName:{
        type:String,
        // only for organisation
        required:function(){
            if(this.role==='organisation' ){
                return true;
            }

            return false
        }
        
    },
    hospitalName:{
        type:String,
        // only for hospital
        required:function(){
            if(this.role==='hospital' ){
                return true;
            }

            return false
        }
        
    },
    email:{
        type:String,
        require:[true,'email is required '],
        unique:true
    },
    password:{
        type:String,
        require:[true,'password is required '],
    },
    website:{
        type:String,
    },
    address:{
        type:String,
        require:[true,'address is required '],
    },
    phone:{
        type:String,
        require:[true,'phone is required '],
        
    },
},{
    timestamps:true})


// bloodbank database me users naam se collection ban jayegi 
module.exports=mongoose.model('users',userSchema);