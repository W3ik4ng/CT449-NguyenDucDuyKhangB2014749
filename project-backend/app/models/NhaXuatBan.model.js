const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NhaXuatBanSchema = new Schema ({
    MaNXB: {
        type: Number,
        require: true,
        unique: true,
    },
    TenNXB: {
        type: String,
        require: true,
    },
    DiaChi: {
        type: String,
    }
});

module.exports = mongoose.model('NhaXuatBan', NhaXuatBanSchema);