import createApiClient from './api.service';
class NhaXuatBanService {
    constructor(baseUrl = '/api/nha-xuat-ban') {
        this.api = createApiClient(baseUrl);
    }
    async getAllNXB() {
        return (await this.api.get('/tat-ca-nxb')).data;
    }
    async getOneNXB(MaNXB) {
        return (await this.api.get(`/lay-nxb/${MaNXB}`)).data;
    }
    async addNXB(data) {
        return (await this.api.post('/them-nxb', data)).data;
    }
    async deleteNXB(MaNXB) {
        return (await this.api.delete(`/xoa-nxb/${MaNXB}`)).data;
    }
    async updateNXB(MaNXB, data) {
        return (await this.api.put(`/sua-nxb/${MaNXB}`, data)).data;
    }
    
}
export default new NhaXuatBanService();