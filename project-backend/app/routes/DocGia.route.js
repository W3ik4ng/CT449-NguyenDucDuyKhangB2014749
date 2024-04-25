const express = require('express');
const router = express.Router();
const DocGiaController = require('../controllers/DocGia.controller');

router.get('/tat-ca-doc-gia', DocGiaController.getAllDocGia);
router.get('/lay-doc-gia/:MaDocGia', DocGiaController.getOneDocGia);
router.post('/them-doc-gia', DocGiaController.addDocGia);
router.put('/sua-doc-gia/:MaDocGia', DocGiaController.updateDocGia);
router.delete('/xoa-doc-gia/:MaDocGia', DocGiaController.deleteDocGia);

module.exports = router;

