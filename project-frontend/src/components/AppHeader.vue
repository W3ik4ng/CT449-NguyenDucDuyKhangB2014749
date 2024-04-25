<script>
import InputSearch from './InputSearch.vue';
import AppHeaderList from './AppHeaderList.vue';

export default {
    components: {
        InputSearch,
        AppHeaderList
    }
}
</script>

<template>
    <nav class="nav-primary navbar navbar-expand-md sticky-top navbar-light bg-light">
            <a href="/">
                <!-- <img class="img-fluid" width="100" height="100" src="https://i.imgur.com/KfPUqlK.jpeg" alt="logo"> -->
            </a>
        <div class="collapse navbar-collapse" id="app-navbar-collapse">
            <div class="navbar-nav">
                &nbsp;
            </div>

            <ul class="navbar-nav ml-auto">
                <li class="nav-item">
                    <InputSearch />
                </li>
                <AppHeaderList/>
            </ul>
        </div>
    </nav>
</template>

