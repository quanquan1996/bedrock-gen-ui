export const generateUI = {
  name: 'generateUI',
  description: 'Generate UI components dynamically to display data only when user ask you to render a UI component based on the data user provided. If other tool already used, you dont have to use this tool to generate component.',
  input_schema: {
    type: 'object',
    properties: {
      component: {
        anyOf: [
          { $ref: '#/$defs/CardList' },
          { $ref: '#/$defs/Email' },
          { $ref: '#/$defs/HorizontalScrollArea' },
          { $ref: '#/$defs/ProductCard' },
          { $ref: '#/$defs/Table' },
        ]
      }
    },
    required: ['component'],
    additionalProperties: false,
    $defs: {
      component: {
        anyOf: [
          { $ref: '#/$defs/CardList' },
          { $ref: '#/$defs/Email' },
          { $ref: '#/$defs/HorizontalScrollArea' },
          { $ref: '#/$defs/ProductCard' },
          { $ref: '#/$defs/Table' },
        ]
      },
      CardList: {
        type: 'object',
        description: 'Vertical Card List component.',
        properties: {
          name: { type: 'string', enum: ['CardList'] },
          children: {
            type: 'array', items: {
              $ref: '#/$defs/component'
            }
          }
        },
        required: ['name', 'children'],
        additionalProperties: false
      },
      Email: {
        type: 'object',
        properties: {
          name: { type: 'string', enum: ['Email'] },
          to: { type: 'string', description: 'Email sent to address' },
          from: { type: 'string', description: 'Email sent from address' },
          subject: { type: 'string', description: 'Email subject' },
          html: { type: 'string', description: 'Email content in html format' },
        },
        required: ['name', 'to', 'from', 'subject', 'html'],
        additionalProperties: false
      },
      ProductCard: {
        type: 'object',
        properties: {
          name: { type: 'string', enum: ['ProductCard'] },
          image: { type: 'string', description: 'Product image url' },
          title: { type: 'string', description: 'Product title' },
          price: { type: 'string', description: 'Product price, including currency symbol (e.g., $20 €15 ¥100' },
          description: { type: 'string', description: 'Product description' },
        },
        required: ['name', 'image', 'title', 'price', 'description'],
        additionalProperties: false
      },
      Table: {
        type: 'object',
        properties: {
          name: { type: 'string', enum: ['table'] },
          headers: {
            type: 'array',
            items: {
              type: 'string',
              description: 'Table headers'
            }
          },
          rows: {
            type: 'array',
            items: {
              type: 'string',
              description: 'Each column value based on headers'
            }
          }
        },
        required: ['name', 'headers', 'rows'],
        additionalProperties: false
      },
      // barChart: {
      //   type: 'object',
      //   properties: {
      //     name: { type: 'string', enum: ['barChart'] },
      //     columns: {
      //       type: 'array',
      //       items: {
      //         type: 'object',
      //         properties: {
      //           label: { type: 'string', description: 'Column name' },
      //           value: { type: 'number', description: 'Column value' }
      //         },
      //         required: ['label', 'value'],
      //         additionalProperties: false
      //       }
      //     }
      //   },
      //   required: ['name', 'columns'],
      //   additionalProperties: false
      // },
    }
  }
}
