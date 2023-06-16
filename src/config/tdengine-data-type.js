const dataTypes = [
    {
        type: "TIMESTAMP",
        length: 8,
        description: "Default precision is millisecond, microsecond and nanosecond are also supported."
    }, {
        type: "INT",
        length: 4,
        description: "Integer, the value range is [-2^31, 2^31-1]."
    }, {
        type: "INT UNSIGNED",
        length: 4,
        description: "Unsigned integer, the value range is [0, 2^32-1]."
    }, {
        type: "BIGINT",
        length: 8,
        description: "Long integer, the value range is [-2^63, 2^63-1]."
    }, {
        type: "BIGINT UNSIGNED",
        length: 8,
        description: "unsigned long integer, the value range is [0, 2^64-1]."
    }, {
        type: "FLOAT",
        length: 4,
        description: "Floating point number, the effective number of digits is 6-7, the value range is [-3.4E38, 3.4E38]."
    }, {
        type: "DOUBLE",
        length: 8,
        description: "Double precision floating point number, the effective number of digits is 15-16, the value range is [-1.7E308, 1.7E308]."
    }, {
        type: "BINARY",
        length: "User Defined",
        description: "Single-byte string for ASCII visible characters. Length must be specified when defining a column or tag of binary type."
    }, {
        type: "SMALLINT",
        length: 2,
        description: "Short integer, the value range is [-32768, 32767]."
    }, {
        type: "SMALLINT UNSIGNED",
        length: 2,
        description: "unsigned integer, the value range is [0, 65535]."
    }, {
        type: "TINYINT",
        length: 1,
        description: "Single-byte integer, the value range is [-128, 127]."
    }, {
        type: "TINYINT UNSIGNED",
        length: 1,
        description: "unsigned single-byte integer, the value range is [0, 255]."
    }, {
        type: "BOOL",
        length: 1,
        description: "Bool, the value range is {true, false}."
    }, {
        type: "NCHAR",
        length: "User Defined",
        description: "Multi-byte string that can include multi byte characters like Chinese characters. Each character of NCHAR type consumes 4 bytes storage. The string value should be quoted with single quotes. Literal single quote inside the string must be preceded with backslash, like \\'. The length must be specified when defining a column or tag of NCHAR type, for example nchar(10) means it can store at most 10 characters of nchar type and will consume fixed storage of 40 bytes. An error will be reported if the string value exceeds the length defined."
    }, {
        type: "JSON",
        length: null,
        description: "JSON type can only be used on tags. A tag of json type is excluded with any other tags of any other type."
    }, {
        type: "VARCHAR",
        length: "User Defined",
        description: "Alias of BINARY"
    },
]

export default dataTypes
