<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 offset-md-2">

                <!-- FLASH MESSAGES -->

                <div class="card mt-3">
                    <div class="card-header font-weight-bold text-uppercase">Login</div>
                    <div class="card-body">

                        <form class="needs-validation login-form p-2" @submit.prevent="login" novalidate>

                            <div class="form-group row">
                                <label>Số điện thoại</label>
                                <input v-model="SoDienThoai" type="text" class="form-control" required />
                                <div class="invalid-feedback">Số điện thoại chưa đúng</div>
                            </div>

                            <div class="form-group row">
                                <label>Mật khẩu</label>
                                <input v-model="Password" type="password" class="form-control" required />
                            </div>

                            <div class="form-group row">
                                <button class="btn btn-primary mx-auto" type="submit">Đăng Nhập</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
(function () {
    'use strict';
    window.addEventListener(
        'load',
        function () {
            var forms = document.getElementsByClassName('needs-validation');
            var validation = Array.prototype.filter.call(forms, function (form) {
                form.addEventListener(
                    'submit',
                    function (event) {
                        if (form.checkValidity() === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        form.classList.add('was-validated');
                    },
                    false,
                );
            });
        },
        false,
    );
})();

import NhanVienService from "@/services/NhanVien.service.js";

export default {
    data() {
        return {
            SoDienThoai: '',
            Password: '',
        };
    },
    methods: {
        async login() {
            try {
                const userData = {
                    SoDienThoai: this.SoDienThoai,
                    Password: this.Password,
                };
                console.log('userData', userData);
                // Gọi hàm đăng nhập từ service
                const result = await NhanVienService.NhanVienDnhap(userData);
                console.log('result', result);
                console.log('result', result.checkNhanVien);
                // Xử lý kết quả từ backend (result)

                if (result.success == true) {
                    this.$router.push('/');
                }
            } catch (error) {
                // Xử lý lỗi nếu có
                console.error('Error during login:', error);
            }
        },
    },
};
</script>