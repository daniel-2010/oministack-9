const Booking = require('../models/booking.model')

module.exports = {
    async create(req,res){
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date
        });

        await booking.populate('spot').populate('user').execPopulate();

        return res.json(booking);
    }
}