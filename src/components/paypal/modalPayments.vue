<template>
  <div class="modal-dialog modal-dialog-centered modalSize" role="document">
    <div class="modal-content">
      <div class="modal-header description">
        <div class="other-object">
          <img class="me-3 rounded-circle" :src="this.urlPhoto" alt="" />
        </div>
        <div class="nameTitle">
          <h5
            class="modal-title"
            style="
              text-align: left;
              font-weight: bold;
              font-family: Rubik, sans-serif;
            "
          >
            Add Reward
          </h5>
          <!-- <button
            class="btn-close"
            type="button"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button> -->
        </div>

        <div class="descriptionHeader">
          <span style="text-align: left; font-family: Rubik, sans-serif">
            Pay <strong>{{ hackerName }}</strong> for their hard work
          </span>
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
                >Confirmed Rating</span
              >
              <div class="row">
                <div class="col-sm-12">
                  <span :style="reportStyle(rating)" style="text-align: left">
                    {{ rating }}
                  </span>
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
                >Reward Amount</span
              >
              <div class="row">
                <div class="col-sm-12">
                  <input
                    class="col-sm-12"
                    type="text"
                    style="text-align: left; font-family: Rubik, sans-serif"
                    v-model="amount"
                    @input="formatAmount"
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
                >Note to Research</span
              >
              <div class="row">
                <div class="col-sm-12">
                  <input
                    class="col-sm-12"
                    type="text"
                    style="text-align: justify; font-family: Rubik, sans-serif"
                    v-model="notePayment"
                    @input="formatNote"
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
                  font-family: Rubik, sans-serif;
                "
              >
                <strong>{{ hackerName }}</strong> will be notified of this
                reward and a payment will be scheduled immediately.
              </span>                          
              <!-- <pre>{{ payment }}</pre> -->
            </div>
          </div>
        </div>
      </div>
      <div class="container-fluid mx-auto">
        <div class="modal-footer buttons">
          <button class="btn btn-primary" type="button" data-bs-dismiss="modal">
            Close
          </button>
          <button class="btn btn-success" type="button" @click="loadPayPal">
            Pay whit Paypal
          </button>
        </div>
        <div class="col-sm-12" v-if="isPayPalLoaded">
          <paypal
            :hackerName="hackerName"
            :hackerID="hackerID"
            :reportID="reportID"
            :hackerUserId="hackerUserId"
            :rating="rating"
            :clientIdPaypal="clientIdPaypal"
            :secretPaypal="secretPaypal"
            :amount="moneyAmount"
            :notePayment="notePayment"
          ></paypal>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import paypal from "../paypal/paypal.vue";
export default {
  data() {
    return {
      moneyAmount: this.payment, // Inicializa con un valor predeterminado si es necesario
      amount: this.payment, // Puedes inicializarlo con un valor predeterminado
      notePayment: "",
      isPayPalLoaded: false, // Indica si el componente PayPal está cargado
    };
  },
  props: {
    hackerName: String,
    hackerUserId: Number,
    hackerID: Number,
    reportID: Number,
    rating: String,
    clientIdPaypal: String,
    secretPaypal: String,
    urlPhoto: String,
    userNameCompany: String,
    userNameHacker: String,
    payment: Number
  },
  components: {
    paypal,
  },
  methods: {
    // Método para cargar el componente PayPal y enviar las propiedades
    loadPayPal() {
      this.isPayPalLoaded = true;
    },
    formatNote() {
      // Obtén el valor actual del input
      let inputValue = this.notePayment;

      // Establece la longitud máxima permitida
      const maxLength = 115;

      if (inputValue.length > maxLength) {
        // Si el texto supera la longitud máxima, recorta el exceso
        this.notePayment = inputValue.slice(0, maxLength);
      }
    },

    formatAmount() {
      // Obtén el valor actual del input y elimina los caracteres no numéricos
      let inputValue = this.amount.replace(/[^0-9.]/g, "");

      // Convierte el valor a un número de punto flotante
      let floatValue = parseFloat(inputValue);

      // Establece el límite máximo para la cantidad
      const maxAmount = 100000;

      if (!isNaN(floatValue)) {
        // Si el valor supera el límite, ajústalo al límite máximo
        if (floatValue > maxAmount) {
          floatValue = maxAmount;
        }
        // Guarda el valor sin formato en otra variable
        this.moneyAmount = floatValue;

        // Formatea el valor en formato de moneda local (pesos mexicanos) sin decimales
        this.amount = floatValue.toLocaleString("es-MX", {
          style: "currency",
          currency: "MXN", // Código de moneda para pesos mexicanos
          minimumFractionDigits: 0, // Mostrar sin decimales
          maximumFractionDigits: 0, // No permitir decimales
        });
      } else {
        // Si el valor no es un número válido, simplemente asigna el valor original
        this.amount = inputValue;
      }
    },
    reportStyle(rating) {

      switch (rating) {
        case "Low":
          return { border: "3px solid #54BA4A" };
        case "Medium":
          return { border: "3px solid #FFAA05" };
        case "High":
          return { border: "3px solid #FF0000" };
        case "Critical":
          return { border: "3px solid #16C7F9" };
        default:
          return { border: "3px gray" };
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
  width: 450px;
}

.description {
  display: flex;
  flex-direction: column;
}

.descriptionHeader {
  width: auto;
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
