<template>
    <div class="col-xl-8">
        <form class="card">
            <div class="card-header ">
                <h4 class="card-title mb-0">Profile</h4>
            </div>
            <div class="card-body">
                <div class="row">
                    <!-- <div class="col-sm-6 col-md-4">
                        <div class="mb-4">
                            <h6 class="form-label">Username</h6>
                            <label class="form-control-plaintext">{{ username }}</label>
                        </div>
                    </div> -->
                    <div class="col-sm-6 col-md-6">
                        <div class="mb-4">
                            <h6 class="form-label">First Name</h6>
                            <label class="form-control-plaintext">{{ user.company_user_name }}</label>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-6">
                        <div class="mb-4">
                            <h6 class="form-label">Last Name</h6>
                            <label class="form-control-plaintext">{{ user.last_name }}</label>
                        </div>
                    </div>

                    <div class="col-sm-6 col-md-4">
                        <div class="mb-4">
                            <h6 class="form-label">City</h6>
                            <label v-if="userconfig.city == false" class="font-roboto text-muted"> Your city </label>
                            <label v-else class="form-control-plaintext">{{ userconfig.city }}</label>                        </div>
                    </div>
                    <div class="col-sm-6 col-md-4">
                        <div class="mb-4">
                            <h6 class="form-label">Postal Code</h6>
                            <label v-if="userconfig.postal_code == 0" class="font-roboto text-muted"> Your postal code </label>
                            <label v-else class="form-control-plaintext">{{ userconfig.postal_code }}</label>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-4">
                        <div class="mb-4">
                            <h6 class="form-label">Country</h6>
                            <label v-if="userconfig.city == false" class="font-roboto text-muted"> Your country </label>
                            <label v-else class="form-control-plaintext">{{ userconfig.city }}</label>                        </div>
                    </div>
                    <div class="col-sm-6 col-md-12">
                        <div class="mb-4">
                            <h6 class="form-label">Address</h6>
                            <label v-if="userconfig.home_addres == false" class="font-roboto text-muted"> Your company address </label>
                            <label v-else class="form-control-plaintext">{{ userconfig.home_addres }}</label>
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-12">
                        <div class="mb-4">
                            <h6 class="form-label">About Me</h6>
                            <label v-if="userconfig.about_me == false" class="font-roboto text-muted"> My information </label>
                            <label v-else class="form-control-plaintext">{{ userconfig.about_me }}</label>                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import { mapState, } from 'vuex';

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
.reveal {
    cursor: pointer;
    color: #007bff;
    margin-left: 10px;
}
</style>