
<template>
  <Breadcrumbs title="Companies" />
  <div class="container-fluid">
    <div class="user-profile">
      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-header">
              <h3>Companies</h3>
            </div>
            <div class="card-block row">
              <div class="col-sm-12 col-lg-12 col-xl-12">               
                <!-- <div class="table-responsive">
                  <table class="table table-hover">      
                    <thead class="table-dark">
                      <tr>
                        <th scope="col">OrderId</th>
                        <th scope="col">Payer</th>
                        <th scope="col">Payee</th>
                        <th scope="col">Report Name</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Date</th>
                        <th scope="col">Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="(payment, index) in payments"
                        :key="index"
                      >
                        <th scope="row">{{ payment.order_id }}</th>
                        <td class="no-uppercase">{{ payment.user.email }}</td>
                        <td class="no-uppercase">{{ payment.report.title }}</td>
                        <td class="no-uppercase">
                          {{ payment.hacker.username }}
                        </td>
                        <td class="no-uppercase">
                          {{ `$ ${payment.amount}` }}
                        </td>
                        <td class="no-uppercase">
                          {{ formattedDate(payment.created_at) }}
                        </td>
                        <td>
                          <button
                            class="btn btn-pill btn-primary btn-air-primary active"
                            type="button"
                            title="btn btn-pill btn-primary btn-air-primary active"
                            data-bs-toggle="modal"
                            data-original-title="test"
                            data-bs-target="#grid-modal_invoice"
                            @click="openInvoiceModal(index)"
                          >
                            Ticket
                          </button>
                          <div
                            class="modal fade"
                            id="grid-modal_invoice"
                            tabindex="-1"
                            role="dialog"
                            aria-labelledby="grid-modal"
                            aria-hidden="true"
                          >
                            <modal-invoice
                              :ticketID="ticketID"
                              :hackerUsName="hackerUsName"
                              :hackerPhoto="hackerPhoto"
                              :notePayment="notePayment"
                              :datePayment="datePayment"
                              :reportTitle="reportTitle"
                              :severity="severity"
                              :rating="rating"
                              :amount="amount"
                            >
                            </modal-invoice>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div> -->
              </div>
            </div>
          </div>
          <!-- <div v-if="payments.length === 0" class="empty-card">
            <h2> No Payments Processed. <br> Hackers may work for love, but they prefer cash! </h2>      
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import { mapState } from "vuex";
// import { useLoading } from "vue3-loading-overlay";
// import store from "../../store";
// import modalInvoice from "../payment/modalInvoice.vue";

export default {
  // components: { modalInvoice },
  // data() {
  //   return {
  //     isRowHighlighted: -1, // Inicialmente ninguna fila resaltada
  //     ticketID: "",
  //     hackerUsName: "",
  //     hackerPhoto: "",
  //     notePayment: "",
  //     datePayment: "",
  //     reportTitle: "",
  //     severity: "",
  //     rating: "",
  //     amount: "",
  //   };
  // },
  // computed: {
  //   ...mapState({
  //     payments: (state) => state.payments.payments,
  //   }),
  // },
  // methods: {
  //   // Esta función se llama cuando se hace clic en el botón "Invoice"
  //   openInvoiceModal(index) {
  //     const payment = this.payments[index]; // Obtiene el elemento en el índice dado
  //     this.ticketID = payment.id;
  //     this.hackerUsName = payment.hacker.username;
  //     this.notePayment = payment.note;
  //     this.datePayment = this.formattedDate(payment.created_at);
  //     this.hackerPhoto = payment.hacker.photo;
  //     this.reportTitle = payment.report.title;
  //     this.severity = payment.report.severity;
  //     this.rating = payment.report.rating;
  //     this.amount = payment.amount;

  //     // Abre el modal aquí (puedes usar un sistema de modal específico)
  //     // Por ejemplo, mostrar un modal usando Bootstrap
  //     $("#grid-modal_invoice").modal("show");
  //   },
  //   highlightRow(index) {
  //     this.isRowHighlighted = index;
  //   },
  //   unhighlightRow() {
  //     this.isRowHighlighted = -1; // Para desactivar el resaltado cuando se quita el cursor
  //   },
  //   formattedDate(dateString) {
  //     const date = new Date(dateString);
  //     const options = {
  //       year: "numeric",
  //       month: "2-digit",
  //       day: "2-digit",
  //       hour: "2-digit",
  //       minute: "2-digit",
  //     };
  //     return date.toLocaleString("en-EN", options);
  //   },
  // },
  // beforeRouteEnter(to, from, next) {
  //   store.dispatch("setShowLoader")

  //   store.dispatch("payments/show");

  //   store.dispatch("setHideLoader")
  //   next();
  // },
};
</script>
<style scoped lang="scss">
td.no-uppercase {
  text-transform: none;
}
.table-hover tbody tr:hover {
  background-color: lighten(
    #d3d5f7,
    100%
  ); 
}

.empty-card {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: gray;
}
</style>
