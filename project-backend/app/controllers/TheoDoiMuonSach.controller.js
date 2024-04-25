const ApiError = require('../api-error');
const TheoDoiMuonSachModel = require('../models/TheoDoiMuonSach.model');
const DocGiaModel = require('../models/DocGia.model')
const SachModel = require('../models/Sach.model')
class TheoDoiMuonSachController {
    async getAllTheoDoiMuonSach(req, res) {
        try {
            const listTheoDoiMuonSach = await TheoDoiMuonSachModel.find();
            if (!listTheoDoiMuonSach) {
                res.status(500).json({ success: false, message: 'Chưa có phiếu mượn sách' });
            }
            res.status(200).json({ success: true, message: 'Lấy danh sách phiếu mượn sách thành công', listTheoDoiMuonSach });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Lấy danh phiếu mượn sách thất bại', error });
        }
    }

    async addTheoDoiMuonSach(req, res) {

        const {MaSach, MaDocGia, NgayMuon, NgayTra} = req.body;
        if(!MaSach || !MaDocGia || !NgayMuon || !NgayTra) {
            return res.json({ success: false, message: 'Chưa đủ thông tin phiếu mượn sách mới' });
        }

        try {
            const getMaDocGia = await DocGiaModel.findOne({ MaDocGia });

            if (!getMaDocGia) {
                console.log(`Không tìm thấy độc giả với mã ${MaDocGia}`);
                return res.status(500).json({
                    success: false,
                    message: `Không tìm thấy độc giả với mã ${MaDocGia}`,
                });
            } else {
                console.log(`Tìm thấy độc giả với mã ${MaDocGia}`);
            }

            const getMaSach = await SachModel.findOne({ MaSach });

            if (!getMaSach) {
                console.log(`Không tìm thấy sách với mã ${MaSach}`);
                return res.status(500).json({
                    success: false,
                    message: `Không tìm thấy sách với mã ${MaSach}`,
                });
            } else {
                console.log(`Tìm thấy sách với mã ${MaSach}`);
            }

            if (getMaSach.SoQuyen >= 1) {
                // Giảm số lượng sách đi 1
                getMaSach.SoQuyen -= 1;
                // Lưu sách sau khi giảm số lượng vào cơ sở dữ liệu
                await getMaSach.save();
            } else {
                // Nếu số lượng sách = 0, báo lỗi
                return res.status(500).json({
                    success: false,
                    message: `Số lượng sách với mã ${SachId} đã hết`,
                });
            }

            const newTheoDoiMuonSach = new TheoDoiMuonSachModel({
                MaDocGia: getMaDocGia.MaDocGia,
                MaSach: getMaSach.MaSach,
                NgayMuon,
                NgayTra,
            });

            await newTheoDoiMuonSach.save();

            res.status(201).json({ success: true, message: 'Thêm phiếu mượn sách thành công', newTheoDoiMuonSach });
        } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Thêm phiếu mượn sách thất bại', error });
        }
    } 
}

module.exports = new TheoDoiMuonSachController();