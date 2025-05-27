export const queryUserShoppingBehaviorData =  {
    "name": "queryUserShoppingBehaviorData",
    "description": "Execute data queries to retrieve user shopping behavior data.\nPlease give English input.\n\n**Field descriptions:**\n\n* **user_id (STRING):** A unique identifier assigned to each user after sampling and field desensitization. This is not the user's real ID.\n* **item_id (STRING):** A unique identifier assigned to each product after sampling and field desensitization. This is not the product's real ID.\n* **item_category (STRING):** The identifier for the product category, obtained after sampling and field desensitization. This is not the real category ID.\n* **behavior_type (STRING):** The type of user interaction with a product. Possible values are:\n\t* `pv`: View\n\t* `fav`: Favorite\n\t* `cart`: Add to cart\n\t* `buy`: Purchase\n* **behavior_time (STRING):** The timestamp of the user's behavior, represented as a Unix timestamp (e.g., 1511544070).",
    "input_schema": {
        "type": "object",
        "properties": {
            "query_description": {
                "type": "string",
                "description": "Query description ,Query What And Why,How to use these data"
            },
            "main_query": {
                "type": "object",
                "description": "Main query definition",
                "properties": {
                    "query_fields": {
                        "type": "array",
                        "description": "List of fields to query",
                        "items": {
                            "type": "object",
                            "properties": {
                                "field": {
                                    "type": "string",
                                    "enum": ["user_id", "item_id", "item_category", "behavior_type",
                                        "behavior_time"],
                                    "description": "Field name"
                                },
                                "alias": {
                                    "type": "string",
                                    "description": "Field alias (optional,use english)"
                                },
                                "aggregate": {
                                    "type": "string",
                                    "enum": ["COUNT", "SUM", "AVG", "MAX", "MIN", "NONE"],
                                    "description": "Aggregate function (optional)"
                                }
                            },
                            "required": ["field"]
                        }
                    },
                    "from_data_api": {
                        "type": "string",
                        "enum": ["testtable.testdb.commerce_shopping"],
                        "description": "Table name to query"
                    },
                    "data_filter_conditions": {
                        "type": "array",
                        "description": "Query conditions",
                        "items": {
                            "type": "object",
                            "properties": {
                                "field": {
                                    "type": "string",
                                    "enum": ["user_id", "item_id", "item_category", "behavior_type",
                                        "behavior_time"],
                                    "description": "Condition field"
                                },
                                "operator": {
                                    "type": "string",
                                    "enum": ["=", "<>", ">", "<", ">=", "<=", "IN", "NOT IN", "LIKE", "IS NULL",
                                        "IS NOT NULL"],
                                    "description": "Comparison operator"
                                },
                                "value": {
                                    "type": ["string", "number", "boolean", "null", "array"],
                                    "description": "Comparison value, use array for IN/NOT IN operators"
                                },
                                "logic": {
                                    "type": "string",
                                    "enum": ["AND", "OR"],
                                    "description": "Logical relationship with other conditions"
                                },
                                "sub_query": {
                                    "type": "object",
                                    "description": "Subquery (available when operator is IN/NOT IN, etc.)",
                                    "$ref": "#/properties/main_query"
                                }
                            },
                            "required": ["field", "operator"]
                        }
                    },
                    "group_by": {
                        "type": "array",
                        "description": "Grouping fields",
                        "items": {
                            "type": "string",
                            "enum": ["user_id", "item_id", "item_category", "behavior_type", "behavior_time"]
                        }
                    },
                    "having_conditions": {
                        "type": "array",
                        "description": "HAVING conditions",
                        "items": {
                            "type": "object",
                            "properties": {
                                "field": {
                                    "type": "string",
                                    "enum": ["user_id", "item_id", "item_category", "behavior_type",
                                        "behavior_time"],
                                    "description": "Condition field"
                                },
                                "aggregate": {
                                    "type": "string",
                                    "enum": ["COUNT", "SUM", "AVG", "MAX", "MIN", "NONE"],
                                    "description": "Aggregate function"
                                },
                                "operator": {
                                    "type": "string",
                                    "enum": ["=", "<>", ">", "<", ">=", "<="],
                                    "description": "Comparison operator"
                                },
                                "value": {
                                    "type": ["string", "number", "boolean", "null"],
                                    "description": "Comparison value"
                                },
                                "logic": {
                                    "type": "string",
                                    "enum": ["AND", "OR"],
                                    "description": "Logical relationship with other conditions"
                                }
                            },
                            "required": ["field", "operator", "value"]
                        }
                    },
                    "order_by": {
                        "type": "array",
                        "description": "Sorting rules",
                        "items": {
                            "type": "object",
                            "properties": {
                                "field": {
                                    "type": "string",
                                    "enum": ["user_id", "item_id", "item_category", "behavior_type",
                                        "behavior_time"],
                                    "description": "Sorting field"
                                },
                                "direction": {
                                    "type": "string",
                                    "enum": ["ASC", "DESC"],
                                    "description": "Sorting direction"
                                }
                            },
                            "required": ["field", "direction"]
                        }
                    },
                    "limit": {
                        "type": "integer",
                        "description": "Limit the number of returned records,return no more 20"
                    },
                    "offset": {
                        "type": "integer",
                        "description": "Number of records to skip"
                    },
                    "joins": {
                        "type": "array",
                        "description": "Table join definitions (may not be applicable as there is only one table)",
                        "items": {
                            "type": "object",
                            "properties": {
                                "type": {
                                    "type": "string",
                                    "enum": ["INNER", "LEFT", "RIGHT", "FULL"],
                                    "description": "Join type"
                                },
                                "table": {
                                    "type": "string",
                                    "enum": ["commerce_shopping"],
                                    "description": "Table name to join"
                                },
                                "alias": {
                                    "type": "string",
                                    "description": "Table alias ,use english"
                                },
                                "on_conditions": {
                                    "type": "array",
                                    "description": "Join conditions",
                                    "items": {
                                        "type": "object",
                                        "properties": {
                                            "left_field": {
                                                "type": "string",
                                                "enum": ["user_id", "item_id", "item_category", "behavior_type",
                                                    "behavior_time"],
                                                "description": "Left table field"
                                            },
                                            "operator": {
                                                "type": "string",
                                                "enum": ["=", "<>", ">", "<", ">=", "<="],
                                                "description": "Comparison operator"
                                            },
                                            "right_field": {
                                                "type": "string",
                                                "enum": ["user_id", "item_id", "item_category", "behavior_type",
                                                    "behavior_time"],
                                                "description": "Right table field"
                                            },
                                            "logic": {
                                                "type": "string",
                                                "enum": ["AND", "OR"],
                                                "description": "Logical relationship with other conditions"
                                            }
                                        },
                                        "required": ["left_field", "operator", "right_field"]
                                    }
                                }
                            },
                            "required": ["type", "table", "on_conditions"]
                        }
                    }
                },
                "required": ["query_fields", "from_data_api"]
            }
        },
        "required": ["main_query"]
    }
}
// 引入 AWS SDK
const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda");

