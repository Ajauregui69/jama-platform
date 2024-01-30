
<template>
  <Breadcrumbs title="Users"/>
  <div class="container-fluid">
    <div class="user-profile">
      <div class="row">
        <div class="col-sm-12">
          <div class="card">
            <div class="card-header">
              <h3>Users</h3>
            </div>
            <div class="card-block row">
              <div class="col-sm-12 col-lg-12 col-xl-12">
                <!-- <pre>
                  {{ hackers }}
                </pre>      -->
                <DataTable :rows="hackers.hackers" striped></DataTable> 
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
  computed: {
    ...mapState({
      hackers: (state) => state.usersList.users,
    }),
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch("setShowLoader")

    store.dispatch("usersList/hackers");

    store.dispatch("setHideLoader")
    next();
  },
};
</script>
<!-- <style scoped lang="scss">
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
</style> -->
