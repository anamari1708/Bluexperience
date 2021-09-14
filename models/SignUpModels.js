//model za spajanje na bazu
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    passwordHash:{
        type:String,
        require:true
    },
    lookingfor:{
        type:String,
        require:true
    },
    country:{
        type:String,
        require:true
    },
    descriptionFile:{
        type: String,
        required: true 
    },
    postDate: { 
        type: Date,
         default: Date.now
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    }
    
    })

const User = mongoose.model("user", userSchema);
module.exports=User;
