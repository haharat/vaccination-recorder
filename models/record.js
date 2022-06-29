const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const recordSchema = mongoose.Schema({
    vaxDate: {
        type: Date,
    },
    vaxType: {
        type: String,
        enum: ["mRNA", "Vector", "Protein subunit", "other"]
    },
    vaxBrand: {
        type: String,
        enum: ["Pfizer", "Moderna", "Johnson and Johnson", "Novavax", "other"]
    },
    doseNumber: {
        type: Number,
        enum: [1, 2, 3, 4, 5]
    },
    feeling: {
        type: String,
        enum: ["no reaction", "only fatigue", "low fever", "high fever"]
    },
    description: {
        type: String,
    },
    recordedBy:{
        type: ObjectId,
        ref:"User"
    }

});

const Record = mongoose.model("Record", recordSchema);

module.exports = Record;