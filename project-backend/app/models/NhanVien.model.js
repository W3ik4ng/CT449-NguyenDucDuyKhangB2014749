const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NhanVienSchema = new Schema({
    MSNV: {
        type: Number,
        unique: true,
    },
    HoTenNV: {
        type: String,
        require: true,
    },
    Password: {
        type: String,
        require: true,
    },
    ChucVu: {
        type: String,
        require: true,
    },
    DiaChi: {
        type: String,
    },
    SoDienThoai: {
        type: String,
    },
});

module.exports = mongoose.model('NhanVien', NhanVienSchema);