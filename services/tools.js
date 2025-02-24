import { amazonProducts } from "./mocks"
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
  }
}
