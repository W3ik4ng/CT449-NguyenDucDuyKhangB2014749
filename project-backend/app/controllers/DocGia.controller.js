const ApiError = require('../api-error');
const DocGiaModel = require('../models/DocGia.model');

class DocGiaController {
    async getAllDocGia(req, res) {
        try {
            const listDocGia = await DocGiaModel.find();
            if (!listDocGia) {
                res.status(500).json({ success: false, message: 'Chưa có độc giả' });
            }
            res.status(200).json({ success: true, message: 'Lấy danh độc giả độc giả thành công', listDocGia });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Lấy danh độc giả độc giả thất bại', error });
        }
    }

    async getOneDocGia(req, res) {
        try {
            const DocGiaId = Number(req.params.MaDocGia);
            const findDocGia = await DocGiaModel.findOne({ MaDocGia: DocGiaId });
            if (!findDocGia) {
                res.status(500).json({ success: false, message: 'Chưa có độc giả' });
            }
            res.status(200).json({ success: true, message: 'Lấy danh độc giả độc giả thành công', findDocGia });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Lấy danh độc giả độc giả thất bại', error });
        }
    }

    async addDocGia(req, res) {
        const {HoLot, Ten, NgaySinh, Phai, DiaChi, DienThoai} = req.body;
        if(!HoLot || !Ten || !NgaySinh || !Phai) {
            return res.json({ success: false, message: 'Chưa đủ thông tin độc giả mới' });
        }

        try {
            const latestDocGia = await DocGiaModel.findOne().sort({ MaDocGia: -1 });
            let newMaDocGia;
            if (latestDocGia) {
                newMaDocGia = latestDocGia.MaDocGia + 1;
            } else {
                newMaDocGia = 1;
            }

            const newDocGia = new DocGiaModel({
                MaDocGia: newMaDocGia,
                HoLot,
                Ten,
                NgaySinh,
                Phai,
                DiaChi,
                DienThoai,
            });

            await newDocGia.save();

            res.status(201).json({ success: true, message: 'Thêm độc giả thành công', newDocGia });
        } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Thêm độc giả thất bại', error });
        }
    } 

    async updateDocGia(req, res) {
        try {
            const DocGiaId = Number(req.params.MaDocGia);
            const DocGiaUpdateData = req.body;

            const checkDocGia = await DocGiaModel.findOne({ MaDocGia: DocGiaId });
            if (!checkDocGia) {
                return res.status(500).json({ success: false, message: `Không tìm thấy độc giả với mã ${DocGiaId}` });
            }
            const updatedDocGia = await DocGiaModel.findByIdAndUpdate(checkDocGia._id, DocGiaUpdateData, {
                new: true,
            });
            res.status(201).json({ success: true, message: 'Cập nhật độc giả thành công', updatedDocGia });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Cập nhật độc giả thất bại', error });
        }
    }

    async deleteDocGia(req, res) {
        try {
            const DocGiaId = Number(req.params.MaDocGia);
            const findDocGia = await DocGiaModel.findOne({ MaDocGia: DocGiaId });

            if (!findDocGia) {
                res.status(404).json({ success: false, message: `Không tìm thấy độc giả có mã ${DocGiaId}` });
            }
            const deletedDocGia = await DocGiaModel.findByIdAndDelete(findDocGia._id);
            res.status(200).json({ success: true, message: 'Xóa độc giả thành công', deletedDocGia });
        } catch (error) {
            res.status(500).json({ success: false, message: 'Xóa độc giả thất bại', error });
        }
    }
}

module.exports = new DocGiaController();