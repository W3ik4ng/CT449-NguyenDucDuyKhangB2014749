const mongoose = require('mongoose');
const DocGiaSchema = require('./DocGia.model');
const SachSchema = require('./Sach.model');

const Schema = mongoose.Schema;

const TheoDoiMuonSachSchema = new Schema({
    MaDocGia: {
        type: Number,
        ref: 'DocGia',
    },
    MaSach: {
        type: Number,
        ref: 'Sach'
    },
    NgayMuon: {
        type: Date,
        require: true,
    },
    NgayTra: {
        type: Date,
    }
});

module.exports = mongoose.model('TheoDoiMuonSach', TheoDoiMuonSachSchema);
