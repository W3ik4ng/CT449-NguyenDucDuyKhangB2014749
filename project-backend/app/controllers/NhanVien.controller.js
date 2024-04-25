const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const NhanVienModel = require('../models/NhanVien.model');
const ApiError = require('../api-error');
const { setBlacklist } = require('../../middleware/middleware');

class NhanVienController {
    async NhanVienDKy(req, res, next) {
        const { HoTenNV, Password, ChucVu, DiaChi, SoDienThoai } = req.body;

        if (!HoTenNV || !Password || !ChucVu || !DiaChi || !SoDienThoai) {
            return res.json({ success: false, message: 'Thông tin chưa đầy đủ' });
        }
        try {
            const latestNhanVien = await NhanVienModel.findOne().sort({ MSNV: -1 });
            let newMSNV;
            if (latestNhanVien) {
                newMSNV = latestNhanVien.MSNV + 1;
            } else {
                newMSNV = 1;
            }

            const hashedPassword = await bcrypt.hash(Password, 10);
            const newNhanVien = new NhanVienModel({
                MSNV: newMSNV,
                HoTenNV,
                Password: hashedPassword,
                ChucVu,
                DiaChi,
                SoDienThoai,
            });
            const resultNhanVien = await newNhanVien.save();
            res.json({ success: true, message: 'Nhân viên đăng ký thành công', resultNhanVien });
        } catch (error) {
            console.log(error);
            return next(new ApiError(500, 'Đăng ký thất bại'));
        }
    }

    async NhanVienDNhap(req, res, next) {
        const { SoDienThoai, Password } = req.body;
        if (!SoDienThoai || !Password) {
            return next(new ApiError(400, 'Thiếu số điện thoại hay mật khẩu'));
        }
        try {
            const checkNhanVien = await NhanVienModel.findOne({ SoDienThoai });
            if (!checkNhanVien) {
                return next(new ApiError(400, 'Người dùng không tồn tại'));
            }
            const validPassword = await bcrypt.compare(Password, checkNhanVien.Password);
            if (!validPassword) {
                return next(new ApiError(400, 'Mật khẩu chưa đúng'));
            }
            if (checkNhanVien && validPassword) {
                const accessToken = jwt.sign(
                    {
                        userId: checkNhanVien.MSNV,
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                );
                console.log(accessToken);
                return res.status(200).json({ success: true, message: 'Đăng nhập thành công', checkNhanVien, accessToken });
            }
        } catch (error) {
            console.log(error);
            return next(new ApiError(500, 'Đăng nhập thất bại'));
        }
    }
    async NhanVienDXuat(req, res) {
        try {
            const token = req.headers.token.split(' ')[1];
            console.log('token', token);
            setBlacklist(token);
            return res.status(200).json({ success: true, message: 'Đăng xuất thành công' });
        } catch (error) {
            return res.status(500).json({ success: false, message: 'Đăng xuất thất bại', error });
        }
    }
}

module.exports = new NhanVienController();