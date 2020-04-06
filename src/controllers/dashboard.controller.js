const Spot = require('../models/spot.model')
module.exports = {
    async details(req,res){
        const { user_id } = req.headers;
        const spots = await Spot.find({ user: user_id})
        return res.json(spots);
    }
}