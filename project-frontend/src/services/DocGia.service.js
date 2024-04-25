import createApiClient from './api.service';
class DocGiaService {
    constructor(baseUrl = '/api/doc-gia') {
        this.api = createApiClient(baseUrl);
    }
    async getAllDocGia() {
        return (await this.api.get('/tat-ca-doc-gia')).data;
    }
    async getOneDocGia(MaDocGia) {
            return (await this.api.get(`/lay-doc-gia/${MaDocGia}`)).data;
        }
    async addDocGia(data) {
        return (await this.api.post('/them-doc-gia', data)).data;
    }
    async deleteDocGia(MaDocGia) {
        return (await this.api.delete(`/xoa-doc-gia/${MaDocGia}`)).data;
    }
    async updateDocGia(MaDocGia, data) {
        return (await this.api.put(`/sua-doc-gia/${MaDocGia}`, data)).data;
    }
    
}
export default new DocGiaService();