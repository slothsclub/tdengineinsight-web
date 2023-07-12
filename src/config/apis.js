export const baseURL = import.meta.env.VITE_API_BASE_URL || "/"

export const apis = {
    test: "https://jsonplaceholder.typicode.com/todos/1",

    instances: {
        query: "/app/instance",
        create: "/app/instance",
        update: "/app/instance/:id",
        delete: "/app/instance/:id",
        open: "/app/instance/:id/open",
        close: "/app/instance/:id/close"
    },
    meta: {
        dnodes: "/tdengine/meta/basic/dnodes",
        mnodes: "/tdengine/meta/basic/mnodes",
        qnodes: "/tdengine/meta/basic/qnodes",
        cluster: "/tdengine/meta/basic/cluster",
        databases: "/tdengine/meta/basic/databases",
        functions: "/tdengine/meta/basic/functions",
        indexes: "/tdengine/meta/basic/indexes",
        stables: "/tdengine/meta/query/stables",
        tables: "/tdengine/meta/query/tables",
        tags: "/tdengine/meta/query/tags",
        tagValues: "/tdengine/meta/query/tag_values",
        columns: "/tdengine/meta/query/columns",
        users: "/tdengine/meta/basic/users",
        configs: "/tdengine/meta/basic/configs",
        dnode_variables: "/tdengine/meta/basic/dnode_variables",
        topics: "/tdengine/meta/basic/topics",
        subscriptions: "/tdengine/meta/basic/subscriptions",
        streams: "/tdengine/meta/basic/streams",
        query: "/tdengine/meta/query",
        version: "/tdengine/meta/version",
    },
    perf: {
        apps: "/tdengine/perf/basic/apps",
        connections: "/tdengine/perf/basic/connections",
        queries: "/tdengine/perf/basic/queries",
        consumers: "/tdengine/perf/basic/consumers",
        trans: "/tdengine/perf/basic/trans",
        smas: "/tdengine/perf/basic/smas",
    },
    sql: {
        exec: "/tdengine/exec/sql"
    }
}
