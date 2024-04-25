const ApiError = require('../api-error');
const NhaXuatBanModel = require('../models/NhaXuatBan.model');

class NhaXuatBanController {
    async getAllNhaXuatBan(req, res) {
        try {
            const listNhaXuatBan = await NhaXuatBanModel.find();
            if (!listNhaXuatBan) {
                res.status(500).json({ success: false, message: 'Chưa có nhà xuất bản' });
            }
            res.status(200).json({ success: true, message: 'Lấy danh sách nhà xuất bản thành công', listNhaXuatBan });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Lấy danh sách nhà xuất bản thất bại', error });
        }
    }

    async getOneNhaXuatBan(req, res) {
        try {
            const NhaXuatBanId = Number(req.params.MaNXB);
            const findNhaXuatBan = await NhaXuatBanModel.findOne({ MaNXB: NhaXuatBanId });
            
            if (!findNhaXuatBan) {
                res.status(500).json({ success: false, message: 'Chưa có nhà xuất bản' });
            }
            res.status(200).json({ success: true, message: 'Lấy danh sách nhà xuất bản thành công', findNhaXuatBan });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Lấy danh sách nhà xuất bản thất bại', error });
        }
    }

    async addNhaXuatBan(req, res) {
        const {TenNXB, DiaChi } = req.body;
        if (!TenNXB) {
            return res.json({ success: false, message: 'Chưa đủ thông tin nhà xuất bản mới' });
        }

        try {
            
            const latestNhaXuatBan = await NhaXuatBanModel.findOne().sort({ MaNXB: -1 });
            let newMaNXB;
            if (latestNhaXuatBan) {
                newMaNXB = latestNhaXuatBan.MaNXB + 1;
            } else {
                newMaNXB = 1;
            }

            const newNhaXuatBan = new NhaXuatBanModel({
                MaNXB: newMaNXB,
                TenNXB,
                DiaChi,
            });

            await newNhaXuatBan.save();

            res.status(201).json({ message: 'Upload success' });
        } catch (error) {
            res.status(500).json({ success: false, message: 'thất bại', error });
        }
    }

    async updateNhaXuatBan(req, res) {
        try {
            const NhaXuatBanId = Number(req.params.MaNXB);
            const NhaXuatBanUpdateData = req.body;

            const checkNhaXuatBan = await NhaXuatBanModel.findOne({ MaNXB: NhaXuatBanId });
            if (!checkNhaXuatBan) {
                return res.status(500).json({ success: false, message: `Không tìm thấy nhà xuất bản với mã ${NhaXuatBanId}` });
            }
            const updatedNhaXuatBan = await NhaXuatBanModel.findByIdAndUpdate(checkNhaXuatBan._id, NhaXuatBanUpdateData, {
                new: true,
            });
            res.status(201).json({ success: true, message: 'Cập nhật nhà xuất bản thành công', updatedNhaXuatBan });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Cập nhật nhà xuất bản thất bại', error });
        }
    }

    async deleteNhaXuatBan(req, res) {
        try {
            const NhaXuatBanId = Number(req.params.MaNXB);
            const findNhaXuatBan = await NhaXuatBanModel.findOne({ MaNXB: NhaXuatBanId });

            if (!findNhaXuatBan) {
                res.status(404).json({ success: false, message: `Không tìm thấy nhà xuất bản có mã ${NhaXuatBanId}` });
            }
            const deletedNhaXuatBan = await NhaXuatBanModel.findByIdAndDelete(findNhaXuatBan._id);
            res.status(200).json({ success: true, message: 'Xóa nhà xuất bản thành công', deletedNhaXuatBan });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Xóa nhà xuất bản thất bại', error });
        }
    }
}

module.exports = new NhaXuatBanController();