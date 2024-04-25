<script setup>
import DocGiaService from "@/services/DocGia.service";
import { onMounted, reactive } from "vue";
import { useRouter } from 'vue-router';
const router = useRouter();

const state = reactive({
  listDocGia: [],
  selectedDocGia: null,
});

const getListDocGia = async () => {
  try {
    const listDocGia = await DocGiaService.getAllDocGia();
    state.listDocGia = listDocGia.listDocGia;
    // console.log("listDocGia.listDocGia", listDocGia.listDocGia);
    // console.log("state.listDocGia", state.listDocGia);
  } catch (error) {
    console.log(error);
  }
};

onMounted(() => {
  getListDocGia();
});

const goToAddDocGiaForm = () => {
  router.push({name: "doc-gia.add"});
};

const editDocGia = (DocGia) => {
  console.log(DocGia.MaDocGia)
  router.push(`/sua-doc-gia/${DocGia.MaDocGia}`);
};

const deleteDocGia = async (DocGia) => {
  try {
    await DocGiaService.deleteDocGia(DocGia.MaDocGia);
    getListDocGia();
  } catch (error) {
    console.error("Lỗi khi xóa độc giả:", error);
  }
};

</script>

<template>
    <div class="background pb-5 py-3">
            <div class="container py-2">
                <h3 class="mb-3 pt-2 head-title">Danh Sách Độc giả</h3>
                <table class="table table-striped table-bordered text-center">
                    <thead>
                        <tr>
                            <th scope="col">Họ và Tên</th>
                            <th scope="col">Ngày Sinh</th>
                            <th scope="col">Phái</th>
                            <th scope="col">Số Điện Thoại</th>
                            <th scope="col">Địa Chỉ</th>
                            <th scope="col">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(docGia, index) in state.listDocGia" :key="index"
                        >
                            <td>{{ docGia.HoLot }} {{ docGia.Ten }}</td>
                            <td>{{ docGia.NgaySinh }}</td>
                            <td>{{ docGia.Phai }}</td>
                            <td>{{ docGia.DienThoai }}</td>
                            <td>{{ docGia.DiaChi }}</td>
                            <td>
                                <button class="btn btn-warning" @click="editDocGia(docGia)">Sửa
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                &nbsp;
                                <button class="btn btn-danger" @click="deleteDocGia(docGia)">Xóa
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot class="align-content-center">
                        <td colspan="6">
                            <button class="btn btn-success" @click="goToAddDocGiaForm()">Thêm một độc giả mới
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </td>
                    </tfoot>
                </table>
            </div>
        </div>
</template>