<template>
  <div class="tab-content" v-if="dataLoaded">
    <div class="tab-pane right-box">
      <div class="email-top">
        <div class="tag-title">#{{ report.report.id }}</div>
        <h5>{{ report.report.title }}</h5>
      </div>
      <div class="inbox">
        <div class="image-container" ref="chatMessages">
          <div class="line"></div>
          <div class="media">
            <div class="other-object">
              <div class="media-size-email">
                <img
                  class="me-3 rounded-circle"
                  :src="report.report.hacker.photo"
                  alt=""
                />
              </div>
            </div>
            <div class="media-body">
              <p>
                <a href="">{{
                  `${report.report.hacker.name} ${report.report.hacker.last_name}`
                }}</a
                ><span> submitted a report to </span
                ><small
                  ><span>{{ report.program.name }}</span></small
                >
                <small
                  ><span class="pull-right">{{
                    formattedDate(report.report.created_at)
                  }}</span></small
                >
              </p>

              <p v-html="htmlParser(report.report.description)"></p>

              <h6><b>Impact: </b></h6>

              <p v-html="htmlParser(report.report.impact)"></p>

              <div v-if="report.resources.length > 0" class="attachemnts-box">
                <span>
                  {{ `${report.resources.length}  attachments:` }}
                </span>
                <div
                  v-for="(resource, $r) in report.resources"
                  :key="$r"
                  type="info"
                >
                  <a data-bs-toggle="modal" :data-bs-target="`#modal${$r}`">
                    {{ resource.name }}
                  </a>
                  <div
                    class="modal fade"
                    :id="`modal${$r}`"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLongTitle"
                    aria-hidden="true"
                  >
                    <modalFiles>
                      <template v-slot:header>
                        <h5>{{ resource.name }}</h5>
                      </template>
                      <template v-slot:body>
                        <img
                          style="width: 100%; height: auto"
                          :src="`${resource.url}${resource.name}`"
                        />
                      </template>
                      <template v-slot:footer>
                        <a
                          class="btn btn-primary text-center"
                          style="color: white"
                          :href="`${resource.url}${resource.name}`"
                          download
                          >Download</a
                        >
                      </template>
                    </modalFiles>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- replies -->
          <div class="media" v-for="(replies, key) in report.replys" :key="key">
            <div class="other-object">
              <div class="media-size-email">
                <img
                  class="me-3 rounded-circle"
                  :src="
                    typeof replies.hacker === 'object' && replies.hacker != null
                      ? replies.hacker.photo
                      : replies.companyUser.user_image
                  "
                  alt=""
                />
              </div>
            </div>
            <div class="media-body">
              <p>
                <a href="">{{
                  `${
                    typeof replies.hacker === "object" && replies.hacker != null
                      ? replies.hacker.name
                      : replies.companyUser.company_user_name
                  } ${
                    typeof replies.hacker === "object" && replies.hacker != null
                      ? replies.hacker.last_name
                      : replies.companyUser.last_name
                  }`
                }}</a
                ><span>{{ ` ${replies.action} to ` }}</span
                ><small
                  ><span>{{ report.program.name }}</span></small
                >
                <small
                  ><span class="pull-right">{{
                    formattedDate(replies.created_at)
                  }}</span></small
                >
              </p>

              <div class="message">
                <span v-html="htmlParser(replies.message)"></span>
              </div>

              <div v-if="replies.resources.length > 0" class="attachemnts-box">
                <span>
                  {{ `${replies.resources.length}  attachments:` }}
                </span>
                <div
                  v-for="(reply_resources, $r) in replies.resources"
                  :key="$r"
                  type="info"
                >
                  <a
                    data-bs-toggle="modal"
                    :data-bs-target="`#modal-${reply_resources.id}-${$r}`"
                  >
                    {{ reply_resources.name }}
                  </a>
                  <div
                    class="modal fade"
                    :id="`modal-${reply_resources.id}-${$r}`"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLongTitle"
                    aria-hidden="true"
                  >
                    <modalFiles>
                      <template v-slot:header>
                        <h5>{{ reply_resources.name }}</h5>
                      </template>
                      <template v-slot:body>
                        <img
                          style="width: 100%; height: auto"
                          :src="`${reply_resources.url}${reply_resources.name}`"
                        />
                      </template>
                      <template v-slot:footer>
                        <a
                          class="btn btn-primary text-center"
                          style="color: white"
                          :href="`${reply_resources.url}${reply_resources.name}`"
                          download
                          >Download</a
                        >
                      </template>
                    </modalFiles>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card-body">
          <form class="theme-form e-commerce-form bar">
            <div class="input-payment">
              <select
                class="form-select"
                size="1"
                v-model="selectedOption"
                @change="updateSelectedOption"
              >
                <option value="None">None</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
            </div>
            <div class="input-payment">
              <select
                class="form-select"
                size="1"
                v-model="selectedStatus"
                @change="updateSelectedOptionSt"
              >
                <option value="pending-review">Pending program review</option>
                <option value="triaged">Triaged</option>
                <option value="retesting">Retesting</option>
                <option value="more-info">Needs more information</option>
                <option value="resolved">Resolved</option>
                <option value="informative">Informative</option>
                <option value="duplicates">Duplicate</option>
                <option value="not-applicable">Not Applicable</option>
                <option value="spam">Spam</option>
              </select>
            </div>
            <button
              class="btn btn-primary"
              type="button"
              data-bs-toggle="modal"
              data-original-title="test"
              data-bs-target="#grid-modal"
              @click="getDataPaymet"
            >
              Make payment
            </button>
            <div
              class="modal fade"
              id="grid-modal"
              tabindex="-1"
              role="dialog"
              aria-labelledby="grid-modal"
              aria-hidden="true"
            >
              <modalPayments
                :hackerName="hackerName"
                :hackerUserId="hackerUserId"
                :hackerID="hackerID"
                :rating="rating"
                :clientIdPaypal="clientIdPaypal"
                :secretPaypal="secretPaypal"
                :urlPhoto="urlPhoto"
                :reportID="reportID"
                :payment="payment"
              ></modalPayments>
            </div>
            <!-- <button
              class="btn btn-primary"
              href="javascript:void(0)"
              @click="showModal"
            >
              Make payment
            </button> -->
          </form>
          <div class="row">
            <div class="col">
              <div class="mb-3">
                <textarea
                  class="form-control"
                  v-model="inputData"
                  id="exampleFormControlTextarea4"
                  rows="3"
                  placeholder="Add a comment.."
                >
                </textarea
                >
              </div>
            </div>
          </div>

          <div class="mt-0">
            <label for="formFileMultiple" class="form-label">Evidences</label>
            <input
              name="Select Images"
              class="form-control input-file-custom"
              type="file"
              id="file"
              multiple
              ref="replyEvidence"
              @change="handleFileChange"
              accept="image/*"
            />
            <div class="file-preview">
              <div
                class="file-preview-item"
                v-for="(preview, index) in filePreviews"
                :key="index"
              >
                <div class="image-container-img">
                  <img :src="preview.url" alt="Preview" class="small-image" />
                </div>
              </div>
            </div>
            <div class="mt-1">
              <button
                @click="clearSelection"
                class="btn btn-secondary text-center"
                href="javascript:void(0)"
              >
                Clear
              </button>
            </div>
          </div>

          <div class="text-end">
            <button
              @click="reply"
              class="btn btn-primary text-center"
              href="javascript:void(0)"
              :disabled="inputData.trim() === ''"
              >
              Post Comment
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
import { inboxData } from "../../data/email/email";
import axios from "axios";
import { useLoading } from "vue3-loading-overlay";
import modalFiles from "../Reports/modalFiles.vue";
import store from "../../store";
import modalPayments from "../../components/paypal/modalPayments.vue";
import { toast } from "vue3-toastify";

