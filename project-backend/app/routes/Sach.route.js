const express = require('express');
const router = express.Router();
const SachController = require('../controllers/Sach.controller');

router.get('/tat-ca-sach', SachController.getAllSach);
router.get('/lay-sach/:MaSach', SachController.getOneSach);
router.post('/them-sach', SachController.addSach);
router.put('/sua-sach/:MaSach', SachController.updateSach);
router.delete('/xoa-sach/:MaSach', SachController.deleteSach);

module.exports = router;

