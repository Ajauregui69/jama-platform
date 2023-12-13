<script setup>
import DropDown2 from "../pages/DropDown2.vue";
// import { activities } from "../data/default";

const components = {
  DropDown2,
};

const props = defineProps ({
  activities:{
    type: Object,
    require: true
  }
})




</script>
<template>
  <div class="col-xxl-4 col-xl-5 col-md-6 col-sm-7 notification box-col-6">
    <div class="card height-equal"  style="height: 457.703px;">
      <div class="card-header card-no-border">
        <div class="header-top">
          <h5 class="m-0">Activity</h5>
          <!-- <div class="card-header-right-icon">
            <DropDown2 />
          </div> -->
        </div>
      </div>
      <div class="card-body pt-0">
        <div v-if="activities.length === 0" class="empty-card">
            <h2> No recent activity yet </h2>      
        </div>
        <ul>
          <li class="d-flex" v-for="item in activities" :key="item">
            <div :class="item.class"></div>
            <div class="w-100 ms-3">
              <p class="d-flex justify-content-between mb-2">
                <span class="date-content light-background">{{
                  item.date
                }}</span
                ><span>{{ item.day }}</span>
              </p>
              <h6>{{ item.title }}<span class="dot-notification"></span></h6>
              <p class="f-light">
                {{ item.decription }}
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

