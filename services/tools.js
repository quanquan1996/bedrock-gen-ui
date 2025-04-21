import {amazonFoods, amazonProducts} from "./mocks"
import { generateUI } from "./generateUI"

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
    description: "Search products from amazon based on user's query",
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
  },{
    name: "searchFoods",
    description: "Search foods from foos platform based on user's query",
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
      properties: {
        reason: {
          type: "string",
          description: "reason for get today's date"
        }
      },
      required: ["reason"]
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
          description: "reason for get userinfo"
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
  generateUI
]

export const toolMap = {
  getWeather: async ({ location }) => {
    console.log(location)
    return {
      component: {},
      content: 'Result: 25 degrees sunny, no need to generate ui component'
    }
  },
  generateUI: async ({ component }) => {
    return {
      component: component,
      content: 'Component has been rendered and streaming back to client side.'
    }
  },
  searchProducts: async ({ query }) => {
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
      content: `Found ${amazonProducts.length} products, \n${amazonProducts.map(p => p.product_title).join('\n')}, no need to generate ui component`
    }
  },
  searchFoods: async ({ query }) => {
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
      content: `Found ${amazonFoods.length} foods, \n${amazonFoods.map(p => p.product_title).join('\n')}, no need to generate ui component`
    }
  },
  getCurrentUserInfo: async ({ reason }) => {
    console.log(reason)
    return {
      component: {
        name: 'ToolMessage',
        message: reason+'当前用户信息为: username:Pengjun Qiu,idcard num:123456789,sex:man,phone:123456789,email:pengjunq@amazon.com'
      },
      content: 'Result: username:Pengjun Qiu,idcard num:123456789,sex:man,phone:123456789,email:pengjunq@amazon.com, no need to generate ui component,Do not call this tool more than once'
    }
  },
  getToday: async ({ reason }) => {
    console.log(`Getting today's date. Reason: ${reason}`);

    // Get current date
    const today = new Date();

    // Format date as YYYYMMDD
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');

    const formattedDate = `${year}${month}${day}`;

    // Log for debugging
    console.log(`Today's date formatted as YYYYMMDD: ${formattedDate}`);

    return {
      component: {
        name:'ToolMessage',
        message: reason+'今天是: ' + formattedDate
      }, // Empty component as specified
      content: `today is: ${formattedDate}, no need to generate ui component,Do not call this tool more than once`
    };
  },
  bookHotel: async ({ username, idcard, phone, email, hotel_name, checkin_date, checkout_date }) => {
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
  }
}
