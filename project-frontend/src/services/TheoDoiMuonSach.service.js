import createApiClient from './api.service';
class TheoDoiMuonSachService {
    constructor(baseUrl = '/api/phieu-theo-doi') {
        this.api = createApiClient(baseUrl);
    }
    async layPhieuTheoDoi() {
        return (await this.api.get('/tat-ca-phieu-theo-doi')).data;
    }
    async themPhieuTheoDoi(data) {
        return (await this.api.post('/them-phieu-theo-doi', data)).data;
    }

}
export default new TheoDoiMuonSachService();