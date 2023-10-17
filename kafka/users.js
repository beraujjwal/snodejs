const User = require('../models/user.model');

exports.xxxxx = function(messageBody) {
    try{
        const message = String(messageBody.value);
        const { XXXXXXXX } = JSON.parse(message);
        User.create({
            XXXXXXXX
        });
    } catch(ex){
        console.log(ex);
    }
};