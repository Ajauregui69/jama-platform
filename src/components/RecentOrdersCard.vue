<script setup>
import { apexDashboard } from "../data/comon";
import DropDown3 from "../pages/DropDown3.vue";

const components = {
  DropDown3,
};

const props = defineProps({
  items: {
    type: Object,
    require: true,
  },
});

const profit = props.items[2].profit;

const data = () => ({
  apexDashboard,
});
</script>
<template>
  <div class="col-xxl-5 col-xl-7 col-md-6 col-sm-5 box-col-6">
    <div class="card height-equal">
      <div class="card-header card-no-border">
        <div class="header-top">
          <h5>Recent Orders</h5>
          <!-- <div class="card-header-right-icon">
            <DropDown3 />
          </div> -->
        </div>
      </div>
      <div class="card-body pt-3">
        <div class="row recent-wrapper">
          <div class="col-xl-6">
            <div class="recent-chart">
              <apexchart
                height="290.7"
                type="radialBar"
                :options="apexDashboard.options4"
                :series="profit"
              ></apexchart>
            </div>
          </div>
          <div class="col-xl-6">
            <ul class="order-content">
              <li v-for="item in items" :key="item">
                <span :class="item.class"> </span>
                <div>
                  <span class="f-light f-w-500">{{ item.status }}</span>
                  <h4 class="mt-1 mb-0">
                    {{ item.orders
                    }}<span class="f-light f-14 f-w-400 ms-1"
                      >{{ item.orderperiod }}
                    </span>
                  </h4>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
