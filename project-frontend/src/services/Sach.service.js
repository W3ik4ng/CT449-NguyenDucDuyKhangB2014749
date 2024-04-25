import createApiClient from './api.service';

class SachService {
    constructor(baseUrl = '/api/sach') {
        this.api  = createApiClient(baseUrl);
    }

    async getAllSach() {
        return (await this.api.get('/tat-ca-sach')).data;
    }

    async getOneSach(MaSach) {
        return (await this.api.get(`/lay-sach/${MaSach}`)).data;
    }

    async addSach(data) {
        return (await this.api.post('/them-sach', data)).data;
    }

    async updateSach(MaSach, data) {
        return (await this.api.put(`/sua-sach/${MaSach}`, data)).data;
    }

    async deleteSach(MaSach) {
        return (await this.api.delete(`/xoa-sach/${MaSach}`)).data;
    }
}

export default new SachService();
