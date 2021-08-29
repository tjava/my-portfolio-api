require('dotenv/config');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');

const swaggerDocs = require("./swagger/swagger.json");
const skillsRoutes = require('./routes/skills');
const projectsRoutes = require('./routes/projects');
const contactRoutes = require('./routes/contact');

const server = express();

server.use(cors());
server.options('*', cors()) 

server.use(bodyParser.json());

server.use(`/api/skills`, skillsRoutes);
server.use(`/api/projects`, projectsRoutes);
server.use(`/api/contact`, contactRoutes);
server.use(`/api/api-docs`, swaggerUI.serve, swaggerUI.setup(swaggerDocs));

server.listen(process.env.APP_PORT, ()=>{
    console.log(`server is running on http://localhost:${process.env.APP_PORT}`);
});