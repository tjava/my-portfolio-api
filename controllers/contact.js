const { emailSender } = require("../mailers/senders");

const sendMessage = async (req, res) => { 
    try {

        
        emailSender(req.body.email, req.body.name, req.body.number, req.body.message);
        return res.status(200).json({status: 'successful', message: 'Message sent.'});
       
        
    } catch (error) {

        return res.status(500).json({status: 'failed', message: error.message});
        
    }
}

exports.sendMessage = sendMessage;