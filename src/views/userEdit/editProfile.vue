<template>
    <div class="col-xl-8">
        <div class="card">
            <div class="card-header ">
                <h4 class="card-title mb-0">Edit Profile</h4>
                <div class="card-options"><a class="card-options-collapse" href="javascript:void(0)"
                        data-bs-toggle="card-collapse"><i class="fe fe-chevron-up"></i></a><a class="card-options-remove"
                        href="javascript:void(0)" data-bs-toggle="card-remove"><i class="fe fe-x"></i></a></div>
            </div>
            <div class="card-body">
                <div class="row">
                    <!-- <div class="col-sm-6 col-md-4">
                        <div class="mb-3">
                            <label class="form-label">Username</label>
                            <input class="form-control" type="text" v-model="selectusername" @input="setValueInStore"
                                placeholder="Username">
                        </div>
                    </div> -->
                    <div class="col-sm-6 col-md-6">
                        <div class="mb-3">
                            <label class="form-label">First Name</label>
                            <input class="form-control" type="text" v-model="selectfirstname" @input="setValueInStore"
                                placeholder="First Name">
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-6">
                        <div class="mb-3">
                            <label class="form-label">Last Name</label>
                            <input class="form-control" type="text" v-model="selectlastname" @input="setValueInStore"
                                placeholder="Last Name">
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div class="mb-3">
                            <label class="form-label">Address</label>
                            <input class="form-control" type="text" v-model="selectAddres" @input="setValueInStore"
                                placeholder="Home Address">
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-4">
                        <div class="mb-3">
                            <label class="form-label">City</label>
                            <input class="form-control" type="text" v-model="selectCity" @input="setValueInStore"
                                placeholder="City">
                        </div>
                    </div>
                    <div class="col-sm-6 col-md-3">
                        <div class="mb-3">
                            <label class="form-label">Postal Code</label>
                            <input class="form-control" type="number" v-model="selectPostal" @input="setValueInStore"
                                placeholder="ZIP Code">
                        </div>
                    </div>
                    <div class="col-md-5">
                        <div class="mb-3">
                            <label class="form-label">Country</label>
                            <select class="form-control btn-square" v-model="selectCountry" @change="setValueInStore">
                                <option value="0">--Select--</option>
                                <option value="1">Germany</option>
                                <option value="2">Canada</option>
                                <option value="3">Usa</option>
                                <option value="4">Aus</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-12">
                        <div>
                            <label class="form-label">About Me</label>
                            <textarea class="form-control" rows="3" v-model="selectAbout" @input="setValueInStore"
                                placeholder="Enter About your description"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer text-end">
                <input class="btn btn-success" type="submit" value="Submit" title="btn btn-success"
                    @click="submitUserconfig" />
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import { toast } from "vue3-toastify";
import { useLoading } from "vue3-loading-overlay";
import store from "../../store";
import { mapState, mapMutations } from "vuex";

export default {
    data() {
        return {
            selectusername: "",
            selectfirstname: "",
            selectlastname: "",
            selectAddres: "",
            selectCity: "",
            selectPostal: "",
            selectCountry: "",
            selectAbout: ""
        };
    },
    computed: {
        ...mapState({
            companyUserName: (state) => state.userconfig.companyUserName,
            lastName: (state) => state.userconfig.lastName,
            home_addres: (state) => state.userconfig.home_addres,
            city: (state) => state.userconfig.city,
            postal_code: (state) => state.userconfig.postal_code,
            country: (state) => state.userconfig.country,
            about_me: (state) => state.userconfig.about_me,

        }),
    },

    mounted() {
        // this.getUserConfig();
        axios.get(`${import.meta.env.VITE_API_CLIENT}/usersconfig`)
            .then((r) => {
                this.$store.dispatch('userconfig/show', r.data);

                // Asignar valores desde Vuex a las variables del formulario
                this.selectfirstname = this.companyUserName;
                this.selectlastname = this.lastName;
                this.selectAddres = this.home_addres;
                this.selectCity = this.city;
                this.selectPostal = this.postal_code;
                this.selectCountry = this.country;
                this.selectAbout = this.about_me;
            })
            .catch(e => {
                console.error('Error al obtener los datos:', e);
            });
    },

    methods: {
        ...mapMutations("userconfig", ["setFirstname", "setLastname",
            "setAddres", "setCity", "setPostal", "setCountry", "setAbout"]),
        setValueInStore() {
            this.setFirstname(this.selectfirstname);
            this.setLastname(this.selectlastname);
            this.setAddres(this.selectAddres);
            this.setCity(this.selectCity);
            this.setPostal(this.selectPostal);
            this.setCountry(this.selectCountry);
            this.setAbout(this.selectAbout);

        },

        async submitUserconfig() {
            const notify = toast;
            store.dispatch("setShowLoader")

            let formData = new FormData();

            let userconfig = {
                company_user_name: store.state.userconfig.companyUserName,
                last_name: store.state.userconfig.lastName,
                bio: store.state.userconfig.bio,
                linkedin: store.state.userconfig.linkedin,
                github: store.state.userconfig.github,
                twitter: store.state.userconfig.twitter,
                home_addres: store.state.userconfig.home_addres,
                country: store.state.userconfig.country,
                city: store.state.userconfig.city,
                postal_code: store.state.userconfig.postal_code,
                about_me: store.state.userconfig.about_me,
            };

            await this.$nextTick();

            let file = this.$store.state.userconfig.user_image;

            formData.append("user_image", file);

            formData.append("userconfiguration", JSON.stringify(userconfig));

            axios
                .put(`${import.meta.env.VITE_API_CLIENT}/usersconfig`, formData)
                .then((r) => {
                    this.$store.dispatch('user/profile', formData); // Dispatchea la acción con los datos
                    notify.success("Your userconfig has been successfully submitted.");
                    store.dispatch("setHideLoader")
                })
                .catch((e) => {
                    notify.error(e);
                });
        },
    },
};
</script>