<script setup>
    import SachService from '@/services/Sach.service';
    import { onMounted, reactive } from 'vue';
    import { useRouter } from "vue-router";
    const router = useRouter();

    const state = reactive({
        listSach: [],
        selectedSach: null,
    });

    const getListSach = async () => {
        try {
            const listSach = await SachService.getAllSach();
            console.log(listSach);
            state.listSach = listSach.listSach;
        } catch (e) {
            console.log(e);
        }
    }

    const goToAddSach = () => {
        router.push({ name: "sach.add" });
    }
    
    const goToEditSach = (sach) => {
        router.push(`/sua-sach/${sach.MaSach}`);
    }

    const goToAddPhieuTheoDoi = (sach) => {
        router.push(`/them-phieu-theo-doi/${sach.MaSach}`);
    }

    onMounted(() => {
        getListSach();
    });

    const deleteSach = async (sach) => {
        try {
            await SachService.deleteSach(sach.MaSach);
            await getListSach();
        } catch (error) {
            console.error("Lỗi khi xóa sách:", error);
        }
    };
</script>

<template>
    <div class="container">
        <div class="row">
            <div class="mb-3">
                <li class="d-flex  flex-column">
                    <a class="dropdown-item btn btn-primary " @click="goToAddSach()">
                        <i class="fa fa-plus"></i> Add book
                    </a>
                </li>
            </div>
        </div>
        <div class="col-md-12">
            <div>
                <!-- <div id="<?= $this->e($category->name) ?>" class="card-header">
                    <h2><?= $this->e($category->name) ?></h2>
                </div> -->
                <div class="card-body">
                    <div class="row">
                        <div class="col-md-3  align-items-center  p-3 bg-light border border-info rounded "  v-for="(sach, index) in state.listSach" :key="index">
                            <div class="card-body">
                                <a class="text-dark" :href="sach.MaSach">
                                    <img  class=" col-sm-10 container d-flex " height="200" :src="sach.HinhSach" alt="Sach {{ sach.MaSach }}">
                                    <h6 class="mt-1 mb-3" style="height: 25px">{{ sach.TenSach }}</h6>
                                    <p class="m-0">{{ sach.TacGia }}</p>
                                    <p class="m-0 my-1" >{{ sach.DonGia }}</p>
                                    <p class="m-0">Số lượng: {{ sach.SoQuyen }}</p>
                                </a>
                                <div >
                                    <button class="btn btn-danger w-100" @click="goToAddPhieuTheoDoi(sach)">
                                        <i class="fas fa-wallet "></i> Mượn sách
                                    </button>
                                    <div>
                                        <button class="btn border border-warning text-danger w-100" name="delete-book" @click="goToEditSach(sach)">
                                            <i class="fas fa-pencil-alt"></i> Edit
                                        </button>
                                        <button class="btn border border-warning text-danger w-100" name="delete-book" @click="deleteSach(sach)">
                                            <i alt="Delete" class="fa fa-trash"></i> Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>