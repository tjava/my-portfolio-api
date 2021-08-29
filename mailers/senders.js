const { email } = require("./config");

const emailSender = (recipient, name, number, message) => {
  console.log("Called in Sender");
    email
    .send({
      template: "email",
      message: {
        to: recipient,        
      },
      locals: {
        name: name,
        number: number,
        email: recipient,
        message: message
      }
    })
    .then(console.log)
    .catch(console.error);
};

// exports.emailSender = emailSender;

module.exports = {    
    emailSender
};