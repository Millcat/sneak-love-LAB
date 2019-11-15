const mongoose = require("mongoose"); // import mongoose dependencie

const Schema = mongoose.Schema;

const sneakerSchema = new Schema({
    name: String,
    ref: String,
    size: {
        type: [String],
        enum: ["36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46"]
    },
    description: String,
    price: Number,
    category: {
        type: String,
        enum: ["men", "women", "kids"]
    },
    id_tags: {
        type: Schema.Types.ObjectId,
        ref: "Tag"
    },
    image: {
        type: String,
        default: "https://i1.adis.ws/i/jpl/jd_333960_a?qlt=80&w=600&h=425&v=1&fmt=webp"
    }
});

const sneakerModel = mongoose.model("Sneaker", sneakerSchema);

module.exports = sneakerModel;