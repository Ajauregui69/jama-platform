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
            Add Vulnerability
          </h5>
        </div>
      </div>
      <div class="modal-body grid-showcase">
        <div class="container-fluid bd-example-row">
          <div class="row">
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
          </div>
          <div class="row">
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
          </div>
          <div class="row down">
            <div class="col-sm-12">
              <span
                style="
                  text-align: left;
                  border: none;
                  font-weight: bold;
                  font-family: Rubik, sans-serif;
                "
                >External id</span
              >
              <div class="row">
                <div class="col-sm-12">
                  <input
                    class="form-control"
                    type="text"
                    style="text-align: justify; font-family: Rubik, sans-serif"
                    v-model="external_id"
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
          <button class="btn btn-success" type="button" @click="addVuln">
            Add
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { toast } from "vue3-toastify";

export default {
  data() {
    return {
      vuln_name: "",
      description: "",
      external_id: "",
    };
  },
  setup() {
    const notify = toast;

    return {
      notify,
    };
  },
  // props: {
  //   hackerName: String,
  //   hackerUserId: Number,
  //   hackerID: Number,
  //   reportID: Number,
  //   rating: String,
  //   clientIdPaypal: String,
  //   secretPaypal: String,
  //   urlPhoto: String,
  //   userNameCompany: String,
  //   userNameHacker: String,
  //   payment: Number
  // },
  methods: {
    // Método para cargar el componente PayPal y enviar las propiedades
    addVuln() {
      if(this.vuln_name && this.description && this.external_id){
        axios.post(`${import.meta.env.VITE_API_CLIENT}/vulns`, {
          name: this.vuln_name,
          description: this.description,
          external_id: this.external_id,
        })
        .then(() => {
          // La vulnerabilidad se agregó correctamente
          document.getElementById('btnClose').click();
          this.notify.success("The vulnerability has been added successfully.");
        })
        .catch((e) => {
          // store.dispatch("setHideLoader");
          this.notify.error(e.message);
        });;
      }else{
        this.notify.error("Incomplete input.");
      }
    },
    // formatNote() {
    //   // Obtén el valor actual del input
    //   let inputValue = this.notePayment;

    //   // Establece la longitud máxima permitida
    //   const maxLength = 115;

    //   if (inputValue.length > maxLength) {
    //     // Si el texto supera la longitud máxima, recorta el exceso
    //     this.notePayment = inputValue.slice(0, maxLength);
    //   }
    // },
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
  width: 550px;
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
