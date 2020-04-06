const express = require('express');
const multer = require('multer');
const uploadConfig = require('../config/upload');
const SessionController = require('../controllers/session.controller');
const SpotController = require('../controllers/spot.controller');
const DashboardController = require('../controllers/dashboard.controller')
const BookingController = require('../controllers/booking.controller');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions',SessionController.create);
routes.post('/spots',upload.single('thumbnail'),SpotController.create);
routes.get('/spots',SpotController.index)
routes.get("/dashboard",DashboardController.details)
routes.post('/spots/:spot_id/bookings',BookingController.create)
routes.delete('/spots/:id',SpotController.delete);

module.exports = routes;