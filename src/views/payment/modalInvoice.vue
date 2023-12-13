<template>
  <div class="modal-dialog modal-dialog-centered modalSize" role="document">
    <div class="modal-content">
      <div class="container invoice" id="print">
        <div class="row">
          <div class="col-sm-12">
            <div class="card">
              <div class="card-body">
                <div>
                  <div>
                    <div class="row invo-header">
                      <div class="col-sm-6">
                        <div class="d-flex align-items-center">
                          <div class="d-flex-left">
                            <img
                              class="d-flex-object img-60"
                              src="/src/assets/images/logo/icon_jama2.png"
                              alt=""
                            />
                          </div>
                          <div class="flex-grow-1 m-l-20">
                            <h4 class="d-flex-headin">JAMA Security</h4>
                            <p>
                              <span class="no-uppercase"
                                >support@jama.com.mx</span
                              >
                            </p>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-6">
                        <div class="text-md-end text-xs-center">
                          <h3>
                            Ticket #<span class="digits counter">{{
                              ticketID
                            }}</span>
                          </h3>
                          <p>
                            Payment Due:
                            <span class="digits">{{ datePayment }}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div class="row invo-profile">
                    <div class="col-xl-4">
                      <div class="invo-profile-left">
                        <div class="d-flex">
                          <div class="d-flex-left">
                            <img
                              class="d-flex-object rounded-circle img-60"
                              :src="hackerPhoto"
                              alt=""
                            />
                          </div>
                          <div
                            class="flex-grow-1 ms-3"
                            style="display: flex; align-items: center"
                          >
                            <h4 class="d-flex-heading">
                              {{ hackerUsName }}
                            </h4>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xl-8">
                      <div class="invo-profile-right">
                        <div
                          id="project"
                          class="text-xl-end"
                          style="margin-right: 50px"
                        >
                          <h6>Note Payment</h6>
                          <p>
                            {{ notePayment }}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div class="table-responsive invoice-table" id="table">
                      <invoiceTable
                        :reportTitle="reportTitle"
                        :severity="severity"
                        :rating="rating"
                        :amount="amount"
                      />
                    </div>
                    <div class="row mt-3">
                      <div class="col-md-12">
                        <p class="legal" style="text-align: center">
                          <strong>Thank you for your Payment!</strong>
                        </p>
                        <!-- <div style="display: flex; align-content: center">
                        </div> -->
                      </div>
                      <!-- <div class="col-md-4">
                        <form class="text-end invo-pal"></form>
                      </div> -->
                    </div>
                  </div>
                </div>
                <div class="col-sm-12 text-center mt-3">
                  <button
                    class="btn btn btn-primary me-2"
                    type="button"
                    @click="myFunction()"
                  >
                    Print
                  </button>
                  <button
                    class="btn btn-secondary"
                    type="button"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import invoiceTable from "./invoiceTable.vue";
export default {
  components: {
    invoiceTable,
  },
  props: {
    ticketID: Number,
    hackerUsName: String,
    notePayment: String,
    datePayment: String,
    hackerPhoto: String,
    reportTitle: String,
    severity: String,
    rating: String,
    amount: String,
  },
  methods: {
    myFunction() {
      var printContents = document.getElementById("print").innerHTML;
      window.print(printContents);
    },
  },
};
</script>
<style lang="scss" scoped>
@media print {
  /* Establecer la orientación en horizontal */
  // @page {
  //   size: landscape;
  // }

  // .note-payment {
  //   width: 100%; /* O un ancho específico en px o cm */
  // }

  /* Ocultar los botones en la versión impresa */
  .col-sm-12.text-center {
    display: none;
  }
}
#span {
  border: none;
}
span.no-uppercase {
  text-transform: none;
}
.modalSize {
  width: 970px;
}
</style>
