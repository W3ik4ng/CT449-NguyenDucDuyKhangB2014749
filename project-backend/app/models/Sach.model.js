const mongoose = require('mongoose');
const NhaXuatBanSchema = require('./NhaXuatBan.model');

const Schema = mongoose.Schema;

const SachSchema = new Schema({
    MaSach:{
        type: Number,
        require: true,
        unique: true,
    },
    TenSach: {
        type: String,
        require: true,
    },
    DonGia: {
        type: Number,
        require: true,
    },
    SoQuyen: {
        type: Number,
        require: true,
    },
    NamXuatBan: {
        type: Date,
    },
    MaNXB: {
        type: Number,
        ref: 'NhaXuatBan'
    },
    TacGia: {
        type: String,
    },
    HinhSach: {
        type: String,
        require: true,
    }
});

module.exports = mongoose.model('Sach', SachSchema);