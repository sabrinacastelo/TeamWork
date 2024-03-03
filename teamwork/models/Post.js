const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
    {
        userId: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            max: 500
        },
        img: {
            type: String,
        },
        likes: {
            type: Array,
            default: []
        },
        comments: [{
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
            },
            text: String,
        }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);