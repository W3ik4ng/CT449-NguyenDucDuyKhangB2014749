const express = require('express');
const router = express.Router();
const NhaXuatBanController = require('../controllers/NhaXuatBan.controller');

router.get('/tat-ca-nxb', NhaXuatBanController.getAllNhaXuatBan);
router.get('/lay-nxb/:MaNXB', NhaXuatBanController.getOneNhaXuatBan);
router.post('/them-nxb', NhaXuatBanController.addNhaXuatBan);
router.put('/sua-nxb/:MaNXB', NhaXuatBanController.updateNhaXuatBan);
router.delete('/xoa-nxb/:MaNXB', NhaXuatBanController.deleteNhaXuatBan);

module.exports = router;

