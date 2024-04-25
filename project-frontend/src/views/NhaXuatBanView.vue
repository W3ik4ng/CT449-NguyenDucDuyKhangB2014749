<script setup>
import NhaXuatBanService from "@/services/NhaXuatBan.service";
import { onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

const state = reactive({
  listNXB: [],
  selectedNXB: null,
});

const getListNXB = async () => {
  try {
    const listNXB = await NhaXuatBanService.getAllNXB();
    console.log("listNXB", listNXB);
    state.listNXB = listNXB.listNhaXuatBan;
    console.log("state.listNXB", state.listNXB);
    // console.log("state.listNXB[0]", state.listNXB[2]);
    // console.log("state.listNXB[1]", state.listNXB[1]);
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  getListNXB();
});

const deleteNXB = async (nxb) => {
  try {
    await NhaXuatBanService.deleteNXB(nxb.MaNXB);
    // Sau khi xóa thành công, cập nhật lại danh sách nhà xuất bản
    getListNXB();
  } catch (error) {
    console.error("Lỗi khi xóa nhà xuất bản:", error);
  }
};

const goToAddNXBForm = () => {
  router.push({name: "nha-xuat-ban.add"});
};

const goToEditNXBForm = (nhaXuatBan) => {
  router.push(`/sua-nha-xuat-ban/${nhaXuatBan.MaNXB}`);
};
</script>

<template>
    <div class="background pb-5 py-3">
            <div class="container py-2">
                <h3 class="mb-3 pt-2 head-title">Danh Sách Nhà Xuất Bản</h3>
                <table class="table table-striped table-bordered text-center">
                    <thead>
                        <tr>
                            <th scope="col">Tên Nhà Xuất Bản</th>
                            <th scope="col">Địa Chỉ</th>
                            <th scope="col">Thao Tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="(nhaXuatBan, index) in state.listNXB" :key="index"
                        >
                            <td>{{ nhaXuatBan.TenNXB }}</td>
                            <td>{{ nhaXuatBan.DiaChi }}</td>
                            <td>
                                <button class="btn btn-warning" @click="goToEditNXBForm(nhaXuatBan)">Sửa
                                    <i class="fa-solid fa-pen-to-square"></i>
                                </button>
                                &nbsp;
                                <button class="btn btn-danger" @click="deleteNXB(nhaXuatBan)">Xóa
                                    <i class="fa-solid fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot class="align-content-center">
                        <td colspan="3">
                            <button class="btn btn-success" @click="goToAddNXBForm()">Thêm một nhà xuất bản mới
                                <i class="fa-solid fa-plus"></i>
                            </button>
                        </td>
                    </tfoot>
                </table>
            </div>
        </div>
</template>