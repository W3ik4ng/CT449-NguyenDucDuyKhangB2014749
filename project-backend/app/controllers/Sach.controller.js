const ApiError = require('../api-error');
const SachModel = require('../models/Sach.model');
const NhaXuatBanModel = require('../models/NhaXuatBan.model');

class SachController {
    async getAllSach(req, res) {
        try {
            const listSach = await SachModel.find();
            if (!listSach) {
                res.status(500).json({ success: false, message: 'Chưa có sách' });
            }
            res.status(200).json({ success: true, message: 'Lấy danh sách sách thành công', listSach });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Lấy danh sách sách thất bại', error });
        }
    }

    async getOneSach(req, res) {
        try {
            const SachId = Number(req.params.MaSach);
            const findSach = await SachModel.findOne({ MaSach: SachId });
            if (!findSach) {
                res.status(500).json({ success: false, message: 'Chưa có sách' });
            }
            res.status(200).json({ success: true, message: 'Lấy sách thành công', findSach });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Lấy sách thất bại', error });
        }
    }

    async addSach(req, res) {
        const {TenSach, DonGia, SoQuyen, NamXuatBan, MaNXB, TacGia, HinhSach} = req.body;
        if(!TenSach || !DonGia || !SoQuyen || !HinhSach) {
            return res.json({ success: false, message: 'Chưa đủ thông tin sách mới' });
        }

        try {
            const latestSach = await SachModel.findOne().sort({ MaSach: -1 });
            let newMaSach;
            if (latestSach) {
                newMaSach = latestSach.MaSach + 1;
            } else {
                newMaSach = 1;
            }

            const getMaNXB = await NhaXuatBanModel.findOne({ MaNXB });

            if (!getMaNXB) {
                console.log(`Không tìm thấy nhà xuất bản với mã ${MaNXB}`);
                return res.status(500).json({
                  success: false,
                  message: `Không tìm thấy nhà xuất bản với mã ${MaNXB}`,
                });
              } else {
                console.log(`Tìm thấy nhà xuất bản với mã ${MaNXB}`);
              }

            const newSach = new SachModel({
                MaSach: newMaSach,
                TenSach,
                DonGia,
                SoQuyen,
                NamXuatBan,
                MaNXB: getMaNXB.MaNXB,
                TacGia,
                HinhSach,
            });

            await newSach.save();

            res.status(201).json({ success: true, message: 'Thêm sách thành công', newSach });
        } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Thêm sách thất bại', error });
        }
    } 

    async updateSach(req, res) {
        try {
            const SachId = Number(req.params.MaSach);
            const SachUpdateData = req.body;

            const checkSach = await SachModel.findOne({ MaSach: SachId });
            if (!checkSach) {
                return res.status(500).json({ success: false, message: `Không tìm thấy sách với mã ${SachId}` });
            }
            const updatedSach = await SachModel.findByIdAndUpdate(checkSach._id, SachUpdateData, {
                new: true,
            });
            res.status(201).json({ success: true, message: 'Cập nhật sách thành công', updatedSach });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Cập nhật sách thất bại', error });
        }
    }

    async deleteSach(req, res) {
        try {
            const SachId = Number(req.params.MaSach);
            const findSach = await SachModel.findOne({ MaSach: SachId });

            if (!findSach) {
                res.status(404).json({ success: false, message: `Không tìm thấy sách có mã ${SachId}` });
            }
            const deletedSach = await SachModel.findByIdAndDelete(findSach._id);
            res.status(200).json({ success: true, message: 'Xóa sách thành công', deletedSach });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Xóa sách thất bại', error });
        }
    }
}

module.exports = new SachController();