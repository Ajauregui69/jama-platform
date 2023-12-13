<template>
  <div class="col-sm-12">
    <div class="card hovercard text-center">
      <div
        class="cardheader"
        :style="{
          'background-image': `url(${program.banner})`,
        }"
      ></div>
      <div class="user-image">
        <div class="avatar">
          <img
            id="profile-tour"
            alt=""
            :src="`${program.photo}`"
            data-intro="This is Profile image"
          />
        </div>
      </div>
      <div class="info">
        <div
          class="row"
          data-intro="This is the your details"
          id="info-bar-tour"
        >
          <div class="col-sm-6 col-lg-4 order-sm-1 order-xl-0">
            <div class="row">
              <div class="col-md-6">
                <div class="ttl-info text-start">
                  <h6><i class="fa fa-envelope"></i>Reports Resolved</h6>
                  <span>{{report.reportsCount}}</span>
                </div>
              </div>
              <div class="col-md-6">
                <div class="ttl-info text-start ttl-sm-mb-0">
                  <h6><i class="fa fa-calendar"></i>Date Of Creation</h6>
                  <span>{{ createdAt }}</span>
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-12 col-lg-4 order-sm-0 order-xl-1">
            <div class="user-designation">
              <div class="title">
                <a target="_blank" href="">{{ program.name }}</a>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-4 order-sm-2 order-xl-2">
            <div class="row">
              <div class="col-md-6">
                <div class="ttl-info text-start ttl-xs-mt">
                  <h6><i class="fa fa-phone"></i>Assets in Scope</h6>
                  <span>{{ assets.length }}</span>
                </div>
              </div>
              <div class="col-md-6">
                <div class="ttl-info text-start ttl-sm-mb-0">
                  <h6><i class="fa fa-location-arrow"></i>Web Page</h6>
                  <span>{{ program.url }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="follow">
          <div class="row">
            <div class="col-4">
              <div class="follow-num counter">{{ convertTime(report.averageTriaged) }}</div>
              <span>Average time to triage</span>
            </div>
            <div class="col-4">
              <div class="follow-num counter">{{ convertTime(report.averageResponse) }}</div>
              <span>Average time to first response</span>
            </div>
            <div class="col-4">
              <div class="follow-num counter">{{ convertTime(report.averageResolved) }}</div>
              <span>Average time to resolution</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import moment from "moment";
export default {
  params: {
    detail: {
      type: Object,
      required: true,
      default: Object,
    },
  },
  computed: {
    ...mapState({
      program: (state) => state.programs.program,
      report: (state) => state.programs.programReport,
      assets: (state) => state.programs.assets,
    }),
    createdAt() {
      return moment(this.program.created_at).format("Do MMM YY");
    },
  },
  methods: {
    getIconUrl(iconName) {
      const baseIconUrl = `${
        import.meta.env.BASE_URL
      }src/assets/images/logo/dash_jama.png`;
      return `${baseIconUrl}#${iconName}`;
    },
    convertTime(miliseconds) {
      if(miliseconds == null){
          return ("No time yet")
      } else if (miliseconds < 3600000) {
          return (miliseconds / (1000 * 60)).toFixed(0) + " minutes";
      } else if (miliseconds < 86400000) {
          return (miliseconds / (1000 * 60 * 60)).toFixed(0) + " hours";
      } else if (miliseconds < 2592000000) {
          return (miliseconds / (1000 * 60 * 60 * 24)).toFixed(0) + " days";
      } else {
          return (miliseconds / (1000 * 60 * 60 * 24 * 30)).toFixed(0) + " months";
      }
    }
  },
};
</script>

<style scoped></style>
