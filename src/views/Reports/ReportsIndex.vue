<template>
  <div class="reports-index">
    <div
      class="tab-pane fade show active"
      id="top-all"
      role="tabpanel"
      aria-labelledby="top-all-tab"
    >
      <div class="row">
        <div class="nav-horizontal col-sm-3 tabs-responsive-side line-tab-left">
          <form class="form-center">
            <div class="s-group">
              <div class="icon"><i class="fa fa-search"></i></div>
              <input
                class="search-inp"
                type="search"
                placeholder="Search.."
                data-original-title=""
                title=""
              />
            </div>
          </form>
          <div class="over">
            <div
              class="nav flex-column nav-pills border-tab nav-left"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <a
                v-for="(report, $r) in reports"
                :key="$r"
                class="nav-card"
                :class="{ active: $r === 0 }"
                data-bs-toggle="pill"
                id="v-pills-home-tab"
                href="#v-pills-home"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
                @click="showDetail(report.id)"
              >
                <div class="org-box">
                  <div class="body">
                    <p class="title">{{ `#${report.id} ${report.title}` }}</p>
                    <div class="align-second">
                      <p class="client">{{ `To: ${report.program.name} •` }}</p>
                      <div class="tag" :style="reportStyle(report.rating)">
                        {{ report.rating }}
                      </div>
                    </div>
                  </div>
                  <div class="date">
                    <p>1 year ago</p>
                  </div>
                </div>
                <div class="border_btm"></div>
              </a>
            </div>
          </div>
        </div>
        <div class="card-right col-sm-9">
          <div v-if="reports.length === 0" class="empty-card">
            <h2> You might be wondering, 'Where Are All the Reports?' <br> Well, the truth is, there are none!</h2>      
          </div>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { inboxData } from "../../data/email/email";
import { mapState } from "vuex";
export default {
  data() {
    return {
      inputData: "",
      inboxData: inboxData,
      datosRecibidos: "",
    };
  },
  computed: {
    ...mapState({
      reports: (state) => state.reports.reports,
    }),
    reportId() {
      return this.$route;
    },
  },
  methods: {
    reportStyle(report) {
      if (report === "Low") {
        return { backgroundColor: "#54BA4A" };
      } else if (report === "Medium") {
        return { backgroundColor: "#FFAA05" };
      } else if (report === "High") {
        return { backgroundColor: "red" };
      } else if (report === "Critical") {
        return { backgroundColor: "#16C7F9" };
      } else {
        return { backgroundColor: "gray" };
      }
    },
    showDetail(id) {
      const pathSegments = this.$route.path
        .split("/")
        .filter((segment) => segment !== "");
      this.$router.push(`/reports/${pathSegments[1]}/report/${id}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.tag {
  height: auto;
  width: auto;
  border: 1px solid transparent;
  border-radius: 20px;
  background-color: #ffaa05;
  font-size: 14px;
  text-align: center;
  color: white;
  padding-left: 5px;
  padding-right: 5px;
  margin-left: 10px;
}

.align-second {
  display: flex;
  flex-wrap: wrap;
}

.over {
  position: relative;
  height: calc(100vh - 80px - 28.797px - 65px - 31px - 50px);
  overflow: auto;
}

.nav-horizontal {
  background-color: #fff;
  height: auto;
  padding-left: 0;
  padding-right: 0px;
  padding-top: calc(var(--bs-gutter-x) * 0.5);
  padding-bottom: calc(var(--bs-gutter-x) * 0.5);
  box-shadow: 2px 0px 1px rgba(0, 0, 0, 0.03);
}

.top-box.active {
  color: var(--theme-deafult);
  border-bottom: 3px solid #222ac3;
}

.row {
  --bs-gutter-x: 0;
}

.card-right {
  padding-left: 15px;
  box-shadow: 0px 1px 3px rgba(158, 158, 158, 0.33);
}

.nav-card {
  border-left: 5px solid transparent;
}

.border_btm {
  align-items: right;
  justify-content: end;
  float: right;
  border-bottom: 1px solid #e5e5e5;
  height: 3px;
  width: 100%;
}

.nav-card.active {
  background-color: #f5f5f5;
  border-radius: 5px 0 0 5px;
  color: var(--theme-deafult);
  border-left: 5px solid #222ac3;
}

.form-center {
  width: 100%;
  border-bottom: 1px solid #e5e5e5;
}

.s-group {
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  display: flex;
  justify-content: center;
}

.s-group input {
  padding-left: 30px;
  width: 95%;
  height: 30px;
  border: solid 1px #999999;
  box-shadow: inset 0px 2px 2px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
}

.icon {
  width: 20px;
  position: absolute;
  top: 15px;
  left: 20px;
  color: #999999;
}

.nav-card a {
  height: 100%;
  width: 100%;
}

.org-box {
  display: flex;
  flex-direction: row;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: flex-start;
}

.body {
  max-width: 75%;
  margin-left: 5px;
  margin-right: 10px;
}

.title {
  font-size: 13px;
  color: #000000;
  margin-bottom: 0;
}

.client {
  font-size: 11px;
  color: #a5a5a5;
  margin-bottom: 0;
}

.date {
  margin-right: 10px;
  margin-left: auto;
}

.date p {
  font-size: 11px;
  color: #a5a5a5;
}

.empty-card {
  width: 100%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: gray;
}
</style>
