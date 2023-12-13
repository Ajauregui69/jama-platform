<script setup>
import DropDown2 from "../pages/DropDown2.vue";


const components = {
  DropDown2,
};


const props = defineProps ({
  resentSales: {
    type: Object,
    require: true
  }
})


</script>
<template>
  <div class="col-xxl-4 col-md-6 appointment-sec box-col-6">
    <div class="appointment">
      <div class="card" style="height: 457.703px;">
        <div class="card-header card-no-border">
          <div class="header-top">
            <h5 class="m-0">Recent Payments</h5>
            <!-- <div class="card-header-right-icon">
              <DropDown2 />
            </div> -->
          </div>
        </div>
        <div class="card-body pt-0">
          <div v-if="resentSales.length === 0"  class="empty-card">
            <h2> No recent payments yet </h2>      
          </div>
          <div class="appointment-table table-responsive">
            <table class="table table-bordernone">
              <tbody>
                <tr v-for="item in resentSales" :key="item">
                  <td>
                    <img
                      class="profile-img rounded-circle"
                      style="width: 42px; height: 42px;"
                      :src="item.image"
                      alt="user"
                    />
                  </td>
                  <td class="img-content-box">
                    <a class="d-block f-w-500" href="user-profile.html">{{
                      item.name
                    }}</a
                    ><span class="f-light">{{ item.time }}</span>
                  </td>
                  <td class="text-end">
                    <p class="m-0 font-success">{{ item.amount }}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>

.empty-card {
  width: 100%;
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: gray;
}

.empty-card h2{
  font-size: 25px;
}

</style>