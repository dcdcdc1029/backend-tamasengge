const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LivePost = new Schema({
    nama: {
        type: String,
        required: true
    },
    type: {
        type: Number,
        required: true
    },
    harga: {
        type: Number,
        required: true
    },
    alamat: {
        type: String,
        required: true
    },
    deskripsi: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    image: {
        type: Array,
        required: true
    },
    author: {
        type: Object,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("LivePost", LivePost);
