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
    availableFunctionsInWindowClause: [].concat(tdengineFunctions.aggregate, tdengineFunctions.selection, ["IRATE"]),
    tagClause: {
        name: null, operator: "=", value: null
    },
    windowedQueryDefaultOrderColumn: "_wstart",

    schema: {
        database: {
            create: {
                name: null,
                ifNotExists: true,
                cachemodel: "none",
                cacheSize: 1,
                precision: "ms",
                keep: 3650,
                buffer: 96,
                comp: "2",

                durationVal: null,
                durationPeriod: "d",
                walLevel: 2,
                walFsyncPeriod: null,
                maxRows: null,
                minRows: null,
                pages: null,
                pageSize: null,
                replica: "1",
                retentions: [
                    {
                        val: null,
                        period: "s",
                        keep: null
                    },
                    {
                        val: null,
                        period: "m",
                        keep: null
                    },
                    {
                        val: null,
                        period: "m",
                        keep: null
                    }
                ],
                vGroups: null,
                singleStable: "0",
                sttTrigger: null,
                tablePrefix: null,
                tableSuffix: null,
                tsdbPageSize: null,
                walRetentionPeriod: null,
                walRetentionSize: null,
                walRollPeriod: null,
                walSegmentSize: null,
            },
            alter: {
                cachemodel: "none",
                cacheSize: 1,
                buffer: 96,
                pages: null,
                replica: null,
                sttTrigger: null,
                walLevel: 2,
                walFsyncPeriod: null,
                keep: 3650,
                walRetentionPeriod: null,
                walRetentionSize: null,
            }
        },
        stable: {
            create: {
                name: "",
                ifNotExists: true,
                comment: "",
                watermarks: [
                    {
                        val: null,
                        period: "s"
                    },
                    {
                        val: null,
                        period: "s"
                    },
                    {
                        val: null,
                        period: "s"
                    }
                ],
                maxDelay: null,
                maxDelayPeriod: "s",
                rollup: "",
                sma: "",
                ttl: 0,

                columns: [
                    {
                        _key: Date.now(),
                        name: null,
                        type: "FLOAT",
                        length: null
                    }
                ],
                tags: [
                    {
                        _key: Date.now(),
                        name: null,
                        type: "NCHAR",
                        length: 4
                    }
                ]
            },
            alter: {}
        },
        childTable: {
            create: {},
            alter: {}
        },
        normalTable: {
            create: {},
            alter: {}
        }
    }
}
