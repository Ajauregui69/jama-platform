<script>
import { inboxData } from "../data/email/email";
import store from "../store";
import { useLoading } from "vue3-loading-overlay";
import { mapState } from "vuex";
import { reports } from "../data/email/reports";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const goToAllReports = () => {
      router.push({ name: "ReportsIndex" }); // Cambia a la ruta 'ReportsIndex'
    };
    const goToTriagedReports = () => {
      router.push({ name: "ReportsTriaged" }); // Cambia a la ruta 'TriagedReports'
    };
    const goToDuplicatesReports = () => {
      router.push({ name: "ReportsDuplicates" }); // Cambia a la ruta 'ReportsDuplicates'
    };
    const goToPtReviewReports = () => {
      router.push({ name: "ReportsPtReview" }); // Cambia a la ruta 'ReportsPtReview'
    };
    const goToPtPayReports = () => {
      router.push({ name: "ReportsPtPay" }); // Cambia a la ruta 'ReportsPtPay'
    };
    return {
      goToAllReports,
      goToTriagedReports,
      goToDuplicatesReports,
      goToPtReviewReports,
      goToPtPayReports,
    };
  },
  data() {
    return {
      inputData: "",
      inboxData: inboxData,
      datosRecibidos: "",
    };
  },

  created() {
    // Manage the event 'notification' to receive data from the server
    //this.$socket.on('message-chat', (data) => {
    //    this.datosRecibidos = data.message;
    //});
  },

  computed: {
    ...mapState({
      reports: (state) => state.reports.reports,
      reportsTriaged: (state) => state.reports.reportsTriaged,
      reportsNew: (state) => state.reports.reportsNew,
      reportsPendingPay: (state) => state.reports.reportsPendingPay,
      reportsPaid: (state) => state.reports.reportsPaid,
      reportsAll: (state) => state.reports.reportsAll,
      reportsDuplicated: (state) => state.reports.reportsDuplicated
    }),
  },

  methods: {
    // Manage the event 'notification' to send data to the server
    //sendNotification() {
    //    const data = { message: this.inputData, class: "b-l-primary border-4", date: "1hr" };
    //    this.$socket.emit('notification', data);
    //}
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch("setShowLoader")

    const pathSegments = to.path.split('/').filter(segment => segment !== '');
    store.dispatch("reports/index", pathSegments[1]);
    store.dispatch("setHideLoader")
    next();
  },

  beforeRouteUpdate(to, from, next) {
    store.dispatch("setShowLoader")

    const pathSegments = to.path.split('/').filter(segment => segment !== '');
    store.dispatch("reports/index", pathSegments[1]);
    if(to.params.id){
      store.dispatch("reports/show", to.params.id);
    }    
    store.dispatch("setHideLoader")
    next();
  },
};
</script>

<template>
  <Breadcrumbs title="Reports" />

  <ul class="top-nav nav nav-tabs border-tab" id="top-tab" role="tablist">
    <li class="">
      <a
        @click="goToAllReports"
        class="top-box active"
        id="top-all-tab"
        data-bs-toggle="tab"
        href="#all"
        role="tab"
        aria-controls="top-all"
        aria-selected="true"
        >{{ `All (${reportsAll})` }}</a
      >
    </li>
    <li class="">
      <a
        @click="goToTriagedReports"
        class="top-box"
        id="top-all-tab"
        data-bs-toggle="tab"
        href=""
        role="tab"
        aria-controls="top-all"
        aria-selected="true"
        >{{ `Triaged (${reportsTriaged})` }}</a
      >
    </li>
    <li class="">
      <a
        @click="goToDuplicatesReports"
        class="top-box"
        id="duplicates-top-tab"
        data-bs-toggle="tab"
        href=""
        role="tab"
        aria-controls="top-duplicates"
        aria-selected="false"
        >{{ `Duplicates (${reportsDuplicated})` }}</a
      >
    </li>
    <li class="">
      <a
        @click="goToPtReviewReports"
        class="top-box"
        id="review-top-tab"
        data-bs-toggle="tab"
        href=""
        role="tab"
        aria-controls="top-review"
        aria-selected="false"
        >{{ `Pending to review (${reportsNew})` }}</a
      >
    </li>
    <li class="">
      <a
        @click="goToPtPayReports"
        class="top-box"
        id="pay-top-tab"
        data-bs-toggle="tab"
        href=""
        role="tab"
        aria-controls="top-pay"
        aria-selected="false"
        >{{ `Pending to pay (${reportsPendingPay})` }}</a
      >
    </li>
  </ul>
  <div class="tab-content" id="top-tabContent">
    <router-view />
  </div>
</template>

<style lang="scss" scoped>
.tab-content {
  height: calc(100vh - 75px - 28.797px - 65px - 31px);
}

.top-nav {
  padding-bottom: 10px;
  margin-bottom: 0;
  border-bottom: 0px;
}

.top-box {
  font-weight: 600;
  font-size: 14px;
  color: #59667a;
  text-align: center;
  padding: 11px 25px;
  transition: 0.3s;
}

.top-box:hover {
  color: var(--theme-deafult);
}

.top-box.active {
  color: var(--theme-deafult);
  border-bottom: 3px solid #222ac3;
}

.nav-card.active {
  background-color: #f5f5f5;
  border-radius: 5px 0 0 5px;
  color: var(--theme-deafult);
  border-left: 5px solid #222ac3;
}
</style>
