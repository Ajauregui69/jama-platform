<template>
  <div class="col-xl-4" :key="componentKey">
    <div class="card">
      <div class="card-header">
        <h4 class="card-title mb-0">My Profile</h4>
        <div class="card-options">
          <a
            class="card-options-collapse"
            href="javascript:void(0)"
            data-bs-toggle="card-collapse"
            ><i class="fe fe-chevron-up"></i></a
          ><a
            class="card-options-remove"
            href="javascript:void(0)"
            data-bs-toggle="card-remove"
            ><i class="fe fe-x"></i
          ></a>
        </div>
      </div>
      <div class="card-body">
        <div>
          <div class="row mb-2">
            <div class="profile-title">
              <div class="media">
                <input
                  single
                  type="file"
                  style="display: none"
                  ref="profile"
                  @change="editPhoto"
                />

                <div class="image-container" @click="openImageInput">
                  <img
                    class="image-p rounded-circle"
                    :src="user.user_image"
                    alt=""
                    ref="profileImage"
                  />

                  <div class="overlay">
                    <p>Change Image</p>
                  </div>
                </div>

                <div class="media-body">
                  <router-link to="/users/profile">
                    <h5 class="mb-1">
                      {{ user.company_user_name }} {{ user.last_name }}
                    </h5>
                  </router-link>
                  <p>{{ user.role }}</p>
                </div>
              </div>
            </div>
          </div>
          <div class="mb-3">
            <h6 class="form-label">Bio</h6>
            <textarea
              class="form-control"
              v-model="selectbio"
              @input="setValueInStore"
              rows="5"
            >
On the other hand, we denounce with righteous indignation</textarea
            >
          </div>
          <div class="mb-3">
            <label class="form-label">Linkedin</label>
            <input
              class="form-control"
              v-model="selectlink"
              @input="setValueInStore"
              placeholder="http://Uplor .com"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Twitter</label>
            <input
              class="form-control"
              v-model="selecttwit"
              @input="setValueInStore"
              placeholder="http://Uplor .com"
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Github</label>
            <input
              class="form-control"
              v-model="selectgit"
              @input="setValueInStore"
              placeholder="http://Uplor .com"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";
import { useLoading } from "vue3-loading-overlay";
import { toast } from "vue3-toastify";
import store from "../../store";

export default {
  data() {
    return {
      selectbio: "",
      selectlink: "",
      selecttwit: "",
      selectgit: "",
      componentKey: 0,
    };
  },

  computed: {
    ...mapState({
      bio: (state) => state.userconfig.bio,
      linkedin: (state) => state.userconfig.linkedin,
      twitter: (state) => state.userconfig.twitter,
      github: (state) => state.userconfig.github,
      user: (state) => state.user.profile,
    }),
  },
  mounted() {
    // Cargar datos iniciales al montar el componente
    this.loadUserData();
  },
  methods: {
    ...mapMutations("userconfig", [
      "setBio",
      "setLinkedin",
      "setTwitter",
      "setGithub",
    ]),
    setValueInStore() {
      this.setBio(this.selectbio);
      this.setLinkedin(this.selectlink);
      this.setTwitter(this.selecttwit);
      this.setGithub(this.selectgit);
    },
    openImageInput() {
      this.$refs.profile.click();
    },
    validateFile(file) {
      const allowedExtensions = [
        "bmp",
        "gif",
        "jpg",
        "jpeg",
        "png",
        "tif",
        "tiff",
      ];
      const maxFileSize = 25 * 1024 * 1024; // 5MB

      if (!file) {
        return "Please select an image";
      }

      // Obtener la extensión del archivo seleccionado
      const fileExtension = file.name.split(".").pop().toLowerCase();

      // Validar la extensión del archivo
      if (!allowedExtensions.includes(fileExtension)) {
        return "Invalid file format. Supported formats: BMP, GIF, JPG, TIF, PNG";
      }

      // Validar el tamaño del archivo
      if (file.size > maxFileSize) {
        const maxSizeInMB = maxFileSize / (1024 * 1024);
        return `File size exceeds the maximum limit of ${maxSizeInMB}MB`;
      }

      return null; // Retorna null si la validación es exitosa
    },
    editPhoto() {
      const formData = new FormData();
      const notify = toast;

      store.dispatch("setShowLoader")

      let newPhoto = this.$refs.profile.files[0];

      const validationError = this.validateFile(newPhoto);

      if (validationError) {
        store.dispatch("setHideLoader")

        // Mostrar nueva notificación de error
        notify.error(validationError);
        // Restablecer el valor del input de archivo solo si hay un error en la validación
        this.$refs.profile.value = null;
        return;
      }

      formData.append("user_image", newPhoto);

      axios
        .post(`${import.meta.env.VITE_API_CLIENT}/usersconfig/files`, formData)
        .then((r) => {
          const responseData = r.data;

          axios
            .put(
              `${import.meta.env.VITE_API_CLIENT}/usersconfig/photo`,
              responseData
            )
            .then((r) => {
              this.$store.dispatch("user/profile", responseData); // Dispatchea la acción con los datos
              store.dispatch("setHideLoader")
              notify.success("Photo successfully updated");

              // Llama a la función para cargar la información actualizada
              this.loadUserData();

              // Incrementa el valor de key para forzar la recarga del componente
              this.componentKey += 1;
              this.$forceUpdate();
            })
            .catch(() => {
              store.dispatch("setHideLoader")
              notify.error("Sorry we couldn't update your photo");
            });
        });
    },
    loadUserData() {
      // Llama a la API para obtener la información actualizada desde la base de datos
      axios
        .get(`${import.meta.env.VITE_API_CLIENT}/usersconfig`)
        .then((r) => {
          this.$store.dispatch("userconfig/show", r.data); // Dispatchea la acción con los datos
          // Actualiza otras propiedades de datos según sea necesario
          this.selectbio = this.bio;
          this.selectlink = this.linkedin;
          this.selecttwit = this.twitter;
          this.selectgit = this.github;
        })
        .catch((e) => {
          console.error("Error al obtener los datos:", e);
        });
    },
  },
};
</script>

<style scoped>
.image-p {
  width: 70px;
  height: 70px;
  object-fit: cover;
  /* Esto asegura que la imagen se ajuste al contenedor manteniendo las proporciones */
}

.image-container {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  /* Asegura que el círculo esté completamente visible */
  border-radius: 50%;
  /* Aplica un borde redondeado para crear un círculo */
}

.overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  opacity: 0;
  /* Inicialmente oculto */
  transition: opacity 0.3s ease;
  /* Transición de opacidad */
}

.image-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  /* Color de superposición oscurecida */
  border-radius: 50%;
  /* Asegura que la superposición también sea circular */
  opacity: 0;
  /* Inicialmente oculto */
  transition: opacity 0.3s ease;
  /* Transición de opacidad */
}

.image-container:hover .overlay,
.image-container:hover::before {
  opacity: 1;
  /* Mostrar la superposición en hover */
}

.overlay p {
  color: white;
  font-size: 12px;
  /* Puedes personalizar más estilos si lo deseas */
}
</style>
