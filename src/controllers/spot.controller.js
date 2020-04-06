const Spot = require("../models/spot.model");
const User = require('../models/users.model');
const path = require('path')
const fs = require('fs')


module.exports = {
    async index(req, res){
        const {tech} = req.query;
        const spots = await Spot.find({ techs: tech })
        return res.json(spots);
    },
    async create(req,res){
        const {filename} = req.file;
        const { company, techs, price } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        if(!user){
            return res.status(400).json({error:'Usuário não existe'})
        }
        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            techs: techs.split(',').map(tech => tech.trim()),
            price,
        })
        return res.json(spot)
    },
    async delete(req,res){
        
        const spot = await Spot.find({ _id: req.params.id });
        //const file = path.resolve(__dirname,'..','..','uploads',spot[0].thumbnail);
        
        fs.unlink('./uploads/'+spot[0].thumbnail,function (err,data){
            if(err){
                console.log(err)
            }
        }) 
        await Spot.findOneAndRemove({ _id:req.params.id});

        return res.json({message:'Removido com sucesso', stat:1});
    }
}