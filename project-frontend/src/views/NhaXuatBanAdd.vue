<template>
    <div class="background py-3">
      <div class="container bg-white px-5 py-2">
        <h2 class="form-title">THÊM NHÀ XUẤT BẢN</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="tenNXB">Tên nhà xuất bản:</label>
            <input
              type="text"
              class="form-control"
              id="tenNXB"
              v-model="newPublisher.TenNXB"
              required
            />
            <div v-if="errors.tenNXB" class="error-message">{{ errors.tenNXB }}</div>
          </div>
          <div class="form-group">
            <label for="diaChi">Địa chỉ:</label>
            <input
              type="text"
              class="form-control"
              id="diaChi"
              v-model="newPublisher.DiaChi"
              required
            />
            <div v-if="errors.diaChi" class="error-message">{{ errors.diaChi }}</div>
          </div>
          <button type="submit" class="btn btn-primary">Thêm</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import NhaXuatBanService from "@/services/NhaXuatBan.service";
  import { ref, reactive } from "vue";
  import { useRouter } from "vue-router";
  
  const router = useRouter();
  
  const newPublisher = reactive({
    TenNXB: "",
    DiaChi: "",
  });
  
  const errors = reactive({
    tenNXB: "",
    diaChi: "",
  });
  
  const submitForm = async () => {
    // Reset errors
    Object.keys(errors).forEach((key) => {
      errors[key] = "";
    });
  
    // Validate form
    let isValid = true;
    if (!newPublisher.TenNXB) {
      errors.tenNXB = "Tên Nhà Xuất Bản không được để trống";
      isValid = false;
    }
    if (!newPublisher.DiaChi) {
      errors.diaChi = "Địa Chỉ không được để trống";
      isValid = false;
    }
  
    if (isValid) {
      try {
        await NhaXuatBanService.addNXB(newPublisher);
        router.push({name: "nha-xuat-ban"}); // Chuyển hướng về trang danh sách nhà xuất bản sau khi thêm thành công
      } catch (error) {
        console.error("Lỗi khi thêm nhà xuất bản mới:", error);
      }
    }
  };
  </script>
  
  <style scoped>
  .error-message {
    color: red;
    font-size: 14px;
    margin-top: 5px;
  }
  </style>
  