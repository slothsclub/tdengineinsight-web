import tdengineFunctions from "./tdengine-functions.js";

export const sqlConfig = {
    pagination: {
        offset: 0,
        limit: 20,
        current: 1
    },
    orderBy: {
        field: "ts",
        direction: "DESC"
    },
    tsOffset: {
        n: 5,
        unit: "m"
    },
    pageSizeOptions: {
        table: [20, 50, 100, 200],
        chart: [200, 500, 1000, 5000, 10000, 30000]
    },

    tableDefaultConfig: {
        pageSize: 20,
        orderBy: {
            field: "ts",
            direction: "DESC"
        }
    },
    chartDefaultConfig: {
        pageSize: 500,
        orderBy: {
            field: "ts",
            direction: "ASC"
        }
    },
    windowClause: {
        type: "interval",
        interval: "3",
        intervalUnit: "s",
        intervalMode: "fill",
        fillMode: "none",
        filledValueColumn: [],
        slidingVal: "10",
        slidingValUnit: "s",
        stateColumn: null,
        sessionTime: "10",
        sessionTimeUnit: "s",
    },
    selectClause: {
        func: "FIRST", name: 'ts', alias: 'ts', _key: 0, disabled: false, fillValue: null
    },
    selectClauseDefaultFunction: "AVG",
    availableFunctionsInWindowClause: [].concat(tdengineFunctions.aggregate, tdengineFunctions.selection, ["IRATE"])
}
