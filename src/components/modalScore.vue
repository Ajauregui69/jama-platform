<template>
  <div class="modal-dialog modal-dialog-centered modalSize" role="document">
    <div class="modal-content">
      <div class="modal-header description">
        <div class="nameTitle">
          <h5
            class="modal-title"
            style="
              text-align: left;
              font-weight: bold;
              font-family: Rubik, sans-serif;
            "
          >
            Change Score
          </h5>
        </div>
        <h5
            class="modal-title"
            style="
              text-align: left;
              font-family: Rubik, sans-serif;
            "
          >
            #{{reportId}} {{reportName}}
          </h5>
      </div>
      <div class="modal-body grid-showcase">
        <div class="container-fluid bd-example-row">
          <!-- <div class="row">
            <div class="col-sm-12">
              <span
                style="
                  text-align: left;
                  border: none;
                  font-weight: bold;
                  font-family: Rubik, sans-serif;
                "
                >Name</span
              >
              <div class="row">
                <div class="col-sm-12">
                  <input
                    class="form-control"
                    type="text"
                    style="text-align: justify; font-family: Rubik, sans-serif"
                    v-model="vuln_name"
                  />
                </div>
              </div>
            </div>
          </div> -->
          <!-- <div class="row">
            <div class="col-sm-12">
              <span
                style="
                  text-align: left;
                  border: none;
                  font-weight: bold;
                  font-family: Rubik, sans-serif;
                "
                >Description</span
              >
              <div class="row">
                <div class="col-sm-12">
                  <textarea
                    class="form-control"
                    type="text"
                    style="font-family: Rubik, sans-serif; height: 150px;  vertical-align: top"
                    v-model="description"
                  ></textarea>
                </div>
              </div>
            </div>
          </div> -->
          <div class="row down">
            <div class="col-sm-12">
              <span
                style="
                  text-align: left;
                  border: none;
                  font-weight: bold;
                  font-family: Rubik, sans-serif;
                "
                >Score</span
              >
              <div class="row">
                <div class="col-sm-12">
                  <input
                    class="form-control"
                    type="text"
                    style="text-align: justify; font-family: Rubik, sans-serif"
                    v-model="score"
                    :placeholder="reportScore"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid mx-auto">
        <div class="modal-footer buttons">
          <button id="btnClose" class="btn btn-primary" type="button" data-bs-dismiss="modal">
            Close
          </button>
          <button class="btn btn-success" type="button" @click="changeScore">
            Update
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import store from "../store";
import { toast } from "vue3-toastify";

export default {
  data() {
    return {
      score: "",
    };
  },
  setup() {
    const notify = toast;

    return {
      notify,
    };
  },
  // updated(){
  //   this.score = "this.reportScore";
  // },
  props: {
    reportName: String,
    reportId: Number,
    reportScore: Number
  },
  methods: {
    // Método para cargar el componente PayPal y enviar las propiedades
    changeScore() {
      if(this.score){
        if(parseFloat(this.score) >= 0 && parseFloat(this.score) <= 10){         
          axios.put(`${import.meta.env.VITE_API_CLIENT}/score/${this.reportId}`, {
            score: this.score,
          })
          .then(() => {
            // La vulnerabilidad se agregó correctamente
            this.score = "";
            const pathSegments = this.$route.path.split('/').filter(segment => segment !== '');
            store.dispatch("reports/index", pathSegments[1]);
            document.getElementById('btnClose').click();
            this.notify.success("Score updated succesfully.");
          })
          .catch((e) => {
            // store.dispatch("setHideLoader");
            this.score = "";
            this.notify.error(e.message);
          });;
        }
        else{
          this.notify.error("Must be a number between 0 and 10.");
        }
      }else{
        this.score = "";
        this.notify.error("Incomplete input.");
      }
    },
  },
  // computed: {
  //   formattedAmount() {
  //     // Formatea el valor para mostrarlo con decimales y símbolo de dólar, por ejemplo
  //     return `$ ${parseFloat(this.moneyAmount).toFixed(2)}`;
  //   },
  // },
};
</script>
<style lang="scss" scoped>
#span {
  border: none;
}

.buttons {
  display: flex;
  justify-content: space-between;
}
.other-object {
  position: relative;
  z-index: 2;
  img {
    height: 50px;
    width: 50px;
  }
}
.modalSize {
  width: 350px;
}

.description {
  display: flex;
  flex-direction: column;
}

.descriptionHeader {
  width: auto;
}

.down{
  margin-bottom: 20px;
}

.nameTitle {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1rem;
  border-top-left-radius: calc(0.3rem - 1px);
  border-top-right-radius: calc(0.3rem - 1px);
}
</style>
