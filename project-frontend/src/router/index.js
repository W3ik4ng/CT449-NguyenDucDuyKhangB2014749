import { createWebHistory, createRouter } from "vue-router";

import HomeView from "../views/HomeView.vue";
import SachAdd from "@/views/SachAdd.vue";
import SachEdit from "@/views/SachEdit.vue";

import DocGiaView from "@/views/DocGiaView.vue";
import DocGiaAdd from "@/views/DocGiaAdd.vue";
import DocGiaEdit from "@/views/DocGiaEdit.vue";

import NhaXuatBanView from "@/views/NhaXuatBanView.vue"
import NhaXuatBanAdd from "@/views/NhaXuatBanAdd.vue";
import NhaXuatBanEdit from "@/views/NhaXuatBanEdit.vue";

import TheoDoiMuonSachView from "@/views/TheoDoiMuonSachView.vue"
import TheoDoiMuonSachAdd from "@/views/TheoDoiMuonSachAdd.vue"

import LoginView from "@/views/LoginView.vue";



const routes = [
    {
        path: "/",
        name: "home",
        component: HomeView,
    },
    {
        path: "/them-sach",
        name: "sach.add",
        component: SachAdd
    },
    {
        path: "/sua-sach/:MaSach",
        name: "sach.edit",
        component: SachEdit
    },
    {
        path: '/danh-sach-doc-gia',
        name: 'doc-gia',
        component: DocGiaView,
    },
    {
        path: '/them-doc-gia',
        name: 'doc-gia.add',
        component: DocGiaAdd
    },
    {
        path: '/sua-doc-gia/:MaDocGia',
        name: 'doc-gia.edit',
        component: DocGiaEdit
    },
    {
        path: '/danh-sach-nha-xuat-ban',
        name: 'nha-xuat-ban',
        component: NhaXuatBanView,
    },
    {
        path: '/them-nha-xuat-ban',
        name:'nha-xuat-ban.add',
        component: NhaXuatBanAdd
    },
    {
        path: '/sua-nha-xuat-ban/:MaNXB',
        name:'nha-xuat-ban.edit',
        component: NhaXuatBanEdit
    },
    {
        path: '/danh-sach-phieu-theo-doi',
        name: 'phieu-theo-doi',
        component: TheoDoiMuonSachView,
    },
    {
        path: '/them-phieu-theo-doi/:MaSach',
        name: 'phieu-theo-doi.add',
        component: TheoDoiMuonSachAdd
    },
    {
        path: '/nhan-vien-dang-nhap',
        name: 'dang-nhap',
        component: LoginView
    }

];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;