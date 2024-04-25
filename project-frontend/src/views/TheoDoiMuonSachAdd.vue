<template>
    <div class="background py-3">
      <div class="container bg-white px-5 py-2">
        <h2 class="form-title">THÊM PHIẾU MƯỢN</h2>
        <form @submit.prevent="addPhieuMuon">
          <div class="form-group">
            <label for="MaDocGia">Mã Độc Giả:</label>
            <select
              v-model="PhieuMuon.MaDocGia"
              class="form-control"
              id="MaDocGia"
              required
            >
              <option v-for="docGia in docGias" :value="docGia.MaDocGia">
                {{ docGia.HoLot }}{{ docGia.Ten }}
                {{ console.log('Dữ liệu sach:', docGia) }}
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="NgayMuon">Ngày mượn:</label>
            <input
              type="date"
              class="form-control"
              id="NgayMuon"
              v-model="PhieuMuon.NgayMuon"
              required
            />
          </div>
          <div class="form-group">
            <label for="NgayTra">Ngày trả:</label>
            <input
              type="date"
              class="form-control"
              id="NgayTra"
              v-model="PhieuMuon.NgayTra"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Xác nhận</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import TheoDoiMuonSachService from "@/services/TheoDoiMuonSach.service";
  import DocGiaService from "@/services/DocGia.service";
  
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import { useRouter } from "vue-router";
  
  const route = useRoute();
  const router = useRouter();
  const SachId = route.params.MaSach;
  
  const docGias = ref([]);
  
  onMounted(async () => {
    try {
      // Lấy danh sách các quyển sách từ API 
      const listDocGia = await DocGiaService.getAllDocGia(); 
      console.log(listDocGia);   
      docGias.value = listDocGia.listDocGia;
      console.log("docGias.value", docGias.value)
    } catch (error) {
      console.error("Lỗi khi lấy danh sách sách:", error);
    }
  });
  
  const PhieuMuon = ref({
    MaDocGia: "",
    MaSach: SachId,
    NgayMuon: "",
    NgayTra: "",
  });
  
  console.log("PhieuMuon", PhieuMuon);
  const addPhieuMuon = async () => {
    try {
      await TheoDoiMuonSachService.themPhieuTheoDoi(PhieuMuon.value);
      console.log("Phiếu mượn: ", PhieuMuon.value);
      router.push("/"); 
    } catch (error) {
      console.error("Lỗi khi thêm phiếu mượn:", error);
    }
  };
  </script>
  
  <style scoped>
  .app-container {
    max-width: 800px;
    margin: auto;
  }

  
  .form-title {
    text-align: center; /* Căn giữa tiêu đề */
    margin-bottom: 20px; /* Khoảng cách dưới tiêu đề */
  }
  </style>
  