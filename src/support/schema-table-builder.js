import _ from "lodash"

export default function useSchemaTableBuilder() {

    const buildStableCreateSql = (props) => {
        const template = ["CREATE STABLE"]
        const clauses = {
            "ifNotExists": ifNotExistsClause,
            "name": nameClause,
            "column": columnClause,
            "tag": tagClause,
            "comment": commentClause,
            "watermark": watermarkClause,
            "maxDelay": maxDelayClause,
            "rollup": rollupClause,
            "sma": smaClause,
            "ttl": ttlClause,
        }
        for (let k in clauses) {
            let clause = clauses[k](props)
            if (!clause) continue
            template.push(clause)
        }
        return template.join(" ")
    }
    const nameClause = (props) => {
        return `${props.database}.${props.name}`
    }
    const ifNotExistsClause = (props) => {
        return props.ifNotExists ? "IF NOT EXISTS" : null
    }
    const commentClause = (props) => {
        return props.comment ? `COMMENT '${props.comment}'` : null
    }
    const watermarkClause = (props) => {
        let wm = []
        const watermarks = _.filter(props.watermarks, (w) => {
            return !!w.val
        })
        if (watermarks.length < 3) return null
        for (let i in watermarks) {
            wm.push(`${watermarks[i].val}${watermarks[i].period}`)
        }
        return `WATERMARK ${wm.join(",")}`
    }
    const maxDelayClause = (props) => {
        return props.maxDelay ? `MAX_DELAY ${props.maxDelay}${props.maxDelayPeriod}` : null
    }
    const rollupClause = (props) => {
        return props.rollup ? `ROLLUP(${props.rollup})` : null
    }
    const smaClause = (props) => {
        return props.sma ? `SMA(${props.sma})` : null
    }
    const ttlClause = (props) => {
        return props.ttl ? `TTL ${props.ttl}` : null
    }
    const tagClause = (props) => {
        const tags = _.filter(props.tags, (t) => {
            return !!t.name
        })
        const clauses = []
        for (let i in tags) {
            isStringColumnType(tags[i].type) ? clauses.push(`${tags[i].name} ${tags[i].type}(${tags[i].length})`) : clauses.push(`${tags[i].name} ${tags[i].type}`)
        }
        return `TAGS (${clauses.join(",")})`
    }
    const columnClause = (props) => {
        const columns = _.filter(props.columns, (t) => {
            return !!t.name
        })
        const clauses = [`ts TIMESTAMP`]
        for (let i in columns) {
            isStringColumnType(columns[i].type) ? clauses.push(`${columns[i].name} ${columns[i].type}(${columns[i].length})`) : clauses.push(`${columns[i].name} ${columns[i].type}`)
        }
        return `(${clauses.join(",")})`
    }
    const isStringColumnType = (type) => {
        return ["NCHAR", "VARCHAR", "BINARY"].includes(type.toUpperCase())
    }

    return {
        buildStableCreateSql
    }
}
