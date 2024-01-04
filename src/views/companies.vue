
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
                <!-- <pre>
                  {{ companies.company }}
                </pre> -->
                <div class="table-responsive">
                  <DataTable :rows="companies.company"></DataTable>  
                </div>
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
import { mapState } from "vuex";
import store from "../store";
import { DataTable } from "@jobinsjp/vue3-datatable"
import "@jobinsjp/vue3-datatable/dist/style.css"


export default {
  components: {
    DataTable,
  },
  data() {
    return {
      isRowHighlighted: -1, // Inicialmente ninguna fila resaltada
    };
  },
  computed: {
    ...mapState({
      companies: (state) => state.usersList.users,
    }),
  },


  methods: {
    highlightRow(index) {
      this.isRowHighlighted = index;
    },
    unhighlightRow() {
      this.isRowHighlighted = -1; // Para desactivar el resaltado cuando se quita el cursor
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
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch("setShowLoader")

    store.dispatch("usersList/companies");

    store.dispatch("setHideLoader")
    next();
  },
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
