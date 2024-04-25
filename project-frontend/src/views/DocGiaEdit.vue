<template>
    <div class="background py-3">
      <div class="container bg-white px-5 py-2">
        <h2 class="form-title">CẬP NHẬT THÔNG TIN</h2>
        <form @submit.prevent="updateDocGia">
          <div class="form-group">
            <label for="HoLot">Họ lót:</label>
            <input
              type="text"
              class="form-control"
              id="HoLot"
              :value="DocGia.HoLot"
              @input="DocGia.HoLot = $event.target.value"
              required
            />
          </div>
          <div class="form-group">
            <label for="Ten">Tên:</label>
            <input
              type="text"
              class="form-control"
              id="Ten"
              :value="DocGia.Ten"
              @input="DocGia.Ten = $event.target.value"
              required
            />
          </div>
          <div class="form-group">
            <label for="Phai">Phái:</label>
            <input
              type="text"
              class="form-control"
              id="Phai"
              :value="DocGia.Phai"
              @input="DocGia.Phai = $event.target.value"
              required
            />
          </div>
          <div class="form-group">
            <label for="DiaChi">Địa chỉ:</label>
            <input
              type="text"
              class="form-control"
              id="DiaChi"
              :value="DocGia.DiaChi"
              @input="DocGia.DiaChi = $event.target.value"
              required
            />
          </div>
          <div class="form-group">
            <label for="DienThoai">Số điện thoại:</label>
            <input
              type="text"
              class="form-control"
              id="DienThoai"
              :value="DocGia.DienThoai"
              @input="DocGia.DienThoai = $event.target.value"
              required
            />
          </div>
          <!-- Các trường thông tin khác tương tự -->
          <button type="submit" class="btn btn-primary">Xác nhận</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import DocGiaService from "@/services/DocGia.service";
  import { useRoute } from "vue-router";
  import { useRouter } from "vue-router";
  import Swal from "sweetalert2";
  
  const route = useRoute();
  const DocGiaId = route.params.MaDocGia;
  const router = useRouter();
  
  const DocGiaOriginal = ref({
    HoLot: "",
    Ten: "",
    Phai: "",
    NgaySinh: "",
    DiaChi: "",
    DienThoai: "",
  });
  
  const DocGia = ref({ ...DocGiaOriginal.value });
  
  const getDocGiaById = async (id) => {
    try {
      const response = await DocGiaService.getOneDocGia(id);
      const docGiaData = response.findDocGia;

      // Format the NgaySinh date string
      const formattedDate = new Date(docGiaData.NgaySinh).toISOString().split('T')[0];

      // Assign formatted date to DocGiaOriginal
      DocGiaOriginal.value.NgaySinh = formattedDate;

      // Assign data to DocGiaOriginal
      for (const key in docGiaData) {
        if (DocGiaOriginal.value.hasOwnProperty(key)) {
          DocGiaOriginal.value[key] = docGiaData[key];
        }
      }

      // Assign DocGiaOriginal to DocGia
      Object.assign(DocGia.value, DocGiaOriginal.value);
    } catch (error) {
      console.error("Lỗi khi lấy thông tin độc giả:", error);
    }
  };

  
  const updateDocGia = async () => {
    try {
      const updatedFields = { ...DocGia.value };

      console.log("DocGiaOriginal.value.MaDocGia", DocGiaId);
      await DocGiaService.updateDocGia(DocGiaId, updatedFields);
  
      Swal.fire({
        icon: "success",
        title: "Cập nhật thành công",
        showConfirmButton: false,
        timer: 1500, // Thời gian hiển thị thông báo
      });
  
      router.push("/danh-sach-doc-gia");
    } catch (error) {
      console.error("Lỗi khi cập nhật độc giả:", error);
    }
  };
  
  onMounted(() => {
    Object.assign(DocGia.value, DocGiaOriginal.value);
    getDocGiaById(DocGiaId);
  });
  </script>
  