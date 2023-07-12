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
        for (let i in watermarks) {
            wm.push(`${watermarks[i].val}${watermarks[i].period}`)
        }
        return wm.length > 0 ? `WATERMARK ${wm.join(",")}` : null
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

    const buildStableAlterSql = (props) => {
        let template = []
        const clauses = {
            "comment": alterCommentClause,
            "column": alterColumnClause,
            "tag": alterTagClause,
        }
        for (let k in clauses) {
            let clause = clauses[k](props)
            if (!clause) continue
            template = template.concat(clause)
        }
        let table = nameClause(props)
        return template.length > 0 ? template.map(i => {
            return `ALTER STABLE ${table} ${i}`
        }) : null
    }
    const alterCommentClause = (props) => {
        return props.comment && props.comment !== props.origin.comment ? [`COMMENT '${props.comment}'`] : null
    }
    const alterColumnClause = (props) => {
        const columns = []
        for (let i in props.columns) {
            let col = props.columns[i]

            if (col.state === "DROP" && col.origin.name) {
                columns.push(`DROP COLUMN ${col.origin.name}`)
            }
            if (col.state === "KEEP" && isStringColumnType(col.type) && col.length > col.minLength) {
                columns.push(`MODIFY COLUMN ${col.col.origin.name} ${col.type}(${col.length})`)
            }
            if (col.state === "ADD" && col.name) {
                isStringColumnType(col.type) ? columns.push(`ADD COLUMN ${col.name} ${col.type}(${col.length})`) : columns.push(`ADD COLUMN ${col.name} ${col.type}`)
            }
        }
        return columns.length > 0 ? columns : null
    }
    const alterTagClause = (props) => {
        const tags = []
        for (let i in props.tags) {
            let tag = props.tags[i]

            if (tag.state === "DROP" && tag.origin.name) {
                tags.push(`DROP TAG ${tag.origin.name}`)
            }
            if (tag.state === "KEEP" && isStringColumnType(tag.type) && tag.length > tag.minLength) {
                tags.push(`MODIFY TAG ${tag.origin.name} ${tag.type}(${tag.length})`)
            }
            if (tag.state === "KEEP" && tag.name !== tag.origin.name) {
                tags.push(`RENAME TAG ${tag.origin.name} ${tag.name}`)
            }
            if (tag.state === "ADD" && tag.name) {
                isStringColumnType(tag.type) ? tags.push(`ADD TAG ${tag.name} ${tag.type}(${tag.length})`) : tags.push(`ADD TAG ${tag.name} ${tag.type}`)
            }
        }
        return tags.length > 0 ? tags : null
    }
    const alterTTLClause = (props) => {
        return props.ttl && props.ttl !== props.origin.ttl ? [`TTL ${props.ttl}`] : null
    }

    const buildNormalTableCreateSql = (props) => {
        const template = ["CREATE TABLE"]
        const clauses = {
            "ifNotExists": ifNotExistsClause,
            "name": nameClause,
            "column": columnClause,
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

    const buildNormalTableAlterSql = (props) => {
        let template = []
        const clauses = {
            "comment": alterCommentClause,
            "ttl": alterTTLClause,
            "column": alterColumnClause
        }
        for (let k in clauses) {
            let clause = clauses[k](props)
            if (!clause) continue
            template = template.concat(clause)
        }
        let table = nameClause(props)
        return template.length > 0 ? template.map(i => {
            return `ALTER TABLE ${table} ${i}`
        }) : null
    }

    const buildChildTableCreateSql = (props) => {
        const tables = _.filter(props.tables, (t) => {
            return !t.name.startsWith("New child table")
        })
        const clauses = []
        for (let i in tables) {
            let ifNotExists = tables[i].ifNotExists ? `IF NOT EXISTS` : ''
            let tags = _.filter(tables[i].tags, (t) => {
                return !!t.value
            })
            if (tags.length === 0) continue
            let tagKeys = tags.reduce((r, t) => {
                r.push(t.name)
                return r
            }, [])
            let tagValues = tags.reduce((r, t) => {
                r.push(isStringColumnType(t.type) ? `'${t.value}'` : t.value)
                return r
            }, [])
            clauses.push(`${ifNotExists} ${props.database}.${tables[i].name} USING ${props.database}.${props.stable}(${tagKeys.join(",")}) TAGS (${tagValues.join(",")})`)
        }
        return clauses.length > 0 ? "CREATE TABLE " + clauses.join(" ") : null
    }
    const buildChildTableAlterSql = (props) => {
        const sql = []
        const alter = `ALTER TABLE ${props.table.dbName}.${props.table.tableName}`
        props.table.tableComment && sql.push(`${alter} COMMENT '${props.table.tableComment}'`)
        props.table.ttl && sql.push(`${alter} TTL ${props.table.ttl}`)

        for (let i in props.tags) {
            let tag = props.tags[i]
            if (tag.value === tag.origin.value) continue
            sql.push(isStringColumnType(tag.type) ? `${alter} SET TAG ${tag.name}='${tag.value}'` : `${alter} SET TAG ${tag.name}=${tag.value}`)
        }
        return sql
    }

    const buildDropTableSql = (type, db, table) => {
        if (type === "stable") return `DROP STABLE IF EXISTS ${db}.${table}`
        return `DROP TABLE IF EXISTS ${db}.${table}`
    }

    return {
        buildStableCreateSql,
        buildStableAlterSql,
        buildNormalTableCreateSql,
        buildNormalTableAlterSql,
        buildChildTableAlterSql,
        buildChildTableCreateSql,
        buildDropTableSql,
    }
}
