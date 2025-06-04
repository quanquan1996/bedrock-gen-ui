import {amazonFoods, amazonProducts} from "./mocks"
import {generateUI} from "./generateUI"
import {queryUserShoppingBehaviorData} from "./queryUserShoppingBehaviorData";
import {invokeDataApiTool} from "./queryUserShoppingBehaviorData";
import {parseJsonAgent} from "./agent/parseJsonAgent";

const encoder = new TextEncoder()
const echartsSchema = {
    "name": "Echart",
    "description": "Convert data into json format for Echats chart option,You should make sure elements don't overlap.,My display block is 819 wide and 500 high. Please help me adapt my UI and make it as beautiful as possible.For object format data, you need to output valid JSON and not put JSON into a string.",
    "input_schema": {
        "type": "object",
        "properties": {
            "title": {
                "type": "object",
                "properties": {
                    "text": {
                        "type": "string",
                        "description": "The main title text."
                    },
                    "subtext": {
                        "type": "string",
                        "description": "The subtitle text."
                    },
                    "left": {
                        "type": ["string", "number"],
                        "description": "Distance of title component from the left side."
                    },
                    "top": {
                        "type": ["string", "number"],
                        "description": "Distance of title component from the top side."
                    }
                },
                "additionalProperties": true
            },
            "tooltip": {
                "type": "object",
                "properties": {
                    "trigger": {
                        "type": "string",
                        "enum": ["item", "axis", "none"],
                        "description": "Type of triggering."
                    },
                    "axisPointer": {
                        "type": "object",
                        "properties": {
                            "type": {
                                "type": "string",
                                "enum": ["line", "shadow", "none", "cross"],
                                "description": "Indicator type."
                            }
                        },
                        "additionalProperties": true
                    }
                },
                "additionalProperties": true
            },
            "xAxis": {
                "type": ["object", "array"],
                "items": { "$ref": "#/definitions/axis" },
                "$ref": "#/definitions/axis"
            },
            "yAxis": {
                "type": ["object", "array"],
                "items": { "$ref": "#/definitions/axis" },
                "$ref": "#/definitions/axis"
            },
            "series": {
                "type": "array",
                "items": {
                    "type": "object",
                    "properties": {
                        "type": {
                            "type": "string",
                            "enum": ["bar", "line", "pie", "scatter" /* ... etc ... */],
                            "description": "The type of the series."
                        },
                        "name": {
                            "type": "string",
                            "description": "Series name, used for tooltip and legend."
                        },
                        "data": {
                            "type": "array",
                            "description": "Data array of the series."
                        }
                    },
                    "required": ["type", "data"],
                    "additionalProperties": true
                }
            },
            "legend": {
                "type": "object",
                "properties": {
                    "data": {
                        "type": "array",
                        "items": {"type": "string"}
                    }
                },
                "additionalProperties": true
            },
            "dataset": {
                "type": "object",
                "properties": {
                    "source": {
                        "type": ["array", "object"]
                    }
                },
                "additionalProperties": true
            }
        },
        "definitions": {
            "axis": {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "enum": ["value", "category", "time", "log"],
                        "description": "Type of axis."
                    },
                    "data": {
                        "type": "array",
                        "items": {
                            "type": ["string", "number", "object"]
                        },
                        "description": "Category data."
                    },
                    "name": {
                        "type": "string",
                        "description": "Name of axis."
                    }
                },
                "additionalProperties": true
            }
        },
        "additionalProperties": true
    }
}
export const tools = [
    {
        name: "getWeather",
        description: "Get the current weather in a given location",
        input_schema: {
            type: "object",
            properties: {
                location: {
                    type: "string",
                    description: "The city and state, e.g. San Francisco, CA"
                }
            },
            required: ["location"]
        }
    },
    {
        name: "searchProducts",
        description: "Search products from amazon based on user's query,and init product ui list",
        input_schema: {
            type: "object",
            properties: {
                query: {
                    type: "string",
                    description: "User query"
                }
            },
            required: ["query"]
        }
    }, {
        name: "searchFoods",
        description: "Search foods from foos platform based on user's query,and init food ui list",
        input_schema: {
            type: "object",
            properties: {
                query: {
                    type: "string",
                    description: "User query"
                }
            },
            required: ["query"]
        }
    },
    {
        name: "getToday",
        description: "Get today's date,return a string like 20241010 means today is 2024/10/10,Do not call this tool more than once in a conversation",
        input_schema: {
            type: "object",
            properties: {},
            required: []
        }
    },
    {
        name: "getCurrentUserInfo",
        description: "get current user info like name,idcard num,sex,phone,email.Do not call this tool more than once in a conversation",
        input_schema: {
            type: "object",
            properties: {
                reason: {
                    type: "string",
                    description: "reason for get userinfo,This field is for record keeping only and will not affect the results."
                }
            },
            required: ["reason"]
        }
    },
    {
        name: "bookHotel",
        description: "init a form for book a hotel for user,if not have enough info,use tools,if not have enough info after use tools,please ask for info in output",
        input_schema: {
            type: "object",
            properties: {
                username: {
                    type: "string",
                    description: "user name"
                },
                idcard: {
                    type: "string",
                    description: "user idcard"
                },
                phone: {
                    type: "string",
                    description: "user phone"
                },
                email: {
                    type: "string",
                    description: "user email"
                },
                hotel_name: {
                    type: "string",
                    description: "hotel name"
                },
                checkin_date: {
                    type: "string",
                    description: "checkin date"
                },
                checkout_date: {
                    type: "string",
                    description: "checkout date"
                }
            },
            required: ["username", "idcard", "phone", "email", "hotel_name", "checkin_date", "checkout_date"]
        }
    },
    queryUserShoppingBehaviorData,
]

