const { 
    getAllProjects,
    createProject,
    singleProject,
    deleteProject,
    uploadSingle
    } = require('../controllers/projects');
const express = require('express');
const router = express.Router();

router.get(`/all`, async (req, res) => {
    /*
        #swagger.tags = ['Projects']
    */
    await getAllProjects(req, res);
});                     

router.post(`/set`, uploadSingle, async (req, res) => {

    await createProject(req, res);
});                     

router.get(`/single/:id`, async (req, res) => {
    /*
        #swagger.tags = ['Project in details']
    */
    await singleProject(req, res);
});                  

router.delete(`/delete/:id`, async (req, res) => {

    await deleteProject(req, res);
});            

module.exports = router;