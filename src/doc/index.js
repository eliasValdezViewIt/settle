const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');

module.exports = [
        require('inert'),
        require('vision'),
        {
          plugin: require('hapi-swaggered'),
          tags: {
            'api': 'APIs'
          },
          options: {
            info: {
              title: 'Settle challenge',
              description: 'Settle challenge made by Elias Valdez',
              version: '1.0'
            }
          }
        },
        {
          plugin: require('hapi-swaggered-ui'),
          options: {
            title: 'Example API',
            path: '/docs',
            swaggerOptions: {
              validatorUrl: null
            }
          }
        }
      ]