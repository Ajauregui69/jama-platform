<template>
  <Breadcrumbs main="Project" title="Create Program" />
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
                @submit.prevent="createProgram"
              >
                <div class="col-sm-12">
                  <label>Select Company</label>
                  <Multiselect
                    v-model="state.company"
                    :close-on-select="true"
                    :searchable="true"
                    :options="state.clients"
                  />
                  <!-- <pre>{{state.clients}}</pre> -->
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label>Program Title *</label>
                      <input
                        class="form-control"
                        type="text"
                        :class="v$.title.$error ? 'is-invalid' : ''"
                        id="name"
                        placeholder="Program Title"
                        v-model="state.title"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <label>Program main Url *</label>
                      <input
                        class="form-control"
                        type="text"
                        :class="v$.url.$error ? 'is-invalid' : ''"
                        id="url"
                        placeholder="Program Url"
                        v-model="state.url"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <!-- <label>Upload Program Image</label>
                      <div class="m-0 dz-message needsclick">
                        <input single type="file" ref="image" />
                      </div> -->
                      <label for="formFileMultiple" class="form-label"
                        >Upload Program Image</label
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
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="mb-3">
                      <!-- <label>Upload Program Banner</label>
                      <div class="m-0 dz-message needsclick">
                        <input single type="file" ref="banner" />
                      </div> -->
                      <label for="formFileMultiple" class="form-label"
                        >Upload Program Banner</label
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
                        v-model="state.description"
                        :config="editorConfig"
                      ></ckeditor>
                      <label
                        class="editor-invalid"
                        :class="v$.description.$error ? 'is-invalid' : ''"
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
                        v-model="state.requirements"
                        :config="editorConfig"
                      ></ckeditor>
                    </div>
                  </div>
                  <label
                    class="editor-invalid"
                    :class="v$.requirements.$error ? 'is-invalid' : ''"
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
                        v-model="state.outOfScope"
                        :config="editorConfig"
                      ></ckeditor>
                    </div>
                  </div>
                  <label
                    class="editor-invalid"
                    :class="v$.outOfScope.$error ? 'is-invalid' : ''"
                    >Please add the program Out of Scope</label
                  >
                </div>
                <div class="col-sm-12">
                  <label>In Scope Vulnerabilities</label>
                  <Multiselect
                    v-model="state.vulns"
                    mode="tags"
                    :close-on-select="false"
                    :searchable="true"
                    :create-option="true"
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
                              title=""
                            >
                              Edit
                            </button>
                            <button
                              class="btn btn-danger btn-xs ms-1"
                              type="button"
                              data-original-title="btn btn-danger btn-xs"
                              @click="deleteAsset($a)"
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
                        <label>Type</label>
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
                        <label>Asset</label>
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
                        <label>Scope</label>
                        <select v-model="state.scope" class="form-select">
                          <option value="In Scope">In Scope</option>
                          <option value="Out of Scope">Out of Scope</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-sm-2">
                      <div>
                        <label>Bounty</label>
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
                  <div class="col-sm-3">
                    <div class="mb-3">
                      <label>Reward for Critical Impact</label>
                      <input
                        type="number"
                        class="form-control"
                        :class="v$.critical.$error ? 'is-invalid' : ''"
                        placeholder="Reward for Critical Impact"
                        v-model="state.critical"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="mb-3">
                      <label>Reward for High impact</label>
                      <input
                        type="number"
                        class="form-control"
                        :class="v$.high.$error ? 'is-invalid' : ''"
                        placeholder="Reward for High impact"
                        v-model="state.high"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="mb-3">
                      <label>Reward for Medium impact</label>
                      <input
                        type="number"
                        class="form-control"
                        :class="v$.medium.$error ? 'is-invalid' : ''"
                        placeholder="Reward for Medium impact"
                        v-model="state.medium"
                      />
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="mb-3">
                      <label>Reward for Low impact</label>
                      <input
                        type="number"
                        class="form-control"
                        :class="v$.low.$error ? 'is-invalid' : ''"
                        placeholder="Reward for Low impact"
                        v-model="state.low"
                      />
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    <div class="text-end">
                      <input
                        class="btn btn-success me-3"
                        type="submit"
                        value="Create"
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
import { reactive, computed } from "vue";
import { useStore } from "vuex";
import { useLoading } from "vue3-loading-overlay";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Multiselect from "@vueform/multiselect";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { toast } from "vue3-toastify";
import axios from "axios";
import vulns from "../../data/vulns.json";
import store from "../../store";
import { mapState } from "vuex";

