<template>
  <Breadcrumbs main="Project" title="Edit Program" />
  <!-- Container-fluid starts-->
  <div class="container-fluid">
    <div class="row">
      <div class="col-sm-12">
        <div class="card">
          <div class="card-body">
            <div class="form theme-form">
              <form
                class="needs-validation"
                novalidate=""
                @submit.prevent="editProgram"
              >
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label>Program Title *</label>
                      <input
                        class="form-control"
                        type="text"
                        id="name"
                        placeholder="Program Title"
                        v-model="this.state.title"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label>Program URL *</label>
                      <input
                        class="form-control"
                        type="text"
                        id="name"
                        placeholder="Program Title"
                        v-model="this.state.url"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <!-- <label>Edit Program Image</label> -->
                      <!-- <div class="m-0 dz-message needsclick">
                        <input single type="file" ref="image" />
                      </div> -->

                      <label for="formFileMultiple" class="form-label"
                        >Edit Program Image</label
                      >
                      <input
                        name="Select Images"
                        class="form-control input-file-custom"
                        type="file"
                        id="file"
                        single
                        ref="image"
                        @change="previewImage"
                        accept="image/*"
                      />
                      <div class="file-preview">
                        <div
                          class="file-preview-item"
                          v-for="(preview, index) in imagePreviews"
                          :key="index"
                        >
                          <div class="image-container-img">
                            <img
                              :src="preview.url"
                              alt="Preview"
                              class="small-image"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="mt-2">
                        <!-- <button
                          @click="clearSelection"
                          class="btn btn-secondary text-center"
                          href="javascript:void(0)"
                        >
                          Clear
                        </button> -->
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <!-- <label>Edit Program Banner</label> -->
                      <!-- <div class="m-0 dz-message needsclick">
                        <input single type="file" ref="banner" />
                      </div> -->
                      <label for="formFileMultiple" class="form-label"
                        >Edit Program Banner</label
                      >
                      <input
                        name="Select Images"
                        class="form-control input-file-custom"
                        type="file"
                        id="file"
                        single
                        ref="banner"
                        @change="previewBanner"
                        accept="image/*"
                      />
                      <div class="file-preview">
                        <div
                          class="file-preview-item"
                          v-for="(preview, index) in bannerPreviews"
                          :key="index"
                        >
                          <div class="image-container-img">
                            <img
                              :src="preview.url"
                              alt="Preview"
                              class="small-image"
                            />
                          </div>
                        </div>
                      </div>
                      <div class="mt-2">
                        <!-- <button
                          @click="clearSelection"
                          class="btn btn-secondary text-center"
                          href="javascript:void(0)"
                        >
                          Clear
                        </button> -->
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label>Program Description</label>
                      <ckeditor
                        :editor="editor"
                        height="50px"
                        v-model="this.state.description"
                        :config="editorConfig"
                      ></ckeditor>
                      <label class="editor-invalid"
                        >Please add the program description</label
                      >
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label>Requirements</label>
                      <ckeditor
                        :editor="editor"
                        height="50px"
                        v-model="this.state.requirements"
                        :config="editorConfig"
                      ></ckeditor>
                    </div>
                  </div>
                  <label class="editor-invalid"
                    >Please add the program requirements</label
                  >
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label>Out of Scope</label>

                      <ckeditor
                        :editor="editor"
                        height="50px"
                        v-model="this.state.outOfScope"
                        :config="editorConfig"
                      ></ckeditor>
                    </div>
                  </div>
                  <label class="editor-invalid"
                    >Please add the program Out of Scope</label
                  >
                </div>
                <div class="col-sm-12">
                  <label>In Scope Vulnerabilities</label>
                  <Multiselect
                    v-model="state.vulns"
                    mode="tags"
                    :value="state.vulns"
                    :close-on-select="false"
                    :searchable="true"
                    :options="state.options"
                  />
                </div>
                <div class="p-b-30 p-t-20">
                  <div class="table-responsive product-table">
                    <table
                      class="display assets-table"
                      id="basic-1"
                      v-if="state.assets.length > 0"
                    >
                      <thead>
                        <tr>
                          <th
                            class="sorting_asc"
                            tabindex="0"
                            aria-controls="basic-1"
                            rowspan="1"
                            colspan="1"
                            aria-sort="ascending"
                            aria-label="Image: activate to sort column descending"
                          >
                            ID
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="basic-1"
                            rowspan="1"
                            colspan="1"
                            aria-label="Details: activate to sort column ascending"
                          >
                            Asset Type
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="basic-1"
                            rowspan="1"
                            colspan="1"
                            aria-label="Amount: activate to sort column ascending"
                          >
                            Asset
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="basic-1"
                            rowspan="1"
                            colspan="1"
                            aria-label="Amount: activate to sort column ascending"
                          >
                            Out / In Scope
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="basic-1"
                            rowspan="1"
                            colspan="1"
                            aria-label="Amount: activate to sort column ascending"
                          >
                            Bounty
                          </th>
                          <th
                            class="sorting"
                            tabindex="0"
                            aria-controls="basic-1"
                            rowspan="1"
                            colspan="1"
                            aria-label="Action: activate to sort column ascending"
                          >
                            Action
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(asset, $a) in state.assets" :key="$a">
                          <td>
                            <span>{{ $a + 1 }}</span>
                          </td>
                          <td>
                            <span>{{ asset.type }}</span>
                          </td>
                          <td>{{ asset.asset_name }}</td>
                          <td>{{ asset.scope }}</td>
                          <td>{{ asset.bounty }}</td>
                          <td>
                            <button
                              class="btn btn-success btn-xs"
                              type="button"
                              data-original-title="btn btn-danger btn-xs"
                              @click="selectEdit(asset)"
                            >
                              Edit
                            </button>
                            <button
                              class="btn btn-danger btn-xs ms-1"
                              type="button"
                              data-original-title="btn btn-danger btn-xs"
                              @click="deleteAsset(asset.id)"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <form @submit.prevent="addAsset">
                  <div class="row p-b-30">
                    <div class="col-sm-3">
                      <div>
                        <label style="font-weight: bold">Type</label>
                        <select v-model="state.assetType" class="form-select">
                          <option value="web">Web</option>
                          <option value="IoT">IoT</option>
                          <option value="hardware">Hardware</option>
                          <option value="app">IOS / Android App</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-3">
                      <div>
                        <label style="font-weight: bold">Asset</label>
                        <input
                          type="text"
                          class="form-control"
                          placeholder="Program Asset"
                          v-model="state.assetName"
                        />
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <div>
                        <label style="font-weight: bold">Scope</label>
                        <select v-model="state.scope" class="form-select">
                          <option value="In Scope">In Scope</option>
                          <option value="Out of Scope">Out of Scope</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <div>
                        <label style="font-weight: bold">Bounty</label>
                        <select v-model="state.bounty" class="form-select">
                          <option value="eligible">Eligible</option>
                          <option value="ineligible">Ineligible</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <div class="asset-buttons">
                        <input
                          class="btn btn-success m-t-5"
                          type="submit"
                          value="Add"
                          @submit="addAsset"
                        />
                        <button
                          class="btn btn-danger m-t-5"
                          type="button"
                          @click="cancelAsset"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
                <div class="row p-b-30">
                  <div class="row p-b-30">
                    <div
                      v-for="(reward, index) in rewards"
                      :key="index"
                      class="col-sm-3"
                    >
                      <div class="mb-3">
                        <label style="font-weight: bold">
                          {{ reward.impact }}</label
                        >
                        <input
                          type="text"
                          class="form-control"
                          :placeholder="reward.label"
                          v-model="reward.price"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="text-end">
                      <input
                        class="btn btn-success me-3"
                        type="submit"
                        value="Edit"
                      />

                      <a class="btn btn-danger" href="javascript:void(0)"
                        >Cancel</a
                      >
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { reactive, watch } from "vue";
import { useStore } from "vuex";
import { useLoading } from "vue3-loading-overlay";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Multiselect from "@vueform/multiselect";
import { toast } from "vue3-toastify";
import axios from "axios";
import store from "../../store/index";
import vulns from "../../data/vulns.json";

