<script setup>
import { useRouter } from "vue-router";
const router = useRouter();

const goToHome = () => {
    router.push({ name: "home" });
}

const goToDocGia = () => {
    router.push({ name: "doc-gia" });
}

const goToNhaXuatBan = () => {
    router.push({ name: "nha-xuat-ban" });
}

const goToTheoDoiMuonSach = () => {
    router.push({ name: "phieu-theo-doi" });
}

const goToDangNhap = () => {
    router.push({ name: "dang-nhap" });
}

</script>

<template>
    <li class="nav-item">
                    <a class="nav-link btn btn-gray" @click="goToHome()">
                        <i class="fas fa-book"></i> Sách
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link btn btn-gray" @click="goToNhaXuatBan()">
                        <i class="fa-solid fa-building"></i> Nhà xuất bản
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link btn btn-gray" @click="goToDocGia()">
                        <i class="fa-solid fa-user"></i> Độc Giả
                    </a>
                </li>

                <li class="nav-item">
                    <a class="nav-link btn btn-gray" @click="goToTheoDoiMuonSach()">
                        <i class="fa-solid fa-id-card"></i> Thẻ mượn sách
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link btn btn-gray" @click="goToDangNhap()">
                        <i class="fa-solid fa-sign-in"></i> Đăng nhập
                    </a>
                </li>
</template>