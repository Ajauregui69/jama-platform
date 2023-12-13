<script setup>
import { ref } from 'vue';
import { onMounted } from 'vue';
import { chart } from '../../data/comon'

const chartData = ref(chart);

const props = defineProps({
    dataBar: {
        type: Object,
        required: true,
    },
    radialBar: {
        type: Object,
        required: true,
    },
});

// Change value in the original common.js file
onMounted(() => {
    Object.keys(props.dataBar).forEach((key, index) => {
        chartData.value[`progress${index + 1}`].options.title.text = props.dataBar[key].title;
        chartData.value[`progress${index + 1}`].series[0].data = [props.dataBar[key].barValue];
        chartData.value[`progress${index + 1}`].options.subtitle.text = `${props.dataBar[key].barValue}%`;
    });

    chartData.value.chart6.series.length = 0;
    chartData.value.chart6.series.push(...props.radialBar.values);
    chartData.value.chart6.options.labels = props.radialBar.labels

    chartData.value.chart6.options.plotOptions.radialBar.dataLabels.total.formatter = function () {
        const valorPersonalizado = props.radialBar.total;
        return valorPersonalizado.toString();
    };

});


//Variables for apexchart component
// const chart4 = chart.chart4
const chart6 = chart.chart6
const progress1 = chart.progress1
const progress2 = chart.progress2
const progress3 = chart.progress3
const progress4 = chart.progress4
const progress5 = chart.progress5

</script>
<template>
    <!-- Chart widget with bar chart Start-->
    <div class="row">
        <div class="col-xl-6 col-lg-12 box-col-6 xl-50">
            <div class="card">
                <div class="card-header">
                    <h5>Resolved</h5>
                </div>
                <div class="card-body">
                    <div class="chart-container skill-chart">
                        <apexchart height="350" type="radialBar" :options="chart6.options" :series="chart6.series">
                        </apexchart>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-xl-6 col-lg-12 box-col-6 xl-50">
            <div class="card">
                <div class="card-header pb-4 pt-4">
                    <div class="header-top">
                        <h5>Top Vulnerabilities</h5>

                    </div>
                </div>
                <div class="card-body">
                    <div class="chart-container progress-chart">
                        <apexchart height="70" type="bar" :options="progress1.options" :series="progress1.series">
                        </apexchart>
                    </div>
                    <apexchart height="70" type="bar" :options="progress2.options" :series="progress2.series"></apexchart>
                    <apexchart height="70" type="bar" :options="progress3.options" :series="progress3.series"></apexchart>
                    <apexchart height="70" type="bar" :options="progress4.options" :series="progress4.series"></apexchart>
                    <apexchart height="70" type="bar" :options="progress5.options" :series="progress5.series"></apexchart>
                </div>
            </div>
        </div>
    </div>
    <!-- Chart widget with bar chart Ends-->
</template>