export default {
  name: "createProject",
  components: {
    ckeditor: CKEditor.component,
    Multiselect,
  },
  data() {
    return {
      imagePreviews: [],
      bannerPreviews: [], // Almacena los archivos seleccionados
    };
  },
  computed: {
    ...mapState({
      companies: (state) => state.usersList.users,
    }),
  },
  setup() {
    const state = reactive({
      title: "",
      files: null,
      requirements: "",
      outOfScope: "",
      description: "",
      assets: [],
      critical: "",
      high: "",
      medium: "",
      low: "",
      assetType: "",
      assetName: "",
      scope: "",
      url: "",
      bounty: "",
      options: [],
      clients:[],
      vulns: [],
      company: [],
    });
    const rules = computed(() => {
      return {
        title: { required },
        requirements: { required },
        outOfScope: { required },
        description: { required },
        critical: { required },
        high: { required },
        medium: { required },
        low: { required },
        url: { required },
      };
    });
    const v$ = useValidate(rules, state);
    const store = useStore();
    const notify = toast;

    return {
      state,
      editor: ClassicEditor,
      editorData: "",
      editorConfig: {
        config: { height: "300px" },
      },
      menutoogle: false,
      v$,
      store,
      notify,
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
      const maxFileSize = 1 * 1024 * 1024; // 5MB

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
    addAsset() {
      if (
        this.state.assetType == "" ||
        this.state.assetName == "" ||
        this.state.scope == "" ||
        this.state.bounty == ""
      ) {
        return;
      } else {
        this.state.assets.push({
          type: this.state.assetType,
          asset_name: this.state.assetName,
          scope: this.state.scope,
          bounty: this.state.bounty,
        });
        this.state.assetType = "";
        this.state.assetName = "";
        this.state.scope = "";
        this.state.bounty = "";
      }
    },
    cancelAsset() {
      this.assetType = "";
      this.assetName = "";
      this.scope = "";
    },
    deleteAsset(id) {
      this.state.assets.splice(id, 1);
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

    createProgram() {
      this.v$.$validate();

      let selectedVulns = [];
      const formData = new FormData();

      this.state.vulns.forEach((e) => {
        selectedVulns.push({
          vuln_id: e,
        });
      });

      let rewards = [
        {
          impact: "critical",
          price: this.state.critical,
        },
        {
          impact: "high",
          price: this.state.high,
        },
        {
          impact: "medium",
          price: this.state.medium,
        },
        {
          impact: "low",
          price: this.state.low,
        },
      ];

      formData.append("img", this.$refs.image.files[0]);
      formData.append("banner", this.$refs.banner.files[0]);

      if (this.v$.$errors.length > 0) {
        return;
      } else {
        // console.log("company id: " + this.state.company);
        // console.log("title: " + this.state.title);
        // console.log("title: " + selectedVulns);
        store.dispatch("setShowLoader");

        axios
          .post(`${import.meta.env.VITE_API_CLIENT}/programs/files`, formData)
          .then((r) => {
            axios.post(`${import.meta.env.VITE_API_CLIENT}/programs/`, {
              company_id: this.state.company,
              title: this.state.title,
              description: this.state.description,
              requirements: this.state.requirements,
              outOfScope: this.state.outOfScope,
              img: r.data.image,
              banner: r.data.banner,
              url: this.state.url,
              vulns: selectedVulns,
              assets: this.state.assets,
              rewards: rewards,
            });

            this.notify.success("The program has been created successfully.");
            setTimeout(() => {
              this.$router.push("/program/list");
            }, 1000);
            // setTimeout(() => {
            //   store.dispatch("setHideLoader");
            // }, 1520);
          })
          .catch((e) => {
            store.dispatch("setHideLoader");
            this.notify.error(e.message);
          });
      }
    },
  },
  mounted() {
    axios
      .get(`${import.meta.env.VITE_API_CLIENT}/vulns`)
      .then((r) => {
        console.log(r.data)
        r.data.forEach((element) => {
          this.state.options.push({ label: element.name, value: element.id });
        });
      })
      .catch((e) => {
        console.log(e);
      });

      axios
      .get(`${import.meta.env.VITE_API_CLIENT}/users/companies`)
      .then((r) => {
        console.log(r.data)
        r.data.company.forEach((element) => {
          this.state.clients.push({ label: element.company_name, value: element.id });
        });
      })
      .catch((e) => {
        console.log(e);
      });
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
