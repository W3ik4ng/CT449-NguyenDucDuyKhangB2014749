const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocGiaSchema = new Schema({
    MaDocGia: {
        type: Number,
        require: true,
        unique: true,
    },
    HoLot: {
        type: String,
        require: true,
    },
    Ten: {
        type: String,
        require: true,
    },
    NgaySinh: {
        type: Date,
        require: true,
    },
    Phai: {
        type: String,
        enum: ['Nam', 'Nữ', 'Khác'],
        require: true,
        
    },
    DiaChi: {
        type: String,
    },
    DienThoai: {
        type: String,
    },
    
});

module.exports = mongoose.model('DocGia', DocGiaSchema);