export default {
  components: {
    modalFiles,
    modalPayments,
  },
  name: "ReportDetail",
  computed: {
    ...mapState({
      report: (state) => state.reports.report,
    }),
    createdAt() {
      return moment(this.report.created_at).format("Do MMM YY");
    },
    selectedOption: {
      get() {
        return this.report.report.rating || null; // Asegúrate de manejar el caso en que no haya rating
      },
    },
    selectedStatus: {
      get() {
        return this.report.report.status || null; // Asegúrate de manejar el caso en que no haya rating
      },
    },
  },
  created() {
    this.$socket.on("notification", async (data) => {
      await this.$store.dispatch("reports/show", this.$route.params.id);
      this.cleanInput();
    });
  },
  data() {
    return {
      dataLoaded: false, // Controlar si los datos están cargados
      loadingInstance: null, // Almacenar la instancia del loader
      inboxData: inboxData,
      selectedOp: null,
      selectedSt: null,
      filePreviews: [],
      selectedFiles: [], // Almacena los archivos seleccionados
      inputData: "",
      //Parametros para el pago
      hackerName: "",
      hackerUserId: "",
      hackerID: "",
      rating: "",
      clientIdPaypal: null,
      secretPaypal: null,
      urlPhoto: "",
      companyName: "",
      reportID: "",
      payment: 0
    };
  },
  mounted() {
    this.loadData();
  },
  updated() {
    // Verifica si dataLoaded es verdadero y si el elemento con ref="chatMessages" existe
    if (this.dataLoaded && this.$refs.chatMessages) {
      const chatMessages = this.$refs.chatMessages;
      chatMessages.addEventListener("scroll", this.updateGuideLinePosition);
    }
  },

  methods: {
    async getDataPaymet() {

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_JAMA}/usersconfig/${this.report.report.hacker_id}`
        );

        // Asignar los valores a las variables del componente
        this.clientIdPaypal = response.data.clientIdPaypal;
        this.secretPaypal = response.data.secretPaypal;
        this.hackerName = this.report.report.hacker.username;
        this.hackerUserId = this.report.report.hacker.user_id;
        this.hackerID = this.report.report.hacker.id;
        this.rating = this.report.report.rating;
        this.urlPhoto = this.report.report.hacker.photo;
        this.companyName = this.report.company.company_user_name;
        this.reportID = this.report.report.id;
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    clearSelection() {
      // Limpia las previsualizaciones y el input file
      this.filePreviews = [];
      this.$refs.replyEvidence.value = ""; // Limpia el valor del input
    },
    handleFileChange() {
      const files = this.$refs.replyEvidence.files;
      const allowedImageTypes = ["image/jpeg", "image/png", "image/gif"];

      // Borra las previsualizaciones existentes antes de agregar las nuevas
      this.filePreviews = [];

      // Limpia los archivos seleccionados previamente
      this.selectedFiles = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        const reader = new FileReader();

          reader.onload = (event) => {
            this.filePreviews.push({
              name: file.name,
              url: event.target.result,
              showName: false,
              file, // Almacena el archivo para referencia posterior
            });

            // Agrega el archivo a la lista de archivos seleccionados
            this.selectedFiles.push(file);
          };

          reader.readAsDataURL(file);
      }
    },
    deleteFile(index) {
      const deletedFile = this.filePreviews[index];
      this.filePreviews.splice(index, 1);

      // Remueve el archivo del input file
      const remainingFiles = this.selectedFiles.filter(
        (file) => file !== deletedFile.file
      );
      this.selectedFiles = remainingFiles;
    },
    showFileName(index) {
      this.filePreviews[index].showName = true;
    },
    hideFileName(index) {
      this.filePreviews[index].showName = false;
    },

    async loadData() {
      store.dispatch("setShowLoader")

      try {
        await this.$store.dispatch("reports/show", this.$route.params.id);

        this.dataLoaded = true; // Marcar los datos como cargados
      } catch (error) {
        console.error("Error al cargar los datos:", error);
      } finally {
        store.dispatch("setHideLoader") // Ocultar el loader cuando los datos estén disponibles o en caso de error
      }
    },

    decodeHTML(html) {
      let txt = document.createElement("textarea");

      txt.innerHTML = html;

      return txt.value;
    },
    htmlParser(data) {
      return this.decodeHTML(data);
    },
    formattedDate(dateString) {
      const date = new Date(dateString);
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      };
      return date.toLocaleString("en-EN", options);
    },
    cleanInput() {
      this.inputData = "";
      const inputElement = this.$refs.replyEvidence;
      inputElement.value = null;

      setTimeout(() => {
        const scrollContainer = this.$refs["chatMessages"];
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }, 100);
    },
    updateSelectedOption() {
      this.selectedOp = event.target.value;
    },
    updateSelectedOptionSt() {
      this.selectedSt = event.target.value;
    },
    updateGuideLinePosition() {
      const guideLine = this.$refs["chatMessages"].querySelector(".line");
      const chatMessages = this.$refs["chatMessages"];

      const topScroll = chatMessages.scrollTop;
      const bottomScroll = chatMessages.scrollTop;
      const flag = topScroll + chatMessages.clientHeight;

      guideLine.style.top = `${topScroll}px`;
      guideLine.style.bottom = `-${bottomScroll}px`;
      if (topScroll <= 50) {
        guideLine.style.top = `50px`;
      }
    },
    sendNotification() {
      this.$socket.emit("notification");
    },
    
    reply() {
      const notify = toast;
      store.dispatch("setShowLoader")

      let formData = new FormData();
      let reply = {
        message: this.inputData,
        rating:
          this.report.report.rating === this.selectedOp
            ? null
            : this.selectedOp,
        status:
          this.report.report.status === this.selectedSt
            ? null
            : this.selectedSt,
      };
      let files = this.$refs.replyEvidence.files;
      for (let i = 0; i < files.length; i++) {
        formData.append("evidence[]", files[i]);
      }

      formData.append("reply", JSON.stringify(reply));
      axios
        .post(`${import.meta.env.VITE_API_JAMA}/reply/${this.$route.params.id}`, formData)
        .then((r) => {

          this.$store.dispatch("reports/show", this.$route.params.id);

          const pathSegments = this.$route.path.split('/').filter(segment => segment !== '');
          store.dispatch("reports/index", pathSegments[1]);
          
          const hideLoader = () => {
            return new Promise((resolve) => {
              store.dispatch("setHideLoader")
              resolve();
            });
          };
          hideLoader().then(() => {
            this.cleanInput();
          });
          this.selectedOp = null;
          this.selectedSt = null;
          // this.cleanInput();
          this.sendNotification();
          notify.success("The message has been sent successfully.");

        })
        .catch(() => {
          store.dispatch("setHideLoader")
          notify.error("An error has occurred");

        });
    },
  },

  beforeRouteEnter(to, from, next) {
    store.dispatch("setShowLoader")

    // store.dispatch("reports/show");

    store.dispatch("setHideLoader")
    next();
  },
};
</script>

<style lang="scss" scoped>
$color_1: #2f2f3b95;
$background-color_1: #f4f4f4;
$background-color_2: #fff;
$background-color_3: #e5e5e5;

.tag-title {
  height: auto;
  width: auto;
  border: 1px solid transparent;
  border-radius: 5px;
  background-color: $background-color_1;
  font-size: 11px;
  text-align: center;
  color: $color_1;
  padding-left: 5px;
  padding-right: 5px;
  margin-right: 10px;
  display: flex;
  align-items: center;
}

.email-top {
  display: flex;
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #e5e5e5;
  > h5 {
    font-weight: bold;
    margin-bottom: 0px;
  }
}
.tab-content {
  height: calc(100vh - 75px - 28.797px - 65px - 31px);
}
.inbox {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 120px - 28.797px - 65px - 31px - 50px);
  .image-container {
    flex-basis: 100%;
  }
  .media {
    padding: 20px 0 20px 0;
    max-width: 100%;
    .media-body {
      padding: 0 25px 0 0;
      max-width: calc(100% - 50px - 25px);
      .attachemnts-box {
        display: flex;
        flex-direction: column;
        padding: 10px;
        background-color: #f5f5f5;
        border-radius: 4px;
        span {
          margin-bottom: 5px;
        }
        a {
          color: #216ba5;
          cursor: pointer;
          margin-bottom: 5px;
        }
      }
      .message {
        max-width: 100%;
        overflow-wrap: break-word;
        // word-break: break-all;
      }
    }
    .other-object {
      position: relative;
      z-index: 2;
      img {
        height: 50px;
        width: 50px;
      }
    }
  }
}
.image-container {
  position: relative;
  height: auto;
  overflow: auto;
  border-bottom: 1px solid #eee;
  white-space: normal;
}
.form-select {
  padding: 6px 5px;
}
// .form-control {
//   height: calc(3em + 1rem + 2px);
// }
.right-box {
  padding: 20px;
  background-color: $background-color_2;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: calc(100vh - 70px - 28.797px - 65px - 31px);
}
.row {
  --bs-gutter-x: 0;
}
.bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 10px;
}
.input-payment {
  width: 38%;
}
.line {
  position: absolute;
  left: 22px;
  top: 50px;
  bottom: 0px;
  width: 3px;
  background-color: $background-color_3;
  opacity: 0.5;
  z-index: 1;
}

.btn {
  height: 35px;
}

.btn {
  height: 35px;
}

.small-image {
  max-width: 40px; /* Ajusta el ancho máximo deseado */
  max-height: 40px; /* Ajusta la altura máxima deseada */
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

.small-image {
  max-width: 100%;
  max-height: 100%;
}

.image-container-img:hover {
  opacity: 1;
}
</style>