export default {
  name: "createProject",
  data() {
    return {
      imagePreviews: [],
      bannerPreviews: [], // Almacena los archivos seleccionados
    };
  },
  components: {
    ckeditor: CKEditor.component,
    Multiselect,
  },
  setup() {
    const store = useStore();
    const state = reactive({
      img: "",
      banner: "",
      title: store.state.programs.program.name,
      url: "",
      files: null,
      requirements: "Loading...",
      outOfScope: "Loading...",
      description: "Loading...",
      assets: [],
      critical: "",
      high: "",
      medium: "",
      low: "",
      assetType: "",
      assetName: "",
      scope: "",
      bounty: "",
      options: store.state.programs.options,
      selectedVulns: [],
      vulns: [],
      isEditing: false,
      editAsset: {},
    });

    const rewards = [];

    rewards.forEach((reward, index) => {
      watch(
        () => reward.price,
        (newPrice) => {
          store.state.programs.rewards[index].price = newPrice;
        }
      );
    });

    const notify = toast;

    return {
      state,
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        config: { height: "300px" },
      },
      menutoogle: false,
      store,
      notify,
      rewards,
    };
  },

  methods: {
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
      const maxFileSize = 5 * 1024 * 1024; // 5MB

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
    previewImage() {
      const notify = toast;
      const newImage = this.$refs.image.files[0];

      // Borra las previsualizaciones existentes antes de agregar las nuevas
      this.imagePreviews = [];

      store.dispatch("setShowLoader");

      const imageError = this.validateFile(newImage);

      if (imageError) {
        store.dispatch("setHideLoader");

        // Mostrar nueva notificación de error
        notify.error(imageError);
        // Restablecer el valor del input de archivo solo si hay un error en la validación
        this.$refs.image.value = null;
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        this.imagePreviews.push({
          name: newImage.name,
          url: event.target.result,
          showName: false,
          file, // Almacena el archivo para referencia posterior
        });
      };
      reader.readAsDataURL(newImage);

      store.dispatch("setHideLoader");
    },
    previewBanner() {
      const notify = toast;
      const newBanner = this.$refs.banner.files[0];

      // Borra las previsualizaciones existentes antes de agregar las nuevas
      this.bannerPreviews = [];

      store.dispatch("setShowLoader");

      const bannerError = this.validateFile(newBanner);

      if (bannerError) {
        store.dispatch("setHideLoader");

        // Mostrar nueva notificación de error
        notify.error(newBanner);
        // Restablecer el valor del input de archivo solo si hay un error en la validación
        this.$refs.banner.value = null;
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        this.bannerPreviews.push({
          name: newBanner.name,
          url: event.target.result,
          showName: false,
          file, // Almacena el archivo para referencia posterior
        });
      };
      reader.readAsDataURL(newBanner);

      store.dispatch("setHideLoader");
    },

    getProgramDetail() {
      axios
        .get(
          `${import.meta.env.VITE_API_CLIENT}/programs/${this.$route.params.id}`
        )
        .then((r) => {
          this.state.img = r.data.program.photo;
          this.state.banner = r.data.program.banner;
          this.state.title = r.data.program.name;
          this.state.url = r.data.program.url;
          this.state.requirements = this.cleanHTML(r.data.program.requirements);
          this.state.outOfScope = this.cleanHTML(r.data.program.out_scope);
          this.state.description = this.cleanHTML(r.data.program.description);
          this.state.assets = r.data.assets;
          this.state.program = r.data.program;
          this.state.title = r.data.program.name;
          this.rewards = r.data.rewards;
          this.state.selectedVulns = r.data.vulns;
          this.state.vulns = [];
          r.data.vulns.forEach((e) => {
            this.state.vulns.push(e.id);
          });
          this.store.dispatch("programs/show", this.$route.params.id);
          this.$forceUpdate();

        })
        .catch((e) => {
          console.log(e);
        });
    },
    getVulns() {
      axios
        .get(`${import.meta.env.VITE_API_CLIENT}/vulns`)
        .then((r) => {
          r.data.forEach((element) => {
            this.state.options.push({ label: element.name, value: element.id });
          });
        })
        .catch((e) => {
          console.log(e);
        });
    },

    updateAssetList() {
      axios
        .get(
          `${import.meta.env.VITE_API_CLIENT}/programs/${this.$route.params.id}`
        )
        .then((r) => {
          this.state.assets = r.data.assets;
        });
    },

    cleanHTML(html) {
      return this.decodeHTML(html).replace(/<\/?p>/g, "");
    },
    decodeHTML(html) {
      let txt = document.createElement("textarea");

      txt.innerHTML = html;

      return txt.value;
    },
    addAsset() {
      if (this.state.isEditing) {
        store.dispatch("setShowLoader");

        axios
          .put(
            `${import.meta.env.VITE_API_CLIENT}/asset/${
              this.state.editAsset.id
            }`,
            {
              id: this.state.editAsset.id,
              program_id: this.$route.params.id,
              name: this.state.assetName,
              type: this.state.assetType,
              scope: this.state.scope,
              bounty: this.state.bounty,
            }
          )
          .then(() => {
            this.state.assetType = "";
            this.state.assetName = "";
            this.state.scope = "";
            this.state.bounty = "";
            this.updateAssetList();
            this.store.dispatch("programs/show", this.$route.params.id);
            store.dispatch("setHideLoader");
            this.notify.success("Asset updated successfully");
          })
          .catch((e) => {
            console.log(e);
          });
        this.state.assetType = "";
        this.state.assetName = "";
        this.state.scope = "";
        this.state.bounty = "";
        this.state.isEditing = false;
      } else {
        if (
          this.state.assetType == "" ||
          this.state.assetName == "" ||
          this.state.scope == "" ||
          this.state.bounty == ""
        ) {
          return;
        } else {
          store.dispatch("setShowLoader");

          if (this.$route.params.id) {
            axios
              .post(`${import.meta.env.VITE_API_CLIENT}/asset`, {
                program_id: this.$route.params.id,
                name: this.state.assetName,
                type: this.state.assetType,
                scope: this.state.scope,
                bounty: this.state.bounty,
              })
              .then(() => {
                this.store.dispatch("programs/show", this.$route.params.id);
                this.updateAssetList();
                this.$forceUpdate();
                this.state.assetType = "";
                this.state.assetName = "";
                this.state.scope = "";
                this.state.bounty = "";

                store.dispatch("setHideLoader");
                this.notify.success("Asset added successfully");
              })
              .catch((e) => {
                console.log(e);
              });
          } else {
            axios
              .post(`${import.meta.env.VITE_API_CLIENT}/asset`, {
                name: this.state.assetName,
                type: this.state.assetType,
                scope: this.state.scope,
                bounty: this.state.bounty,
              })
              .then(() => {
                this.state.assetType = "";
                this.state.assetName = "";
                this.state.scope = "";
                this.state.bounty = "";
                this.store.dispatch("programs/show", this.$route.params.id);
                store.dispatch("setHideLoader");
                this.notify.success("Asset added successfully");
              })
              .catch((e) => {
                console.log(e);
              });
          }
        }
      }
    },
    cancelAsset() {
      this.state.assetType = "";
      this.state.assetName = "";
      this.state.scope = "";
      this.state.isEditing = false;
      this.state.bounty = "";
    },
    deleteAsset(id) {
      store.dispatch("setShowLoader");

      axios
        .delete(`${import.meta.env.VITE_API_CLIENT}/asset/${id}`)
        .then(() => {
          this.store.dispatch("programs/show", this.$route.params.id);
          this.updateAssetList();
          store.dispatch("setHideLoader");
          this.notify.success("Asset deleted successfully");
        })
        .catch((e) => {
          console.log(e);
        });
    },

    setvulns() {
      vulns.data.forEach((e) => {
        axios.post(`${import.meta.env.VITE_API_CLIENT}/vulns`, {
          name: e.name,
          description: e.description,
          external_id: e.external_id,
        });
      });
    },

    selectEdit(asset) {
      this.state.isEditing = true;
      this.state.assetName = asset.asset_name;
      this.state.assetType = asset.type;
      this.state.scope = asset.scope;
      this.state.editAsset = asset;
      this.state.bounty = asset.bounty;
    },

    editProgram() {
      const editVulns = Object.values(this.state.vulns);
      const formData = new FormData();
      let selectedVulns = [];

      let imgPrueba = this.$refs.image.files[0];
      let imgtest = imgPrueba === undefined ? this.state.img : imgPrueba;
      let bannerPrueba = this.$refs.banner.files[0];
      let bannertest =
        bannerPrueba === undefined ? this.state.banner : bannerPrueba;

      formData.append("img", imgtest);
      formData.append("banner", bannertest);

      this.state.vulns.forEach((e) => {
        selectedVulns.push({
          vuln_id: e,
        });
      });
      store.dispatch("setShowLoader");

      axios
        .post(`${import.meta.env.VITE_API_CLIENT}/programs/files`, formData)
        .then((r) => {
          axios
            .put(
              `${import.meta.env.VITE_API_CLIENT}/programs/${
                this.$route.params.id
              }`,
              {
                img: r.data.image,
                title: this.state.title,
                requirements: this.state.requirements,
                description: this.state.description,
                outOfScope: this.state.outOfScope,
                banner: r.data.banner,
                url: this.state.url,
                vulns: selectedVulns,
                rewards: this.rewards,
              }
            )
            .then(() => {
              store.dispatch("setHideLoader");
              this.notify.success("Program successfully updated");
              this.$router.push(`/program/detail/${this.$route.params.id}`);
            })
            .catch(() => {
              store.dispatch("setHideLoader");
              this.notify.error("Sorry we couldn't update your program");
            });
        });
    },
  },

  computed: {
    ...mapState({
      prueba: (state) => state.programs.program,
    }),
  },

  mounted() {
    this.getProgramDetail();
  },

  beforeRouteEnter(to, from, next) {
    store.dispatch("programs/vulns");
    // store.dispatch("programs/show", to.params.id);

    next();
  },
};
</script>

<style lang="scss">
.ck-content {
  height: 300px;
}
.asset-buttons {
  display: flex;
  height: 100%;
  justify-content: space-around;
}
.assets-table {
  width: 100%;
}

.editor-invalid {
  display: none;
}

.is-invalid {
  display: block;
  font-size: 12px;
  color: red;
}

.small-image {
  max-width: 100px; /* Ajusta el ancho máximo deseado */
  max-height: 100px; /* Ajusta la altura máxima deseada */
}

.file-preview {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}

.file-preview-item {
  margin: 10px;
  position: relative;
}

.image-container-img {
  position: relative;
  display: inline-block;
  width: 100px; /* Tamaño deseado para las miniaturas */
  height: 100px; /* Tamaño deseado para las miniaturas */
}

.image-container-img:hover {
  opacity: 1;
}
</style>
