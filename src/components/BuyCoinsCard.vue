<template>
  <div class="col-xxl-4 col-md-6 appointment-sec box-col-6">
    <div class="card">
      <div class="card-header card-no-border">
        <div class="header-top gap-1">
          <h5>Pay Reports</h5>
          <!-- Información para el DropDown -->
          <!-- <Dropdown :dropdownItems="customItems" /> -->
        </div>
      </div>

      <div class="card-body pt-0">
        <form class="theme-form crypto-form">
          <div class="mb-3">
            <div class="mb-3">
              <label>Select the report</label>
                <select class="form-select" v-model="selected" @change="selectedReportId">
                  <option v-for="(report, index) in reports" :key="index" :value="index">{{ report.title }}</option>
                </select>
            </div>
          </div>
          <div class="mb-3 pt-2">
            <div class="mb-3">
              <label>Select Shared or Individual payment</label>
              <select class="form-select">
                <option>Individual</option>
                <option>Shared</option>
              </select>
            </div>
          </div>
          <div class="mb-3 pt-2 pb-3">
            <label class="form-label f-light" for="coin">Enter Payment</label>
            <div class="position-relative" >
              <input
                    class="form-control"
                    type="text"
                    style="text-align: left; font-family: Rubik, sans-serif"
                    v-model="payment"
                    @input="formatAmount"
                  />
            </div>
          </div>
          <button 
             class="btn btn-primary btn-hover-effect w-100"
              type="button"
              data-bs-toggle="modal"
              data-original-title="test"
              data-bs-target="#grid-modal"
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
                :payment="moneyAmount"
              ></modalPayments>
            </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import Dropdown from "../pages/DropDown1.vue";
const customItems = [
  { label: "Weekly", link: "#" },
  { label: "Monthly", link: "#" },
  { label: "Yearly", link: "#" },
];
</script>

<script>
import { mapState } from "vuex";
import axios from "axios";
import modalPayments from "../components/paypal/modalPayments.vue"
export default {
  components: {
    modalPayments,
  },
  data() {
    return {
      selected: null, // Almacena el ID del reporte seleccionado
      valuePayment: null,

      //Payment Props
      hackerName: "",
      hackerUserId: "",
      hackerID: "",
      rating: "",
      clientIdPaypal: null,
      secretPaypal: null,
      urlPhoto: "",
      companyName: "",
      reportID: "",
      moneyAmount: 0,
      payment: 0,
    };
  },
  computed: {
    ...mapState({
      reports: (state) => state.reports.reports,
    })
  },
  methods: {
    updatePayment() {
      this.payment = this.valuePayment;
    },
    selectedReportId() {
      this.getDataPayment(this.reports[this.selected]);
    },
    async getDataPayment(report) {

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_CLIENT}/usersconfig/${report.hacker_id}`
        );
        // Asignar los valores a las variables del componente
        this.clientIdPaypal = response.data.clientIdPaypal;
        this.secretPaypal = response.data.secretPaypal;
        this.hackerName = report.hacker.username;
        this.hackerUserId = report.hacker.user_id;
        this.hackerID = report.hacker.id;
        this.rating = report.rating;
        this.urlPhoto = report.hacker.photo;
        // this.companyName = this.report.company.company_user_name;
        this.reportID = report.id;
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    },
    formatAmount() {
      // Obtén el valor actual del input y elimina los caracteres no numéricos
      let inputValue = this.payment.replace(/[^0-9.]/g, "");

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
        this.payment = floatValue.toLocaleString("es-MX", {
          style: "currency",
          currency: "MXN", // Código de moneda para pesos mexicanos
          minimumFractionDigits: 0, // Mostrar sin decimales
          maximumFractionDigits: 0, // No permitir decimales
        });
      } else {
        // Si el valor no es un número válido, simplemente asigna el valor original
        this.payment = inputValue;
      }
    },
  },
};
</script>
