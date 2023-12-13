<template>
    <Breadcrumbs main="Widgets" title="Chart" />

    <div class="container-fluid">
        <topChart />
        <barChart />
        <smallChart />
        <div class="row">
            <stockChart />
            <monthlyChart />
        </div>
    </div>
</template>
<script>
import topChart from '../../components/chart/topChart.vue'
import barChart from '../../components/chart/barChart.vue'
import smallChart from '../../components/chart/smallChart.vue';
import stockChart from '../../components/chart/stockChart.vue';
import monthlyChart from '../../components/chart/monthlyChart.vue';

export default {
    components: {
        topChart,
        barChart, smallChart,
        stockChart, monthlyChart
    }
}
</script>