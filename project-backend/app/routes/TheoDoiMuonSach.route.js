const express = require('express');
const router = express.Router();
const TheoDoiMuonSachController = require('../controllers/TheoDoiMuonSach.controller');

router.get('/tat-ca-phieu-theo-doi', TheoDoiMuonSachController.getAllTheoDoiMuonSach);
router.post('/them-phieu-theo-doi', TheoDoiMuonSachController.addTheoDoiMuonSach);

module.exports = router;