// 查询数据库通过调用 Lambda 函数
async function queryDbByInvokeLambda(sql) {
    // 创建 Lambda 客户端
    const lambdaClient = new LambdaClient({ region: "us-west-2" });

    // 构建请求事件
    const event = {
        sql: sql
    };

    // 将事件转换为 JSON 字符串
    const payload = JSON.stringify(event);

    // Lambda 函数名称
    const functionName = "S3tableDuckDB";

    // 调用 Lambda 函数
    try {
        const response = await lambdaClient.send(
            new InvokeCommand({
                FunctionName: functionName,
                InvocationType: "RequestResponse", // 同步调用
                Payload: payload
            })
        );
        // 处理响应
        return Buffer.from(response.Payload).toString("utf-8");
    } catch (error) {
        console.error("Error invoking Lambda:", error);
        throw error;
    }
}



// 将 JSON 格式的查询定义转换为标准 SQL 语句
function jsonToSql(jsonInput) {
    try {
        // 提取主查询部分
        const mainQuery = jsonInput.main_query || {};
        if (!Object.keys(mainQuery).length) {
            return "ERROR: Missing main_query in input";
        }

        // 处理 SELECT 部分
        const queryFields = mainQuery.query_fields || [];
        if (!queryFields.length) {
            return "ERROR: No select fields specified";
        }

        const selectClause = queryFields.map(field => {
            const fieldName = field.field;
            const alias = field.alias || '';
            const aggregate = field.aggregate || 'NONE';

            let formattedField = '';
            if (aggregate && aggregate !== 'NONE') {
                formattedField = `${aggregate}(${fieldName})`;
            } else {
                formattedField = fieldName;
            }

            if (alias) {
                formattedField += ` AS ${alias}`;
            }

            return formattedField;
        });

        // 处理 FROM 部分
        const fromDataApi = mainQuery.from_data_api || '';
        if (!fromDataApi) {
            return "ERROR: No from_data_api specified";
        }

        // 处理 JOIN 部分
        const joins = mainQuery.joins || [];
        const joinClause = joins.map(join => {
            const joinType = join.type || 'INNER';
            const joinTable = join.table || '';
            const joinAlias = join.alias || '';
            const onConditions = join.on_conditions || [];

            if (!joinTable || !onConditions.length) {
                return '';
            }

            let joinStr = `${joinType} JOIN ${joinTable}`;
            if (joinAlias) {
                joinStr += ` AS ${joinAlias}`;
            }

            joinStr += " ON ";
            const onParts = onConditions.map((condition, i) => {
                const left = condition.left_field || '';
                const op = condition.operator || '=';
                const right = condition.right_field || '';
                const logic = condition.logic || 'AND';

                if (!left || !right) {
                    return '';
                }

                let conditionStr = `${left} ${op} ${right}`;
                if (i > 0) {
                    conditionStr = `${logic} ${conditionStr}`;
                }

                return conditionStr;
            }).filter(part => part !== '');

            joinStr += onParts.join(" ");
            return joinStr;
        }).filter(join => join !== '');

        // 处理 WHERE 部分
        const dataFilterConditions = mainQuery.data_filter_conditions || [];
        const whereClause = dataFilterConditions.map((condition, i) => {
            const field = condition.field || '';
            const op = condition.operator || '=';
            const value = condition.value;
            const logic = condition.logic || 'AND';

            if (!field || op === null) {
                return '';
            }

            let conditionStr = '';
            // 处理不同类型的操作符
            if (op === 'IS NULL' || op === 'IS NOT NULL') {
                conditionStr = `${field} ${op}`;
            } else if (op === 'IN' || op === 'NOT IN') {
                if (Array.isArray(value)) {
                    const formattedValues = value.map(v =>
                        typeof v === 'string' ? `'${v}'` : String(v)
                    ).join(", ");
                    conditionStr = `${field} ${op} (${formattedValues})`;
                } else {
                    conditionStr = `${field} ${op} (${value})`;
                }
            } else {
                if (typeof value === 'string') {
                    conditionStr = `${field} ${op} '${value}'`;
                } else if (value === null) {
                    conditionStr = op === '=' ? `${field} IS NULL` : `${field} IS NOT NULL`;
                } else {
                    conditionStr = `${field} ${op} ${value}`;
                }
            }

            if (i > 0) {
                conditionStr = `${logic} ${conditionStr}`;
            }

            return conditionStr;
        }).filter(clause => clause !== '');

        // 处理 GROUP BY 部分
        const groupBy = mainQuery.group_by || [];
        const groupClause = groupBy.length ? groupBy.join(", ") : "";

        // 处理 HAVING 部分
        const havingConditions = mainQuery.having_conditions || [];
        const havingClause = havingConditions.map((condition, i) => {
            const field = condition.field || '';
            const aggregate = condition.aggregate || '';
            const op = condition.operator || '=';
            const value = condition.value;
            const logic = condition.logic || 'AND';

            if (!field || !op) {
                return '';
            }

            let fieldStr = '';
            if (aggregate && aggregate !== 'NONE') {
                fieldStr = `${aggregate}(${field})`;
            } else {
                fieldStr = field;
            }

            let conditionStr = '';
            if (typeof value === 'string') {
                conditionStr = `${fieldStr} ${op} '${value}'`;
            } else if (value === null) {
                conditionStr = op === '=' ? `${fieldStr} IS NULL` : `${fieldStr} IS NOT NULL`;
            } else {
                conditionStr = `${fieldStr} ${op} ${value}`;
            }

            if (i > 0) {
                conditionStr = `${logic} ${conditionStr}`;
            }

            return conditionStr;
        }).filter(clause => clause !== '');

        // 处理 ORDER BY 部分
        const orderBy = mainQuery.order_by || [];
        const orderClause = orderBy.map(order => {
            const field = order.field || '';
            const direction = order.direction || 'ASC';

            if (field) {
                return `${field} ${direction}`;
            }
            return '';
        }).filter(clause => clause !== '');

        // 处理 LIMIT 和 OFFSET
        const limit = mainQuery.limit;
        const offset = mainQuery.offset;

        // 构建 SQL 查询
        let sql = `SELECT ${selectClause.join(', ')}\nFROM ${fromDataApi}`;

        if (joinClause.length) {
            sql += `\n${joinClause.join(' ')}`;
        }

        if (whereClause.length) {
            sql += `\nWHERE ${whereClause.join(' ')}`;
        }

        if (groupClause) {
            sql += `\nGROUP BY ${groupClause}`;
        }

        if (havingClause.length) {
            sql += `\nHAVING ${havingClause.join(' ')}`;
        }

        if (orderClause.length) {
            sql += `\nORDER BY ${orderClause.join(', ')}`;
        }

        if (limit !== undefined && limit !== null) {
            sql += `\nLIMIT ${limit}`;
        }

        if (offset !== undefined && offset !== null) {
            sql += `\nOFFSET ${offset}`;
        }

        return sql;
    } catch (e) {
        return `ERROR: Failed to generate SQL - ${e.message}`;
    }
}

// 执行工具函数
export async function invokeDataApiTool(toolName, toolParams) {
    const sql = jsonToSql(toolParams);
    // 以 Error 开头，表示出错
    if (sql.startsWith("ERROR")) {
        return [sql, ""];
    }
    try {
        const sqlResult = await queryDbByInvokeLambda(sql);
        return [sqlResult, sql];
    } catch (error) {
        return [`ERROR: ${error.message}`, sql];
    }
}
