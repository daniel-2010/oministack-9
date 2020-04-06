const User = require('../models/users.model')
module.exports = {
    //index, show, strore, update, destroy
    //index, details, create, update, delete
    async create(req,res){
        const { email } = req.body;
        let user = await User.findOne({email});

        if(!user){
            user = await User.create({ email });
        }
        
        return res.json(user)
    }

}