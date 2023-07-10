import _ from "lodash"

export default function useSchemaDatabaseBuilder() {

    const buildCreateDatabaseSql = (props) => {
        const template = ["CREATE DATABASE"]
        const clauses = {
            "ifNotExists": ifNotExistsClause,
            "name": nameClause,
            "buffer": bufferClause,
            "cache": cacheClause,
            "comp": compClause,
            "duration": durationClause,
            "wal": walClause,
            "walFsync": walFsyncPeriodClause,
            "walSegmentSize": walSegmentClause,
            "rows": rowsClause,
            "keep": keepClause,
            "page": pageClause,
            "pageSize": pageSizeClause,
            "precision": precisionClause,
            "replica": replicaClause,
            "retentions": retentionsClause,
            "vgroups": vGroupsClause,
            "singleTtable": singleStableClause,
            "sstTrigger": sstTriggerClause,
            "table": tableClause
        }
        for (let k in clauses) {
            let clause = clauses[k](props)
            if (!clause) continue
            template.push(clause)
        }
        return template.join(" ")
    }
    const nameClause = (props) => {
        return props.name
    }

    const ifNotExistsClause = (props) => {
        return props.ifNotExists ? "IF NOT EXISTS" : null
    }
    const bufferClause = (props) => {
        return props.buffer ? `BUFFER ${props.buffer}` : null
    }
    const cacheClause = (props) => {
        let cache = null
        if (props.cachemodel === "none") {
            return `CACHEMODEL 'none'`
        }
        cache = `CACHEMODEL '${props.cachemodel}'`
        if (props.cachesize) {
            cache += ` CACHESIZE ${props.cachesize}`
        }
        return cache
    }
    const compClause = (props) => {
        return props.comp ? `COMP ${props.comp}` : null
    }
    const durationClause = (props) => {
        return props.durationVal ? `DURATION ${props.durationVal}${props.durationPeriod}` : null
    }
    const walClause = (props) => {
        let wal = []
        if (props.walLevel) {
            wal.push(`WAL_LEVEL ${props.walLevel}`)
        }
        if (props.walRetentionPeriod) {
            wal.push(`WAL_RETENTION_PERIOD ${props.walRetentionPeriod}`)
        }
        if (props.walRetentionSize) {
            wal.push(`WAL_RETENTION_SIZE ${props.walRetentionSize}`)
        }
        if (props.walRollPeriod) {
            wal.push(`WAL_ROLL_PERIOD ${props.walRollPeriod}`)
        }
        return wal.length > 0 ? wal.join(" ") : null
    }
    const walFsyncPeriodClause = (props) => {
        return props.walFsyncPeriod ? `WAL_FSYNC_PERIOD ${props.walFsyncPeriod}` : null
    }
    const walSegmentClause = (props) => {
        return props.walSegmentSize ? `WAL_SEGMENT_SIZE ${props.walSegmentSize}` : null
    }
    const rowsClause = (props) => {
        let rows = []
        if (props.maxRows) {
            rows.push(`MAXROWS ${props.maxRows}`)
        }
        if (props.minRows) {
            rows.push(`MINROWS ${props.minRows}`)
        }
        return rows.length > 0 ? rows.join(" ") : null
    }
    const keepClause = (props) => {
        return props.keep ? `KEEP ${props.keep}d` : null
    }
    const pageClause = (props) => {
        return props.pages ? `PAGES ${props.pages}` : null
    }
    const pageSizeClause = (props) => {
        let page = []
        if (props.pageSize) {
            page.push(`PAGESIZE ${props.pageSize}`)
        }
        if (props.tsdbPageSize) {
            page.push(`TSDB_PAGESIZE ${props.tsdbPageSize}`)
        }
        return page.length > 0 ? page.join(" ") : null
    }
    const precisionClause = (props) => {
        return props.precision ? `PRECISION '${props.precision}'` : null
    }
    const replicaClause = (props) => {
        return props.replica ? `REPLICA ${props.replica}` : null
    }
    const retentionsClause = (props) => {
        let retentions = _.filter(props.retentions, (item) => {
            return item.val && item.keep
        })
        if (retentions.length < 3) return null
        let sql = []
        for (let i in retentions) {
            sql.push(`${retentions[i].val}${retentions[i].period}:${retentions[i].keep}d`)
        }
        return `RETENTIONS ${sql.join(",")}`
    }
    const vGroupsClause = (props) => {
        return props.vGroups ? `VGROUPS ${props.vGroups}` : null
    }
    const singleStableClause = (props) => {
        return `SINGLE_STABLE ${props.singleStable}`
    }
    const sstTriggerClause = (props) => {
        return props.sttTrigger ? `STT_TRIGGER ${props.sttTrigger}` : null
    }
    const tableClause = (props) => {
        let table = []
        if (props.tablePrefix) {
            table.push(`TABLE_PREFIX ${props.tablePrefix}`)
        }
        if (props.tableSuffix) {
            table.push(`TABLE_SUFFIX ${props.tableSuffix}`)
        }
        return table.length > 0 ? table.join(" ") : null
    }

    const buildAlterDatabaseSql = (props) => {
        const template = ["ALTER DATABASE"]
        const clauses = {
            "name": nameClause,
            "buffer": bufferClause,
            "cache": cacheClause,
            "wal": walClause,
            "walFsync": walFsyncPeriodClause,
            "keep": keepClause,
            "page": pageClause,
            "replica": replicaClause,
            "sstTrigger": sstTriggerClause,
        }
        for (let k in clauses) {
            let clause = clauses[k](props)
            if (!clause) continue
            template.push(clause)
        }
        return template.join(" ")
    }

    const buildDropDatabaseSql = (name) => {
        return `DROP DATABASE IF EXISTS ${name}`
    }

    return {
        buildCreateDatabaseSql,
        buildAlterDatabaseSql,
        buildDropDatabaseSql
    }
}
