<script setup>
import TheoDoiMuonSachService from "@/services/TheoDoiMuonSach.service";
import SachService from "@/services/Sach.service";
import DocGiaService from "@/services/DocGia.service";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { ref } from "vue";

import { useRouter } from "vue-router"; // Import useRouter từ vue-router
const router = useRouter(); // Sử dụng useRouter để khởi tạo router
const route = useRoute();

const state = reactive({
  listPhieuTheoDoi: [],
  selectedPhieuTheoDoi: null,
});

// Khai báo mảng chứa danh sách các phiếu mượn
const listPhieuTheoDoiFormatted = ref([]);

const getListPhieuTheoDoi = async () => {
  try {
    const listPhieuMuon =
      await TheoDoiMuonSachService.layPhieuTheoDoi();
      console.log("listPhieuMuon: ",listPhieuMuon);
      listPhieuTheoDoiFormatted.value = await Promise.all(
      listPhieuMuon.listTheoDoiMuonSach.map( async (PhieuMuon) => {
        console.log("PhieuMuon.MaSach ", PhieuMuon.MaSach);
        console.log("PhieuMuon.MaDocGia ", PhieuMuon.MaDocGia);

        // Call laySachByMaSach from SachService and await for the promise to be resolved
        const sach = await SachService.getOneSach(PhieuMuon.MaSach);
        const docGia = await DocGiaService.getOneDocGia(PhieuMuon.MaDocGia);

        console.log("Sach: ", sach);
        console.log("docGia: ", docGia);

        // Return a new object with TenSach added
        return {
          MaDocGia: PhieuMuon.MaDocGia,
          MaSach: PhieuMuon.MaSach,
          NgayMuon: formatDate(PhieuMuon.NgayMuon),
          NgayTra: formatDate(PhieuMuon.NgayTra),
          TenSach: sach.findSach.TenSach,
          Ten: docGia.findDocGia.Ten,
          HoLot: docGia.findDocGia.HoLot
        };
      })
    );
    console.log("listPhieuMuonFormatted", listPhieuMuonFormatted);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getListPhieuTheoDoi();
});


const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString(); // hoặc sử dụng thư viện như moment.js để định dạng lại ngày tháng
};

</script>

<template>
    <div class="background pb-5 py-3">
            <div class="container py-2">
                <h3 class="mb-3 pt-2 head-title">Danh Sách Phiếu Theo Dõi</h3>
                <table class="table table-striped table-bordered text-center">
                    <thead>
                        <tr>
                            <th scope="col">Mã Độc Giả</th>
                            <th scope="col">Mã Sách</th>
                            <th scope="col">Ngày Mượn</th>
                            <th scope="col">Ngày Trả</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(phieuMuon, index) in listPhieuTheoDoiFormatted" :key="index"
                        >
                            <td>{{ phieuMuon.HoLot }} {{ phieuMuon.Ten }}</td>
                            <td>{{ phieuMuon.TenSach }}</td>
                            <td>{{ phieuMuon.NgayMuon }}</td>
                            <td>{{ phieuMuon.NgayTra }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
</template>