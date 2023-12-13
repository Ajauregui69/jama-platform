<template>
    <div class="col-xl-4">
        <div class="card">
            <div class="card-header ">
                <h4 class="card-title mb-0">My Profile</h4>
                <div class="card-options"><a class="card-options-collapse" href="javascript:void(0)"
                        data-bs-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a><a class="card-options-remove"
                        href="javascript:void(0)" data-bs-toggle="card-remove"><i class="fe fe-x"></i></a></div>
            </div>
            <div class="card-body">
                <div class="row mb-2">
                    <div class="profile-title">
                        <div class="media">
                            <img class="image-p rounded-circle" :src="user.user_image" alt="" />
                            <div class="media-body">

                                <router-link to="/users/profile">
                                    <h5 class="mb-1 ">{{ user.company_user_name }} {{ user.last_name }}</h5>
                                </router-link>
                                <p>{{ user.role }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <h6 class="form-label">Bio</h6>
                    <label v-if="userconfig.bio == false" class="font-roboto text-muted">My biography</label>
                    <label v-else class="form-control-plaintext ">{{ userconfig.bio }}</label>

                </div>
                <div class="mb-3">
                    <h6 class="form-label">Linkdln</h6>
                    <label v-if="userconfig.linkedin == false" class="font-roboto text-muted"> https://www.linkedin.com/in</label>
                    <label v-else class="form-control-plaintext">{{ userconfig.linkedin }}</label>
                </div>
                <div class="mb-3">
                    <h6 class="form-label">Twitter</h6>
                    <label v-if="userconfig.twitter == false" class="font-roboto text-muted"> https://www.twitter.com/</label>
                    <label v-else class="form-control-plaintext">{{ userconfig.twitter }}</label>
                </div>
                <div class="mb-3">
                    <h6 class="form-label">Github</h6>
                    <label v-if="userconfig.github == false" class="font-roboto text-muted"> https://www.github.com/</label>
                    <label v-else class="form-control-plaintext">{{ userconfig.github }}</label>
                </div>
            </div>
        </div>
    </div>
</template>
    
<script>
import axios from 'axios';
import { useStore } from "vuex";
import store from "../../store/index";
import { mapState, mapMutations, mapActions } from 'vuex';
import { reactive, watch } from "vue";

export default {

    computed: {
        ...mapState({
            user: (state) => state.user.profile,
            userconfig: (state) => state.userconfig.config

        }),

    },
};
</script>
    
<style scoped>
.image-p {
    width: 70px;
    height: 70px;
    object-fit: cover;

}
</style>