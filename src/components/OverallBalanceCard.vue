<script setup>
import DropDown1 from "../pages/DropDown1.vue";
import { overallbalance } from "../data/default.js";
import { apexDashboard } from "../data/comon.js";
import { onMounted } from "vue";
import { ref } from "vue";

const apexDashData = ref(apexDashboard);

const components = {
  DropDown1,
};

const data = () => ({
  apexDashboard,
  overallbalance,
});

const props = defineProps({
  overallGraph: {
    type: Object,
    require: true,
  },
});

onMounted(() => {
  apexDashData.value.series3[0].name = props.overallGraph.nameBot;
  apexDashData.value.series3[0].data = props.overallGraph.dataBot;
  apexDashData.value.series3[1].name = props.overallGraph.nameTop;
  apexDashData.value.series3[1].data = props.overallGraph.dataTop;
});
</script>
<template>
  <div class="col-xxl-7 col-lg-12 box-col-12">
    <div class="card">
      <div class="card-header card-no-border">
        <h5>Overall balance</h5>
      </div>
      <div class="card-body pt-0 pb-0">
        <div class="row m-0 overall-card">
          <div class="col-xl-12 col-md-12 col-sm-7 p-0">
            <div class="chart-right">
              <div class="row">
                <div class="col-xl-12">
                  <div class="card-body p-0">
                    <div class="current-sale-container">
                      <apexchart
                        height="305"
                        type="bar"
                        :options="apexDashboard.options3"
                        :series="apexDashboard.series3"
                      ></apexchart>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xl-3 col-md-12 col-sm-5 p-0">
            <div class="row g-sm-4 g-2">
              <div
                class="col-xl-12 col-md-4"
                v-for="item in overallbalance"
                :key="item"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
