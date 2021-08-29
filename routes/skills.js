const { 
    getAllSkills,
    createSkill,
    deleteSkill,
    uploadSingle
    } = require('../controllers/skills');
const express = require('express');
const router = express.Router();

router.get(`/all`, async (req, res) => {
    /*
        #swagger.tags = ['Skills']
    */
    await getAllSkills(req, res);
});                     

router.post(`/set`, uploadSingle, async (req, res) => {
    
    await createSkill(req, res);
});                                     

router.delete(`/delete/:id`, async (req, res) => {
    
    await deleteSkill(req, res);
});            

module.exports = router;