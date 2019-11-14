const mongoose = require("mongoose"); // import mongoose dependencie

const Schema = mongoose.Schema;

const sneakerSchema = new Schema({
    name: String,
    ref: Number,
    sizes: Number,
    description: String,
    price: Number,
    category: {
        type: String,
        enum: ["men", "women", "kids"]
    },
    tag: {
        type: Schema.Types.ObjectId,
        ref: "Tag"
    }
});

const sneakerModel = mongoose.model("Sneaker", sneakerSchema);

module.exports = sneakerModel;