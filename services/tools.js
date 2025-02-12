import { amazonProducts } from "./mocks"

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
  }

]

export const toolMap = {
  getWeather: async ({ location }) => {
    console.log(location)
    return {
      component: {},
      content: '25 degrees sunny'
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
      content: `Found ${amazonProducts.length} products, \n${amazonProducts.map(p => p.product_title).join('\n')}`
    }
  }
}
