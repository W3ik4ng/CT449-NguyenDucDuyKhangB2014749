<template>
    <div class="background py-3">
      <div class="container bg-white px-5 py-2">
        <h2 class="form-title">THÔNG TIN ĐỘC GIẢ</h2>
        <form @submit.prevent="addDocGia">
          <div class="form-group">
            <label for="HoLot">Họ lót:</label>
            <input
              type="text"
              class="form-control"
              id="HoLot"
              v-model="DocGia.HoLot"
              required
            />
          </div>
          <div class="form-group">
            <label for="Ten">Tên:</label>
            <input
              type="text"
              class="form-control"
              id="Ten"
              v-model="DocGia.Ten"
              required
            />
          </div>
          <div class="form-group">
            <label for="Phai">Phái:</label>
            <select class="form-control" id="Phai" v-model="DocGia.Phai" required>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          <div class="form-group">
            <label for="DiaChi">Địa chỉ:</label>
            <input
              type="text"
              class="form-control"
              id="DiaChi"
              v-model="DocGia.DiaChi"
              required
            />
          </div>
          <div class="form-group">
            <label for="NgaySinh">Ngày sinh:</label>
            <input
              type="date"
              class="form-control"
              id="NgaySinh"
              v-model="DocGia.NgaySinh"
              required
            />
          </div>
          <div class="form-group">
            <label for="soDienThoai">Số điện thoại:</label>
            <input
              type="tel"
              class="form-control"
              id="DienThoai"
              v-model="DocGia.DienThoai"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary">Xác nhận</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import DocGiaService from "@/services/DocGia.service";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  const DocGia = ref({
    HoLot: "",
    Ten: "",
    Phai: "",
    NgaySinh: "",
    DiaChi: "",
    DienThoai: null,
  });
  
  const addDocGia = async () => {
    try {
      await DocGiaService.addDocGia(DocGia.value);
      console.log("Độc giả : ", DocGia.value);
      router.push("/danh-sach-doc-gia")
    } catch (error) {
      console.error("Lỗi khi thêm độc giả:", error);
    }
  };
  </script>
  
