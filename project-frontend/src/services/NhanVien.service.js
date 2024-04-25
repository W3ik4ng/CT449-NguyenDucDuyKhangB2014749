import createApiClient from './api.service';

class NhanVienService {
    constructor(baseUrl = '/api/nhan-vien') {
        this.api = createApiClient(baseUrl);
    }
    async NhanVienDnhap(data) {
        return (await this.api.post('/dang-nhap', data)).data;
    }
    async NhanVienDKy(data) {
        return (await this.api.post('/dang-ky', data)).data;
    }

    async NhanVienDXuat(data) {
        return (await this.api.post('/dang-xuat', data)).data;
    }
}
export default new NhanVienService();