export const toolMap = {
    getWeather: async ({location}) => {
        console.log(location)
        return {
            component: {},
            content: 'Result: 25 degrees sunny, no need to generate ui component'
        }
    },
    generateUI: async ({component}) => {
        return {
            component: component,
            content: 'Component has been rendered and streaming back to client side.'
        }
    },
    searchProducts: async ({query}) => {
        console.log(query)
        return {
            component: {
                name: 'HorizontalScrollArea',
                children: amazonProducts.map(item => ({
                    name: 'ProductCard',
                    id: item.asin,
                    title: item.product_title,
                    price: item.product_price,
                    image: item.product_photo,
                    description: item.sales_volume + item.delivery
                }))
            },
            content: `Found ${amazonProducts.length} products,it already init ui, \n${amazonProducts.map(p => p.product_title).join('\n')}, no need to generate ui component,Do not call this tool more than once`
        }
    },
    searchFoods: async ({query}) => {
        console.log(query)
        return {
            component: {
                name: 'HorizontalScrollArea',
                children: amazonFoods.map(item => ({
                    name: 'ProductCard',
                    id: item.asin,
                    title: item.product_title,
                    price: item.product_price,
                    image: item.product_photo,
                    description: item.sales_volume + item.delivery
                }))
            },
            content: `Found ${amazonFoods.length} foods,it already init ui, \n${amazonFoods.map(p => p.product_title).join('\n')}, no need to generate ui component,Do not call this tool more than once`
        }
    },
    getCurrentUserInfo: async ({reason}) => {
        console.log(reason)
        return {
            component: {
                name: 'ToolMessage',
                message: reason + '当前用户信息为: username:Pengjun Qiu,idcard num:123456789,sex:man,phone:123456789,email:pengjunq@gmail.com'
            },
            content: 'Result: username:Pengjun Qiu,idcard num:123456789,sex:man,phone:123456789,email:pengjunq@gmail.com, no need to generate ui component,Do not call this tool more than once'
        }
    },
    getToday: async ({}, streaming) => {
        console.log(`Getting today's date.`);

        // Get current date
        const today = new Date();

        // Format date as YYYYMMDD
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const day = String(today.getDate()).padStart(2, '0');

        const formattedDate = `${year}${month}${day}`;
        // Log for debugging
        console.log(`Today's date formatted as YYYYMMDD: ${formattedDate}`);
        // await streamTool({
        //     name: 'EChartsMessage',
        //     message: {
        //         name: "销售数据分析",
        //         content: "这个图表展示了2023年各季度的销售业绩对比。",
        //         data: {
        //             title: {
        //                 text: '季度销售数据'
        //             },
        //             tooltip: {},
        //             xAxis: {
        //                 data: ['第一季度', '第二季度', '第三季度', '第四季度']
        //             },
        //             yAxis: {},
        //             series: [{
        //                 name: '销售额',
        //                 type: 'bar',
        //                 data: [5, 20, 36, 10]
        //             }]
        //         }
        //     }
        // }, streaming)
        return {
            component: {
                name: 'ToolMessage',
                message: '今天是: ' + formattedDate
            }, // Empty component as specified
            content: `today is: ${formattedDate}, no need to generate ui component,Do not call this tool more than once`
        };
    },
    bookHotel: async ({username, idcard, phone, email, hotel_name, checkin_date, checkout_date}) => {
        console.log(`Booking hotel for ${username} with idcard ${idcard} and phone ${phone} and email ${email} for hotel ${hotel_name} from ${checkin_date} to ${checkout_date}`)
        return {
            component: {
                name: 'HotelBookingForm',
                username: username,
                idcard: idcard,
                phone: phone,
                email: email,
                hotel_name: hotel_name,
                checkin_date: checkin_date,
                checkout_date: checkout_date
            },
            content: 'Result: init book form success,need user check info and click submit button, no need to generate ui component'
        }
    },
    queryUserShoppingBehaviorData: async (query, streaming) => {
        console.log(query)
        const [result, sql] = await invokeDataApiTool("", query)
        // 提示数据
        await streamTool({
            name: 'WorkFlowMessage',
            message: {
                name: "查询BI数据工作流",
                content: `调用底层数据库查询\n查询内容：${query.query_description}\n查询sql:${sql}\n查询result:${result}`
            }
        },  streaming)
        // ai生成图表
        const dataDesc = query.query_description
        const echartsData = await parseJsonAgent(`帮我把我的数据以echarts图表的格式展示,我原始数据sql:${sql},查询结果：${result},sql查询描述:${dataDesc}`,
            echartsSchema,
            streaming)
        await streamTool({
            name: 'EChartsMessage',
            message: {
                name: "数据可视化",
                content: query.query_description,
                data: echartsData
            }
        }, streaming)
        //成功提示
        const successMsg = {
            name: 'WorkFlowMessage',
            message: {
                name: '查询BI数据工作流',
                content: '工作流成功调用'
            }
        }
        await streamTool(successMsg, streaming)
        return {
            component: {},
            content: `query sql is ${sql}, result is ${result}.\n
            你是一个跨境电商领域的数据洞察专家,你根据接收到的需求，根据已有数据来进行分析\n
            并给出专业的见解和建议的数据报告\n
            此外如果有什么有价值的探索，请给出探索的建议\n
            此工具调用不要超过三轮调用\n
            回复的参考模板如下，请用严格的多级标题保证报告结构思路清晰 \n
            1.数据见解 :最好包含关键数据的表格，以及对数据的分析见解,分析尽量详细\n
            2.探索建议 :结合数据见解，拓展思路，给出一些业务或者其他方面的建议与见解\n
            3.数据建议\n`
        }
    }
}

async function streamTool(message, streaming) {
    await streaming(encoder.encode(`data: ${JSON.stringify({role: "tool", content: {component: message}})}\n\n`));
}
