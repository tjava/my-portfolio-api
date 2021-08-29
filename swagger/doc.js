const swaggerAutogen = require("swagger-autogen")()

const doc = {
    info: {
        version: "1.0.0",
        title: "MY PORTFOLIO API",
        description: "MY PORTFOLIO API"
    },
    host: "localhost:3000",
    basePath: "/",
    schemes: ["http", "https"],
    consumes: ["application/json"],
    produces: ["application/json"],
    tags: [
        {
            "name": "Skills",
            "description": "This is what I've worked with."
        },
        {
            "name": "Projects",
            "description": "Take a look at what I've been working on."
        },
        {
            "name": "Project in details",
            "description": "Take a look at what I've been working on."
        },
    ],
    securityDefinitions: {
        
    },
    definitions: {
        
    }
};

const outputFile = './swagger/swagger.json';
const endpointFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointFiles, doc).then(() => {
    require('./server.js');
});