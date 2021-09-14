//model za spajanje na bazu
const mongoose = require('mongoose')

const offerSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    position:{
        type:String,
        require:true
    },
    expectations:{
        type:String,
        require:true
    },
    destination:{
        type:String,
        require:true
    },
    numpeople:{
        type:Number,
        require:true
    },
    detailsforjob:{
        type:String,
        require:true
    },
    begining:{
        type:Date,
        require:true
    },
    howlong:{
        type:String,
        require:true
    },
    salary:{
        type:Number,
        require:true
    },
    processed:{
        type: Boolean,
        required: true,
        default: false
    }
    })

const Offer = mongoose.model("offer", offerSchema);
module.exports=Offer;
