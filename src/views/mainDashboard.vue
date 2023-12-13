<script setup>
import overallCard from "../components/OverallBalanceCard.vue";
import recentOrderCard from "../components/RecentOrdersCard.vue";
import activitiesCard from "../components/ActivitiesCard.vue";
import RecentSalesCard from "../components/RecentSalesCard.vue";
import BuyCoinsCard from "../components/BuyCoinsCard.vue";
import barChart from "../components/chart/barChart.vue";

//Variables for OverallCard
// let overall = {
//   nameBot: 'Ganancia',
//   dataBot: [200, 200, 350, 400, 200, 250, 250, 350, 350, 500, 500, 300],
//   nameTop: 'Gasto',
//   dataTop: [400, 600, 700, 400, 700, 800, 800, 850, 850, 900, 900, 700]
// }
</script>

<script>
  import store from "../store";
  import { mapState } from "vuex"; 


  export default {
    async beforeRouteEnter(to, from, next) {
      await store.dispatch("reports/index");
      await store.dispatch("dashboard/dashboard");
      next();
    },
    methods:{
      formattedDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const timeDifference = now - date;

        const oneMinute = 60 * 1000;
        const oneHour = 60 * oneMinute;
        const oneDay = 24 * oneHour;
        const oneWeek = 7 * oneDay;
        const oneYear = 365 * oneDay;

        if (timeDifference < oneMinute) {
          return `${Math.floor(timeDifference / 1000)} seconds ago`;
        } else if (timeDifference < oneHour) {
          return `${Math.floor(timeDifference / oneMinute)} ${Math.floor(timeDifference / oneMinute) === 1 ? "minute" : "minutes"} ago`;
        } else if (timeDifference < oneDay) {
          return `${Math.floor(timeDifference / oneHour)} ${Math.floor(timeDifference / oneHour) === 1 ? "hour" : "hours"} ago`;
        } else if (timeDifference < oneWeek) {
          return `${Math.floor(timeDifference / oneDay)} ${Math.floor(timeDifference / oneDay) === 1 ? "day" : "days"} ago`;
        } else if (timeDifference < oneYear) {
          return `${Math.floor(timeDifference / oneWeek)} ${Math.floor(timeDifference / oneWeek) === 1 ? "week" : "weeks"} ago`;
        } else {
          return `${Math.floor(timeDifference / oneYear)} ${Math.floor(timeDifference / oneYear) === 1 ? "year" : "years"} ago`;
        }
      },

      formatDateToCustomFormat(dateString) {
        const options = {
          year: "numeric",
          month: "long",
          day: "numeric",
        };
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", options);
      }

    },
    computed: {
      ...mapState({
        dashboard: (state) => state.dashboard.dashboard
      }),

      // Variables for BarChar component "TOP VULNERABILITIES"
      barProgress () {
        if (this.dashboard && this.dashboard.vulnerabilities) {
          return{
            progress1: {
              title: this.dashboard.vulnerabilities[0]?.vuln || 'Empty', 
              barValue: this.dashboard.vulnerabilities[0]?.count.toFixed(1) || 0 
            },
            progress2: {
              title: this.dashboard.vulnerabilities[1]?.vuln || 'Empty', 
              barValue: this.dashboard.vulnerabilities[1]?.count.toFixed(1) || 0
            },
            progress3: {
              title: this.dashboard.vulnerabilities[2]?.vuln || 'Empty', 
              barValue: this.dashboard.vulnerabilities[2]?.count.toFixed(1) || 0
            },
            progress4: {
              title: this.dashboard.vulnerabilities[3]?.vuln || 'Empty', 
              barValue: this.dashboard.vulnerabilities[3]?.count.toFixed(1) || 0
            },
            progress5: {
              title: this.dashboard.vulnerabilities[4]?.vuln || 'Empty', 
              barValue: this.dashboard.vulnerabilities[4]?.count.toFixed(1) || 0
            },
          }
        }
      },

      // Variables for RadialBar component "RESOLVED"
      chartSix () {
        if (this.dashboard && this.dashboard.resolved) {
          return {
            values: [this.dashboard.resolved.critical.toFixed(1) || 0, this.dashboard.resolved.high.toFixed(1) || 0, this.dashboard.resolved.medium.toFixed(1) || 0],
            labels: ['Crítical', 'High', 'Medium'],
            total: this.dashboard.resolved.totalCount
          }
        }
      },

      //Data for RecentOrdersCard
      items () {
        if (this.dashboard && this.dashboard.recentOrders) {
          return [
            {
              status: "Duplicated",
              orders: this.dashboard.recentOrders.duplicated,
              orderperiod: "Last 6 Month",
              class: "recent-circle bg-primary"
            },
            {
              status: "Accepted",
              orders: this.dashboard.recentOrders.accepted,
              orderperiod: "Last 6 Month",
              class: "recent-circle bg-info",
            },
            {
              profit: [this.dashboard.recentOrders.total]
            }
          ];
        }
      },

      //Data for Activities Card
      activities () {
        if (this.dashboard && this.dashboard.activity) {
          const activityData = [];
    
          for (const activity of this.dashboard.activity) {
            const activityItem = {
              date: this.formatDateToCustomFormat(activity.created_at) || "",
              day: this.formattedDate(activity.created_at) || "",
              title:  "New Report" || "",
              decription: "From " + activity.sender || "",
              class:  "activity-dot-warning" || ""
            };
            
            activityData.push(activityItem);
          }

          return activityData;
          
        }
      },

      //Data for Recent Sales Card
      resentSales () {
        if (this.dashboard && this.dashboard.recentSales) {
          const activityData = [];
    
        for (const sale of this.dashboard.recentSales) {
          const activityItem = {
            image: sale.hacker.photo,
            name: sale.hacker.name + " " + sale.hacker.last_name,
            time:  this.formattedDate(sale.created_at),
            amount: "$" + sale.amount.toFixed(2)
          };
          
          activityData.push(activityItem);
        }

        return activityData;

        }
      },

      overall(){
        if (this.dashboard && this.dashboard.overall) {
          return {
            nameBot: 'Accepted',
            dataBot: this.dashboard.overall[0].data,
            nameTop: 'Duplicated',
            dataTop: this.dashboard.overall[1].data
          }
        }
      }

      

    }
  }
</script>

<template>
  <div>
    <div class="container-fluid">
      <Breadcrumbs title="Dashboard" />
    </div>
    <div class="container-fluid" v-if="dashboard && dashboard.vulnerabilities && dashboard.resolved">
      <bar-chart :dataBar="barProgress" :radialBar="chartSix" />
      <div class="row widget-grid">
        <overall-card :overallGraph="overall" />
        <recent-order-card :items="items" />
        <activities-card :activities="activities" />
        <recent-sales-card :resentSales="resentSales" />
        <buy-coins-card />
      </div>
    </div>
  </div>
</template>


<style scoped></style>