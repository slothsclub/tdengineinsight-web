import _ from "lodash"
import {ref} from "vue";

const stockBaseOptions = {
    credits: {
        enabled: false
    },
    accessibility: {
        enabled: false
    },
    rangeSelector: {
        inputEnabled: false
    },
    exporting: {
        enabled: true
    },
    yAxis: {
        opposite: false,
        plotLines: [{
            value: 0,
            width: 2,
            color: 'silver'
        }]
    },
    plotOptions: {
        series: {
            compare: 'percent',
            showInNavigator: true
        }
    },
    tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.change}%)<br/>',
        valueDecimals: 2,
        split: true
    },
    series: [],
}
const lineBaseOptions = {
    accessibility: {
        enabled: false
    },
    credits: {
        enabled: false
    },
}

const areaBaseOptions = {
    credits: {
        enabled: false
    },
    accessibility: {
        enabled: false
    },
    chart: {
        type: 'area'
    },
    title: {
        text: null
    },
    plotOptions: {
        area: {
            marker: {
                enabled: false,
                symbol: 'circle',
                radius: 2,
                states: {
                    hover: {
                        enabled: true
                    }
                }
            }
        }
    },
    xAxis: {
        type: "datetime"
    },
    series: [],
}

export function useChart() {
    const getStockChartOptions = () => {
        return ref(_.merge(_.cloneDeep(stockBaseOptions), {}))
    }

    const getLineChartOptions = () => {
        return ref(_.merge(_.cloneDeep(lineBaseOptions), {}))
    }

    const getAreaChartOptions = (title) => {
        return ref(_.merge(_.cloneDeep(areaBaseOptions), {
            title: {
                text: title
            }
        }))
    }

    return {
        getStockChartOptions,
        getLineChartOptions,
        getAreaChartOptions
    }
}
