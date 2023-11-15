const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth API',
      version: '1.0.0',
      description: 'A simple Express Auth API',
      contact: {
        name: 'André Teixeira',
        email: 'a21126@alunos.ipca.pt'
      }
    },
  },
  apis: ['./src/routes/*.js'],
};

const openapiSpecification = swaggerJsdoc(options);

module.exports = openapiSpecification;
