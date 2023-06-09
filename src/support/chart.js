import _ from "lodash"
import {onUnmounted, ref} from "vue";

const baseOptions = {
    chart: {
        //id: 'apex',
        height: 350,
        type: 'line',
        animations: {
            enabled: true,
            easing: 'linear',
            dynamicAnimation: {
                speed: 1000
            }
        },
        toolbar: {
            show: false
        },
        zoom: {
            enabled: false
        }
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'smooth'
    },
    title: {
        //text: 'Dynamic Updating Chart',
        align: 'left'
    },
    markers: {
        size: 0
    },
    xaxis: {
        type: 'datetime',
        labels: {
            show: false
        }
    },
    yaxis: {
        max: 100
    },
    legend: {
        show: false
    },
}

export function useChart(id, title) {
    const options = ref({})
    options.value = _.merge({
        chart: {
            id
        },
        title: {
            text: title
        }
    }, baseOptions)

    onUnmounted(() => {
        //destroy chart instance
    })
    return {options}
}
