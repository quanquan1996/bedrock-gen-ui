import {amazonFoods, amazonProducts} from "./mocks"
import {generateUI} from "./generateUI"
import {queryUserShoppingBehaviorData} from "./queryUserShoppingBehaviorData";
import {invokeDataApiTool} from "./queryUserShoppingBehaviorData";
import {parseJsonAgent} from "./agent/parseJsonAgent";

const encoder = new TextEncoder()
const echartsSchema = {
    name: "Echart",
    description: "Convert data into json format for Echats chart,My display block is 819 wide and 500 high. Please help me adapt my UI and make it as beautiful as possible",
    input_schema: {
        type: "object",
        properties: {
            option: {
                type: "object",
                description: "Echart option json string"
            }
        },
        required: ["option"]
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
    generateUI,
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
                data: JSON.parse(echartsData.option.toString())
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
            给出专业的见解和建议\n
            此外如果有什么有价值的探索，请给出探索的建议\n
            如果当前对话里面的数据不完美或者无法支撑需求，请额外给出建议或者重新调用此工具,但是不要超过三轮调用\n
            回复的思路为 1.数据见解  2.探索建议 3.数据建议\n`
        }
    }
}

async function streamTool(message, streaming) {
    await streaming(encoder.encode(`data: ${JSON.stringify({role: "tool", content: {component: message}})}\n\n`));
}
