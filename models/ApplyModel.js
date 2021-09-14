const mongoose = require('mongoose')

const ApplySchema = new mongoose.Schema({
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        work: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'Work'
        },
        postDate: { 
            type: Date,
            default: Date.now
        }, 
    })

const Apply = mongoose.model("apply", ApplySchema);
module.exports=Apply;
