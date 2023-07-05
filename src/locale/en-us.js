
const enUS = {
    route: {
        title: {
            overview: "Overview",
            instances: "My TDengine Databases",
            browser: "Browser",
            query: "Query",
            cluster: "Cluster",
            subscribe: "Subscribe",
            schema: "Schema",
            privileges: "Privileges",
            configuration: "Configuration",
            clientList: "Client List",
            connections: "Connections"
        },
        description: {
            overview: "Real time statistics for this TDengine database",
            instances: "",
            browser: "Real time view of data in your TDengine database",
            query: "Execute your TDengine SQL",
            cluster: "View your TDengine cluster info",
            subscribe: "Manage subscriptions and consumers in your database",
            schema: "Manage your databases and tables",
            privileges: "Manage your users and permissions",
            configuration: "List of configurations in your TDengine database",
            clientList: "List of clients connected to TDengine database",
            connections: "List of connections to TDengine database"
        }
    },
    common: {
        overview: "Overview",
        browse: "Browse",
        browser: "Browser",
        query: "Query | Queries",
        cluster: "Cluster",
        action: "Action",
        schema: "Schema",
        subscribe: "Subscribe",
        database: "Database | Databases",
        configuration: "Configuration",
        clientList: "Client List",
        connections: "Connection | Connections",

        id: "ID",
        docker: "Docker",
        package: "Package",
        time: "Time",
        uptime: "Uptime",
        created: "Created Time",
        refresh: "Refresh",
        table: "Table | Tables",
        chart: "Chart",
        structure: "Structure",
        search: "Search",
        queries: "Queries",
        transaction: "Transactions",
        latest: "Latest",
        seconds: "Second | Seconds",
        minutes: "Minute | Minutes",
        hours: "Hours | Hours",
        days: "Day | Days",
        limit: "Limit",
        numberOfRows: "Number of rows",
        timestamp: "Timestamp",
        orderBy: "Order by",
        asc: "ASC",
        desc: "DESC",
        timeWindow: "Window",
        function: "Function",
        column: "Column | Columns",
        alias: "Alias",
        type: "Type",
        none: "None",
        interval: "Interval",
        mode: "Mode",
        role: "Role",
        roleTime: "Role Time",
        rebootTime: "Reboot Time",
        endpoint: "Endpoint",
        status: "Status",
        node: "Node",
        note: "Note",
        support: "Support",
        filter: "Filter | Filters",
        name: "Name",
        replica: "Replica",
        strict: "Strict",
        duration: "Duration",
        keep: "Keep",
        precision: "Precision",
        tag: "Tag | Tags",
        lastUpdate: "Last Update",
        comment: "Comment",
        maxDelay: "Max Delay",
        rollup: "Rollup",
        stable: "Super Table | Super Tables",
        uid: "UID",
        ttl: "TTL",
        buffer: "Buffer",
        ifNotExists: "If not exists",
        advanced: "Advanced",
        retention: "Retention | Retentions",

        ms: "ms",
        us: "us",
        ns: "ns",
        length: "Length",
        protocol: "Protocol",
        host: "Host",
        port: "Port",
        username: "Username",
        password: "Password",
        batchFetch: "Batch Fetch",
        ignoreBatchError: "Ignore Batch Error",
        httpConnectTimeout: "HTTP Connection Timeout",
        httpSocketTimeout: "HTTP Socket Timeout",
        messageWaitTimeout: "Message Wait Timeout",
        native: "Native",
        rest: "REST",
        topic: "Topic | Topics",
        subscription: "Subscription | Subscriptions",
        consumer: "Consumer | Consumers",
        autoRefresh: "Auto refresh",
        consumerId: "Consumer ID",
        consumerGroup: "Consumer Group",
        clientId: "Client ID",
        subscribeTime: "Subscribe Time",
        reBalanceTime: "Re-balance Time",
        appId: "App ID",
        ip: "IP",
        pid: "PID",
        startTime: "Start Time",
        app: "App",
        lastAccess: "Last Access",
        loginTime: "Login Time",

        setting: "Setting | Settings",
        feedback: "Feedback",
        about: "About",
        yes: "Yes",
        no: "No",
        error: "ERROR",
        later: "Later",
        ok: "OK",
        version: "Version",
        compare: "Compare",
        percent: "Percent",
        value: "Value",
    },
    tdengine: {
        keywords: {
            INTERVAL: "INTERVAL",
            STATE_WINDOW: "STATE_WINDOW",
            SESSION: "SESSION",
            FILL: "FILL",
            SLIDING: "SLIDING",
            VALUE: "VALUE",
            PREV: "PREV",
            NULL: "NULL",
            LINEAR: "LINEAR",
            NEXT: "NEXT",
            SMA: "SMA",
        },
        label: {
            mnodes: "MNodes",
            dnodes: "DNodes",
            qnodes: "QNodes",
            vnodes: "VNodes",
        },
        database: {
            name: "Name",
            NTables: "NTables",
            vGroups: "vGroups",
            vGroupId: "vGroup ID",
            stableName: "Name",
            watermark: "Watermark",
            comp: "Comp",
            maxRows: "Max Rows",
            minRows: "Min Rows",
            singleStable: "Single Stable",
            tablePrefix: "Table Prefix",
            tableSuffix: "Table Suffix",
            tsdbPageSize: "TSDB Page Size",
        },
        cache: {
            model: "Cache Model",
            lastRow: "Last Row",
            lastValue: "Last Value",
            both: "Both",
            size: "Cache Size",
        },
        wal: {
            level: "WAL Level",
            fsyncPeriod: "WAL fsync period",
            page: "Page | Pages",
            size: "Page Size",
            retentionPeriod: "WAL retention period",
            retentionSize: "WAL retention size",
            rollPeriod: "WAL roll period",
            walSegmentSize: "WAL segment size",
        },
        sttTrigger: "STT Trigger",
        client: {
            insertReq: "Insert Req",
            insertRow: "Insert Row",
            insertTime: "Insert Time",
            insertBytes: "Insert Bytes",
            fetchBytes: "Fetch Bytes",
            queryTime: "Query Time",
            totalReq: "Total Req",
            currentReq: "Current Req",
        },
    },
    links: {
        tdengineCloud: {
            url: "https://cloud.tdengine.com/",
            title: "Create a free TDengine Database on TDengine Cloud"
        },
        tdengineDocker: "https://docs.tdengine.com/get-started/docker/",
        tdenginePackage: "https://docs.tdengine.com/get-started/package/"
    },
    ui: {
        btn: {
            cancel: "Cancel",
            addInstance: "Add TDengine database",
            createDatabase: "Create Database",
            createSubtables: "Create Subtables",
            createNewTable: "Create new {0}",
            alterSubtable: "Alter Subtable",
            createStable: "Create Stable",
            alterTable: "Alter Table",
            addDatabase: "Add Database",
            updateDatabase: "Update Database",
            backupToStables: "Back to stables",
        },
        label: {
            status: {
                connectedClients: "Connected Clients",
                currentRequests: "Current Requests",
                totalRequests: "Total Requests",
                slowQuery: "Slow Query | Slow Queries",
            },
            cluster: {
                id: "Cluster ID",
                name: "Cluster Name",
                mnode: "MNode Endpoint",
                dnode: "DNode Endpoint"
            },
            queryResult: "Showing rows {0} - {1} ({2} total, Query took {3} ms.)",
            connectedToServer: "Connected to server {0}",
            form: {
                alterDatabase: "Alter Database",
                createDatabase: "Create Database",
                createSubtables: "Create Subtables",
                alterSubtable: "Alter Subtable",
                editDatabase: "Edit TDengine Database",
                addDatabase: "Add TDengine Database",
            },
            tableOption: "Table Option",
            systemConfigs: "System Configs",
            dnodeConfigs: "DNode Configs: {0}",
            allDatabase: "All Database",
            deleteDatabase: "Delete Database",
            showOrHideColumnSelector: "Show / Hide Columns",
        },
        placeholder: {
            searchInstance: "Search by name, host, port",
            searchTables: "Containing the word",
            searchStables: "Search by name, comment",
        },
        tips: {
            createTDengine: "Create a new TDengine database?",
            deleteDatabase: "Are you sure you want to delete {0} ?",
            missingDatasource: "The datasource may be disconnected, please return to the select instances page and try again",
            tooMuchChildTables: "Too much data, showing 0 - {0} of the total data.",
            viewChildTables: "View child tables",
            noDatabaseFound: "No database found, so nothing shows here, would you like to check another one?",
            noTableFound: "No tables found in the current database",
            addColumnToChart: "Select columns and compare data in charts",
        },
        title: {
            databaseSummary: "Database summary",
            tablesWithDatabase: "Tables on {0}",
        },
        chart: {
            insertReq: "Insert Req",
            insertBytes: "Insert Bytes",
            fetchBytes: "Fetch Bytes",
        }
    },
    errors: {

    },
}

export default enUS
