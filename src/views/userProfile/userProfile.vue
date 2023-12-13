<template>
    <Breadcrumbs title="Profile" main="Users" />
    <div class="container-fluid">
        <div class="edit-profile">
            <div class="row">
                <profilePage />
                <infoProfile />
            </div>
        </div>
</div>
</template>
<script>
import profilePage from './profilePage.vue';
import infoProfile from "./infoProfile.vue"
import store from '../../store';
export default {
    beforeRouteEnter(to, from, next) {
        store.dispatch("userconfig/config");
        next();
    },
    components: {
        profilePage,
        infoProfile
    }
}
</script>