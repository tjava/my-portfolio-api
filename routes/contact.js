const { 
    sendMessage
    } = require('../controllers/contact');
const express = require('express');
const router = express.Router();                   

router.post(`/send`, async (req, res) => {
    
    await sendMessage(req, res);
});            

module.exports = router;